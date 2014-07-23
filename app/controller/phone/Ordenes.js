/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Ordenes', {
    extend: 'Ext.app.Controller',

    config:{
        refs:{
            menuNav:'menunav'
        },
    	control:{
			'productoslist #btnBuscarProductos': {
                tap: 'onBuscaProductos'
            },
            'productoslist #buscarProductos': {
                clearicontap: 'limpiaBusquedaProductos'
            },
            'agregarproductosform #agregar': {
                tap: 'agregaProductos'
            },
            'agregarproductosform #cantidad': {
                change: 'actualizaCantidad'
            },
            'agregarproductosform #almacenProducto': {
                focus: 'onListAlmacen'
            },

            'container[id=ordenescont] clienteslist': {
                itemtap: 'alSelecionarCliente'
            },
            'container[id=ordenescont] opcionclientelist': {
                itemtap: 'onOpcionesCliente'
            },
            'opcionesorden #eliminar': {
                activate: 'onEliminarOrden'
            },
            'productosorden #listaProductos': {
                tap: 'mostrarListaProductos'
            },
            'productosorden #panelProductos': {
                tap: 'mostrarPanelProductos'
            },
            'productosorden productoslist': {
                itemtap: 'onAgregarProducto'
            },
            'productosorden productosview': {
                itemtap: 'onAgregarProducto'
            },            
            'opcionesorden': {
                activeitemchange: 'cambiaItem'
            },
            'direccioneslist': {
                itemtap: 'muestraDirecciones'
            },
            'ordenlist': {
                itemswipe: 'eliminaPartida',
                itemtap: 'editarPartida'
            },
            'opcionesorden #terminar': {
                activate: 'confirmaTerminarOrden'
            },
            'clientecontainer #guardar': {
                tap: 'guardaDatosDeCliente'
            },
            'editarpedidoform #moneda': {
                focus: 'muestraMonedas'
            },
            'tpldirecciones': {
                itemtap: 'seleccionaDireccion'
            },
            'monedaslist': {
                itemtap: 'seleccionaMoneda'
            },
            'transaccionlist': {
                itemtap: 'onSeleccionarTransaccion'
            },
            'almacenlist': {
                itemtap: 'onSeleccionarAlmacen'            
            }    		
    	}
    },

    /**
     * Establece el título y el id del cliente cada uno en una variable. Verifica de qué opción viene, venta o cobranza:
     * Venta: Muestra la vista de ventas.
     * Cobranza: Muestra la vista de cobranza.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    alSelecionarCliente: function (list, index, target, record) {

        var me = this,
            name = record.get('NombreSocio'),
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: 'titulo'
            });

        me.idCliente = record.get('CodigoSocio');
        me.titulo = name;
        barraTitulo.title = me.titulo;

        this.getMenuNav().push({
            xtype: 'opcionclientelist',
            title: me.idCliente
        });

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerSocioiMobile",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                CardCode: me.idCliente
            },
            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada;

                me.clienteSeleccionado = response.Data[0];

                if (procesada) {
                    me.estableceDirecciones(view, barraTitulo);
                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
            }
        });
    },

    /**
     * Guarda el código de dirección de la dirección seleccionada, ya sea de entrega o fiscal.
     * @param list Ésta lista
     * @param index El índice de la dirección seleccionada
     * @param target El elemento tapeado
     * @param record El record asociado al ítem.
     */
    seleccionaDireccion: function (list, index, target, record) {
        var me = this,
            direcciones = Ext.getStore('Direcciones'),
            view = me.getMain().getActiveItem();

        direcciones.each(function (item, index, length) {
            item.set('Predeterminado', false)
        });

        direcciones.getAt(index).set('Predeterminado', true);

        if (me.entrega) {
            me.direccionEntrega = record.data.CodigoDireccion;
        } else {
            me.direccionFiscal = record.data.CodigoDireccion;
            me.codigoImpuesto = record.data.CodigoImpuesto;
            me.tasaImpuesto = record.data.Tasa;
        }
        view.pop();
    },

    /**
     * Al seleccionar la moneda regresa a la vista anterior (editarpedidoform) y setea el codigo de la moneda seleccionada.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    seleccionaMoneda: function (list, index, target, record) {
        var me = this,
            view = me.getMain().getActiveItem(),
            moneda = record.get('CodigoMoneda') + ' ',
            tabOpciones = me.getOpcionesOrden(),
            form = tabOpciones.down('editarpedidoform');

        if ((me.codigoMonedaSeleccinada != moneda) && (me.codigoMonedaSeleccinada == me.codigoMonedaPredeterminada)) {
            if (me.dameProductoConMonedaPredeterminada() != 'No hay') {
                me.mandaMensaje('Error', 'No es posible cambiar la configuración debido a que la moneda del producto con código ' + me.dameProductoConMonedaPredeterminada() + ' es ' + me.codigoMonedaPredeterminada + '. Elimínelo primero de la orden.');
            } else {
                me.obtenerTipoCambio(moneda, record);
//                me.estableceMonedaPredeterminada(record);
//                me.actualizaOrden(moneda);
            }
        } else {

            if (moneda != me.codigoMonedaSeleccinada) {
                me.codigoMonedaSeleccinada = me.codigoMonedaPredeterminada;
                me.actualizaOrden(moneda);
                //me.tipoCambio = 1;
                form.setValues({
                    CodigoMoneda: me.codigoMonedaSeleccinada,
                    tipoCambio: parseFloat(1).toFixed(2)
                });
                me.estableceMonedaPredeterminada(record);
            }
            //me.actualizarTotales();
        }

        view.pop();
    },

    /**
     * Establece la moneda seleccionada como predeterminada para visualizarla en la lista de monedas.
     * @param record El record de la moneda seleccionada.
     */
    estableceMonedaPredeterminada: function (record) {
        var store = Ext.getStore('Monedas');

        store.each(function (item, index, length) {            
            item.set('Predeterminada', false);
        });
        record.set('Predeterminada', true);
    },

    /**
     * Obtiene el nombre del primer artículo encontrado cuyo codigo de moneda es la predeterminada.
     * @return El nombre del artículo o 'No hay' si no existe ninguno.
     */
    dameProductoConMonedaPredeterminada: function () {
        var me = this, i,
            nombre = 'No hay',
            ordenes = Ext.getStore('Ordenes');

        for (i = 0; i < ordenes.getCount(); i++) {
            if (ordenes.getAt(i).get('moneda') == me.codigoMonedaPredeterminada) {
                nombre = ordenes.getAt(i).get('CodigoArticulo');
                break;
            }
        }

        return nombre;
    },

    /**
     * Actualiza los valores de cada una de las partidas respecto al tipo de cambio realizado.
     * @param moneda La moneda seleccionada.
     */
    actualizaOrden: function (moneda) {
        var me = this, precio, importe,
            ordenes = Ext.getStore('Ordenes');

        if(moneda == me.codigoMonedaPredeterminada){
                ordenes.each(function (item, index, length) {
                    precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio')) * me.tipoCambio;
                    importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('importe')) * me.tipoCambio;
                    precio = Imobile.core.FormatCurrency.currency(precio, moneda);
                    importe = Imobile.core.FormatCurrency.currency(importe, moneda);

                    item.set('Precio', precio);
                    item.set('importe', importe);
                    item.set('totalDeImpuesto', item.get('totalDeImpuesto') * me.tipoCambio);
                });
                me.actualizarTotales();

            } else {

                ordenes.each(function (item, index, length) {
                    precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio')) / me.tipoCambio;
                    importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('importe')) / me.tipoCambio;
                    precio = Imobile.core.FormatCurrency.currency(precio, moneda);
                    importe = Imobile.core.FormatCurrency.currency(importe, moneda);

                    item.set('Precio', precio);
                    item.set('importe', importe);
                    item.set('totalDeImpuesto', item.get('totalDeImpuesto') / me.tipoCambio);
                });
                me.actualizarTotales();
            }
    },

    /**
     * Muestra la lista de monedas.
     */
    muestraMonedas: function () {
        var me = this,
            view = me.getMain().getActiveItem();

        view.push({
            xtype: 'monedaslist'
        });

        view.getNavigationBar().down('#agregarProductos').hide()
    },

    /**
     * Elimina la partida seleccionada del store de órdenes.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    eliminaPartida: function (list, index, target, record) {
        var me = this,
            ordenes = Ext.getStore('Ordenes');
        Ext.Msg.confirm("Eliminar producto de la orden", "Se va a eliminar el producto de la orden, ¿está seguro?", function (e) {

            if (e == 'yes') {
                var ind = ordenes.find('id', record.data.id);
                ordenes.removeAt(ind);
                me.actualizarTotales();

                if (ordenes.getData().items.length < 2) {
                    me.getPartidaContainer().down('list').emptyTextCmp.show();
                } else {
                    me.getPartidaContainer().down('list').emptyTextCmp.hide();
                }
            }
        });
    },


    /**
     * Determina qué hacer al momento de cambiar el ítem del navigationorden:
     *   - Cliente: Obtiene los datos del cliente desde el JSON y llena las direcciones asignando por defecto la primera que aparece.
     * Aparece el botón Back y desaparece Agregar.
     *   - Editar: Establece valores para el formulario de editar pedido aparece el botón Back y desaparece Agregar.
     * @param tabPanel Este TabPanel
     * @param value El nuevo ítem
     * @param oldValue El ítem anterior
     */
    cambiaItem: function (tabPanel, value, oldValue) {
        var me = this,
            view = me.getNavigationOrden(),//me.getMain().getActiveItem(),
            boton = view.getNavigationBar().down('#agregarProductos');
        //clienteSeleccionado = me.getOpcionCliente().clienteSeleccionado;


        if (value.xtype == 'clientecontainer') {
            boton.setText('Back').show();
            boton.setUi('back');

            var form = value.down('clienteform'),
                direcciones = Ext.getStore('Direcciones');

            me.clienteSeleccionado.LimiteCredito = parseFloat(me.clienteSeleccionado.LimiteCredito).toFixed(2);
            me.clienteSeleccionado.Saldo = parseFloat(me.clienteSeleccionado.Saldo).toFixed(2);

            form.setValues(me.clienteSeleccionado);
        }

        if (value.xtype == 'editarpedidoform') {
            if (me.codigoMonedaSeleccinada == me.codigoMonedaPredeterminada) {
                me.clienteSeleccionado.tipoCambio = parseFloat(1).toFixed(2);;
            } else {
                me.clienteSeleccionado.tipoCambio = parseFloat(me.tipoCambio).toFixed(2);
            }

            me.clienteSeleccionado.LimiteCredito = parseFloat(me.clienteSeleccionado.LimiteCredito).toFixed(2);
            me.clienteSeleccionado.Saldo = parseFloat(me.clienteSeleccionado.Saldo).toFixed(2);
            me.clienteSeleccionado.CodigoMoneda = me.codigoMonedaSeleccinada;
            console.log(me.clienteSeleccionado);
            value.setValues(me.clienteSeleccionado);
            boton.setText('Back').show();
            boton.setUi('back');
        }

        if (value.xtype == 'partidacontainer') {
            boton.setText('Agregar').show();
            boton.setUi('normal');
        }
    },

    /**
     * Muestra la lista de direcciones según se haya elegido, fiscal o de entrega.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    muestraDirecciones: function (list, index, target, record) {
        var me = this,
            view = me.getMain().getActiveItem(),
            direcciones = Ext.getStore('Direcciones');

        direcciones.clearFilter();

        if (record.data.action == 'entrega') {
            direcciones.filter('TipoDireccion', 'B');
            me.entrega = true;
        } else {
            direcciones.filter('TipoDireccion', 'S');
            me.entrega = false;
        }

        view.push({
            xtype: 'tpldirecciones'
        });

        view.getNavigationBar().down('#agregarProductos').hide();
    },

    /**
     * Muesta la lista de productos.
     */
    mostrarListaProductos: function () {
        var me = this;
        Ext.getStore('Productos').clearFilter();
        me.getProductosOrden().setItems({xtype: 'productoslist'});
    },


    /**
     * Muestra el panel de productos.
     */
    mostrarPanelProductos: function () {
        var me = this,
            productos = Ext.getStore('Productos');

        me.lista(true);

        me.getProductosOrden().setItems({xtype: 'productosview'});

        setTimeout(function () { //Función para esperar algunos milisegundos
            productos.each(function (item, index, length) {
                item.set('color', me.dameColorAleatorio());
            })
        }, 100)
    },


    /**
     * Agrega el producto a la orden
     * @btn Este botón
     */
    agregaProductos: function (btn) {
        var form, values, descripcion, cantidad, ordenes,
            me = this,
            ordenes = Ext.getStore('Ordenes'),
            productos = Ext.getStore('Productos'),
            menu = me.getMain().getActiveItem(),     //NavigationOrden
            form = btn.up('agregarproductosform'),
            values = form.getValues(),
            descripcion = values.NombreArticulo,
            cantidad = values.cantidad,
            moneda = values.moneda,
            importe = values.importe;

        Ext.getStore('Productos').resetCurrentPage();
        if (Ext.isEmpty(descripcion) || Ext.isEmpty(cantidad)) {
            me.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {
            if (form.modo != 'edicion') {
                if (moneda != me.codigoMonedaSeleccinada) {
                    if (moneda == me.codigoMonedaPredeterminada) {
                        me.mandaMensaje('Imposible agregar', 'No es posible agregar el producto a la orden debido a que la configuración de moneda actual es ' + me.codigoMonedaSeleccinada + '  y la moneda del producto es ' + moneda + '. Cambie primero la configuración de moneda a ' + moneda + '.');
                    } else {
                        me.obtenerTipoCambio(moneda); // Aquí esperamos a que obtenga el tipo de cambio y realizamos el cálculo del nuevo precio.
                    }
                } else {
                    me.ayudaAAgregar(form, 'cantidad');
                    me.ayudaAAgregar(form, 'monedaIgual');
                }
            } else {
                me.ayudaAAgregar(form, 'cantidad');
                me.ayudaAAgregar(form, 'edicion');
            }
        }
    },

    /**
     * Función auxiliar para agregar los productos a la orden, en sí ésta hace toda la chamba de acuerdo al flujo en turno.
     */

    ayudaAAgregar: function (form, caso) {
        var values, descripcion, cantidad, ordenes, codigo, indPro, productoAgregado, cantidadActual, precio,
            me = this,
            ordenes = Ext.getStore('Ordenes'),
            productos = Ext.getStore('Productos'),
            menu = me.getNavigationOrden(),     //NavigationOrden
            values = form.getValues(),
            descripcion = values.NombreArticulo,
            cantidad = values.cantidad,
            moneda = values.moneda,
            importe = values.importe,
            codigo = values.CodigoArticulo,
            indPro = productos.find('CodigoArticulo', codigo),
            productoAgregado = productos.getAt(indPro),
            cantidadActual = productoAgregado.get('cantidad');
        
        switch (caso) {
            case 'monedaIgual':
                values.totalDeImpuesto = me.totalDeImpuesto;
                values.Imagen = productoAgregado.get('Imagen');
                values.nombreMostrado = Ext.String.ellipsis(descripcion, 25, false);
                ordenes.add(values);
                menu.pop();
                me.actualizarTotales();
                break;

            case 'monedaDiferente':
                precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento) * me.tipoCambio;
                values.importe = precio * cantidad;
                precio = Imobile.core.FormatCurrency.currency(precio, me.codigoMonedaSeleccinada);
                values.precioConDescuento = precio;
                values.importe = Imobile.core.FormatCurrency.currency(values.importe, me.codigoMonedaSeleccinada);
                values.totalDeImpuesto = me.totalDeImpuesto * me.tipoCambio;
                //values.descuento = values.descuento;
                values.Imagen = productoAgregado.get('Imagen');
                values.nombreMostrado = Ext.String.ellipsis(descripcion, 25, false);
                values.TipoCambio = me.tipoCambio;
                ordenes.add(values);
                menu.pop();
                me.actualizarTotales();
                break;

            case 'edicion':
                var ind = form.ind,
                    datosProducto = ordenes.getAt(ind),
                    totaldeimpuesto,
                    moneda = values.moneda;

                if (moneda != me.codigoMonedaSeleccinada) {
                    precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento) * datosProducto.get('TipoCambio');
                    importe = precio * cantidad;
                    precio = Imobile.core.FormatCurrency.currency(precio, me.codigoMonedaSeleccinada);
                    importe = Imobile.core.FormatCurrency.currency(importe, me.codigoMonedaSeleccinada);
                    totaldeimpuesto = me.totalDeImpuesto * datosProducto.get('TipoCambio');
                    datosProducto.set('Precio', precio);
                    datosProducto.set('cantidad', cantidad);
                    datosProducto.set('importe', importe);
                    datosProducto.set('totalDeImpuesto', /*Imobile.core.FormatCurrency.currency(me.totalDeImpuesto, '$')*/ me.totalDeImpuesto);
                    //datosProducto.set('Imagen', cantidadProducto.get('Imagen'));
                    menu.pop();
                    me.actualizarTotales();
                } else {
                    datosProducto.set('cantidad', cantidad);
                    datosProducto.set('importe', importe);
                    datosProducto.set('totalDeImpuesto', /*Imobile.core.FormatCurrency.currency(me.totalDeImpuesto, '$')*/ me.totalDeImpuesto);
                    //datosProducto.set('Imagen', cantidadProducto.get('Imagen'));
                    menu.pop();
                    me.actualizarTotales();
                }
                break;

            case 'cantidad':
                var codigo = values.CodigoArticulo,
                    indPro = productos.find('CodigoArticulo', codigo),
                    productoAgregado = productos.getAt(indPro),
                    cantidadActual = productoAgregado.get('cantidad');

                productoAgregado.set('cantidad', cantidadActual + cantidad);
                break;
        }
    },

    /**
     * Valida si un producto está en la orden.
     * @param codigo El código del producto a validar
     * @return El índice del producto en la orden o -1 si no se encuentra.
     */
    estaEnOrden: function (codigo) {
        var ordenes = Ext.getStore('Ordenes'),
            ind = ordenes.find('CodigoArticulo', codigo);

        return ind;
    },

    /**
     * Obtiene desde el backend la lista de clientes.
     */
    muestraClientes: function () {
        Ext.getStore('Clientes').resetCurrentPage();

        Ext.getStore('Clientes').clearFilter();
        Ext.getStore('Clientes').load();
    },

    /**
     * Muestra la lista de órdenes.
     */
    muestralistaOrden: function () {
        Ext.getStore('Ordenes').load();
    },

    onBuscaProductos: function (t, e, eOpts) {
        var me = this,
            store = Ext.getStore('Productos'),
            value = t.up('toolbar').down('#buscarProductos').getValue();


        Ext.getStore('Productos').resetCurrentPage();

        store.setParams({
            Criterio: value,
            CardCode: me.idCliente
        });
        store.load();
    },

    limpiaBusquedaProductos: function (t, e, eOpts) {
        var me = this,
            store = Ext.getStore('Productos');

        Ext.getStore('Productos').resetCurrentPage();

        store.setParams({
            Criterio: '',
            CardCode: me.idCliente
        });

        store.load();
    },



    /**
     * Filtra el store de productos por la variable DesplegarEnPanel.
     * @param desplegarEnPanel Variable booleana para indicar si se despliega en panel (true) o no (false).
     */
    lista: function (desplegarEnPanel) {
        var productos = Ext.getStore('Productos'),
            me = this;

        productos.clearFilter(); //Para limpiar todos los filtros por si tiene alguno el store
        productos.filter('DesplegarEnPanel', esFavorito);
    },

    /**
     * Muestra un mensaje al ususario con un alert.
     * @param titulo El título del alert.
     * @param mensaje El mensaje a mostrar.
     */
    mandaMensaje: function (titulo, mensaje) {
        Ext.Msg.alert(titulo, mensaje);
    },



    /**
     * Establece como predeterminadas las primeras direcciones que encuentra tanto fiscal
     * como de entrega, si este cliente no tiene dirección fiscal manda un mensaje y no permite avanzar.
     * @param view La vista actual.
     * @param barraTitulo El toolbar para agregar el nombre del cliente.
     */
    estableceDirecciones: function (view, barraTitulo) {
        var me = this,
            direcciones = Ext.getStore('Direcciones');
        direcciones.setData(me.clienteSeleccionado.Direcciones);
        direcciones.clearFilter();
        direcciones.filter('TipoDireccion', 'S');

        if (view.getActiveItem().xtype == 'clienteslist ') {
            return;
        }

        if (direcciones.getCount() > 0) {
            view.add(barraTitulo);
            me.direccionFiscal = direcciones.getAt(0).data.CodigoDireccion; // Se obtiene el codigo de la direccion fiscal y se lo asignamos a una variable global.
            me.codigoImpuesto = direcciones.getAt(0).data.CodigoImpuesto;
            me.tasaImpuesto = direcciones.getAt(0).data.Tasa;
            direcciones.getAt(0).set('Predeterminado', true);
            direcciones.clearFilter();
            direcciones.filter('TipoDireccion', 'B');

            if (direcciones.getCount() > 0) {
                me.direccionEntrega = direcciones.getAt(0).data.CodigoDireccion; // Se obtiene el codigo de la direccion de entrega y se lo asignamos a una variable global.
                direcciones.getAt(0).set('Predeterminado', true);
            }

        } else {
            me.mandaMensaje('Sin dirección fiscal', 'Este cliente no cuenta con dirección fiscal, contacte a su administrador de SAP B1');
            view.pop();
            direcciones.removeAll();
        }
    },

    /**
     * Muestra el formulario para agregar un producto a la orden.
     * @param list Esta lista, productoslist.
     * @param index El índice del item tapeado.
     * @param target El elemento o DataItem tapeado.
     * @param record El record asociado al ítem.
     */
    onAgregarProducto: function (list, index, target, record, e) {
        var me = this,
            productos = Ext.getStore('Productos'),
            valores = record.data;
        //moneda,// = valores.ListaPrecios[0].CodigoMoneda,

        Ext.data.JsonP.request({
            url: "http://" + me.dirIP + "/iMobile/COK1_CL_Articulo/ObtenerArticuloiMobile",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                //ItemCode: valores.CodigoArticulo,
                CardCode: me.idCliente,
                //ListaPrecio: valores.ListaPrecios[0].CodigoLista,
                //Cantidad: cantidad
                Criterio: valores.CodigoArticulo
            },
            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada;


                if (procesada) {
                    var ind = productos.find('CodigoArticulo', valores.CodigoArticulo),
                        productoSeleccionado = productos.getAt(ind);
console.log(response.Data[0]);
                    productoSeleccionado.set(response.Data[0]);

                    me.llenaAgregarProductos(response.Data[0]); // Hacer un console.log de esta parte para manipular adecuadamente los datos, se supone que me regresa el artículo.
                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
            }
        });
    },    

    /**
    * Establece los valores del agregarproductosform
    * @param valores Los valores para el formulario.
    */
    llenaAgregarProductos: function (valores) {
        var me = this,
            view = me.getMain().getActiveItem(),
            almacenes = me.almacenes,
            precio,
            form,
            cantidad,
            valoresForm,
            desc,
            preciocondescuento,
            totaldeimpuesto,
            importe,            
            moneda = valores.ListaPrecios[0].CodigoMoneda + ' ';

        valores.Disponible = Ext.Number.toFixed(valores.Disponible, 2);        

        if (view.getActiveItem().xtype == 'agregarproductosform') {
            return;
        }

        view.push({
            xtype: 'agregarproductosform',
            modo: 'agregar'
        });

        Ext.Array.forEach(almacenes, function (item, index) {
            var predeterminado = item.Predeterminado;

            if (predeterminado) {
                valores.NombreAlmacen = item.NombreAlmacen;
                me.CodigoAlmacen = item.CodigoAlmacen;
            }
        });

        form = view.getActiveItem();

        form.setValues(valores);

        //Se establece el valor de cantidad, precio y moneda
        precio = Imobile.core.FormatCurrency.currency(valores.ListaPrecios[0].Precio, moneda);
        cantidad = 1;

        //Se calcula descuento
        Ext.data.JsonP.request({
            url: "http://" + me.dirIP + "/iMobile/COK1_CL_Consultas/ObtenerPrecioEspecialiMobile",

            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                ItemCode: valores.CodigoArticulo,
                CardCode: me.idCliente,
                ListaPrecio: valores.ListaPrecios[0].CodigoLista,
                Cantidad: cantidad
            },

            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada,
                    precio2 = Imobile.core.FormatCurrency.formatCurrencytoNumber(precio);

                if (precio2 == 0) {
                    desc = 0;
                } else {
                    console.log(precio2);
                    console.log(response.Data[0]);
                    desc = (precio2 - response.Data[0]).toFixed(2);
                    console.log(desc);
                    desc = (desc * 100 / precio2);
                    console.log(desc);
                }

                if (procesada) {

                    //Se establece precio con descuento
                    preciocondescuento = response.Data[0];
                    me.sujetoImpuesto = valores.SujetoImpuesto;
                    //Se valida si el producto es sujeto de impuesto
                    if (me.sujetoImpuesto) {
                        //Se calcula total de impuesto
                        totaldeimpuesto = preciocondescuento * me.tasaImpuesto / 100;
                        me.totalDeImpuesto = totaldeimpuesto;                        
                    } else {
                        me.totalDeImpuesto = 0;
                    }

                    //Se calcula importe
                    importe = preciocondescuento * cantidad;

                    // Se establecen los valores al formulario
                    form.setValues({
                        Precio: precio,
                        cantidad: cantidad,
                        moneda: moneda,
                        PorcentajeDescuento: desc + '%',
                        importe: Imobile.core.FormatCurrency.currency(importe, moneda),
                        precioConDescuento: Imobile.core.FormatCurrency.currency(preciocondescuento, moneda),
                        CodigoAlmacen: me.CodigoAlmacen
                    });

                    form.getValues();

                    me.actualizaCantidad(null, cantidad, null);

                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
            }
        });
    },

    /**
     * Muestra el formulario para editar un producto (agregarproductosform).
     * @param list Ësta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    editarPartida: function (list, index, target, record) {
        var me = this,
            view = me.getMain().getActiveItem(),
            form,
            field,
            valuesForm,
            values = record.data,
            id = record.data.id,
            ordenes = Ext.getStore('Ordenes'),
            ind = ordenes.find('id', id);
console.log(values);
        if (view.getActiveItem().xtype == 'agregarproductosform') {
            return
        }

        view.push({
            xtype: 'agregarproductosform',
            modo: 'edicion',
            ind: ind
        });

        form = view.getActiveItem();
        field = form.down('fieldset');

        field.setTitle('Editar producto');
        field.down('#descripcion').setDisabled(true);
        view.getNavigationBar().down('#agregarProductos').hide();

        if (values.moneda != me.codigoMonedaSeleccinada) {
            valuesForm = me.ponValoresOriginalesAAgregarProductoForm(values); // Por si la moneda del producto es diferente a la del documento.            
            form.setValues(valuesForm);
            form.setValues({
                importe: valuesForm.importe
            });
        } else {
            form.setValues(values);
        }
        //form.setValues(values);
    },

    /**
    * Establece los valores originales a agregarproductosform, esta funcion se llama cuando la moneda del documento es distinta a la
    * moneda del producto.
    * @param values
    * @return 
    */
    ponValoresOriginalesAAgregarProductoForm: function (values) {
        var me = this,
            precio, importe, newObject, totaldeimpuesto, precioConDescuento, descuento,
            moneda = values.moneda,

            newObject = {
                Precio: values.Precio,
                importe: values.importe,
                totalDeImpuesto: values.totalDeImpuesto,
                CodigoArticulo: values.CodigoArticulo,
                CodigoSocio: values.CodigoSocio,
                Disponible: values.Disponible,
                Imagen: values.Imagen,
                NombreAlmacen: values.NombreAlmacen,
                CodigoAlmacen: values.CodigoAlmacen,
                NombreArticulo: values.NombreArticulo,
                cantidad: values.cantidad,
                PorcentajeDescuento: values.PorcentajeDescuento,
                id: values.id,
                moneda: values.moneda,
                precioConDescuento: values.precioConDescuento
            };
            console.log(moneda);
            console.log(me.codigoMonedaPredeterminada);
            console.log(me.codigoMonedaSeleccinada);
            console.log(values.TipoCambio);

        if (!values.esOrdenRecuperada) {
//            if (moneda == 'USD' && me.codigoMonedaSeleccinada == '$') {
            if (moneda != me.codigoMonedaPredeterminada && me.codigoMonedaSeleccinada == me.codigoMonedaPredeterminada) {
                descuento = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.PorcentajeDescuento);
                precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio);
                precio = precio * 100 / (100 - descuento);
                precio = precio / values.TipoCambio;
                precio = parseFloat(precio.toFixed(2));
                importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.importe) / values.TipoCambio;
                precioConDescuento = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento);
                
                newObject.totalDeImpuesto = newObject.totalDeImpuesto / values.TipoCambio;

                console.log(precio, 'El precio es');
            }            
        } else {            
            console.log(values);
            precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento);
            precioConDescuento = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento);
            importe = precioConDescuento * values.cantidad;//Imobile.core.FormatCurrency.formatCurrencytoNumber(values.importe);

            console.log(precio);
            console.log(precioConDescuento);
            me.tipoCambio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio) / precioConDescuento;
            console.log(me.tipoCambio);
            //newObject.importe = Imobile.core.FormatCurrency.currency(importe, moneda);
            newObject.precioConDescuento = Imobile.core.FormatCurrency.currency(precioConDescuento, moneda);
        }

        totalDeImpuesto = values.totalDeImpuesto;
        newObject.importe = Imobile.core.FormatCurrency.currency(importe, moneda);
        newObject.Precio = Imobile.core.FormatCurrency.currency(precio, moneda);

        return newObject;
    },

    /**
     * Actualiza el valor del importe al modificarse la cantidad
     * @param numberField Éste NumberField
     * @param newValue El nuevo valor
     * @param oldValue El valor original
     */
    actualizaCantidad: function (numberField, newValue, oldValue) {
        var me = this,
            view = me.getMain().getActiveItem(),
            valoresForm = view.getActiveItem().getValues(),
            preciocondescuento = Imobile.core.FormatCurrency.formatCurrencytoNumber(valoresForm.precioConDescuento) * newValue,
            importe = preciocondescuento;

        if (me.sujetoImpuesto) {
            totaldeimpuesto = preciocondescuento * me.tasaImpuesto / 100;
            me.totalDeImpuesto = totaldeimpuesto;
        }

        view.getActiveItem().setValues({
            importe: Imobile.core.FormatCurrency.currency(importe, valoresForm.moneda)
        });
    },

    /**
     * Manda un mensaje con el codigo de las direcciones tanto de entrega como fiscal.
     */
    guardaDatosDeCliente: function (button) {
        var me = this;

        me.mandaMensaje('Códigos de dirección', 'Entrega: ' + me.direccionEntrega + '\nFiscal: ' + me.direccionFiscal);
    },

    /**
     * Determina qué hacer dependiendo de la opción seleccionada.
     * Orden:
     *   Activa el ítem 2 del menú principal dejando la vista actual en navigationorden (con un sólo ítem, un tabpanel) y establece como activo el ítem 0 de este tabpanel.
     *   Hace aparecer un toolbar con el nombre del cliente.
     *
     * Visualizar:
     *
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record EL record asociado a este ítem.
     */
    onOpcionesCliente: function (list, index, target, record) {
        var me = this,
            view = me.getMenu(),
            viewPrincipal = me.getMain(),

            opcion = record.get('action'),
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: me.titulo
            });

        switch (opcion) {
            case 'orden':
                me.actionOrden = 'crear';
                viewPrincipal.getAt(2).setMasked(false);
                viewPrincipal.setActiveItem(2); // Activamos el item 2 del menu principal navigationorden
                me.getNavigationOrden().getNavigationBar().setTitle(me.idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
                viewPrincipal.getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.getPartidaContainer().down('list').emptyTextCmp.show();

                me.dameMonedaPredeterminada();                

                viewPrincipal.getActiveItem().add(barraTitulo);
                break;

            case 'visualizar':
                if (view.getActiveItem().xtype == 'transaccionlist') {
                    return;
                }

                me.actionOrden = 'actualizar';
                var store = Ext.getStore('Transacciones');

                Ext.getStore('Transacciones').resetCurrentPage();

                store.setParams({
                    CardCode: me.idCliente
                });

                store.load();

                view.push({
                    xtype: 'transaccionlist',
                    title: me.idCliente
                });

                me.dameMonedaPredeterminada();

                break;
        }
    },

    /**
    * Recorre el store de monedas y obtiene la predeterminada.
    */
    dameMonedaPredeterminada: function (){
        var me = this,
            storeMonedas = Ext.getStore('Monedas');

        storeMonedas.load({
            callback: function (records, operation) {
                Ext.Array.each(records, function (item, index, ItSelf) {
                    var predeterminada = item.get('Predeterminada');
                    if (predeterminada) {
                        me.codigoMonedaPredeterminada = item.get('CodigoMoneda') + ' ';
                        me.codigoMonedaSeleccinada = me.codigoMonedaPredeterminada;
                    }
                });
                me.actualizarTotales();
            }
        });
    },

    /**
     * Remueve todos los elementos del store de órdenes si el usuario lo confirma, en caso contrario muestra la vista
     * de la lista  órdenes sin eliminar nada.
     * @param newActiveItem El nuevo ítem activo dentro del contenedor.
     * @param tabPanel Éste tabpanel.
     */
    onEliminarOrden: function (newActiveItem, tabPanel) {
        var me = this,
            ordenes = Ext.getStore('Ordenes');

        Ext.Msg.confirm("Eliminar orden", "Se va a eliminar la orden, todos los productos agregados se perderán ¿está seguro?", function (e) {

            if (e == 'yes') {
                var view = me.getMain().getActiveItem(),
                    titulo = view.down('toolbar');

                ordenes.removeAll();
                me.getMain().setActiveItem(1);
                view.remove(titulo, true); // Remueve el título de la vista, si no, al volver a entrar aparecerá sobre el actual.
            } else {
                tabPanel.setActiveItem(0);
            }
        });
    },


    /**
     * Determina la siguiente vista productosorden o partidacontainer dependiendo del ítem activo, si no está en
     * partidacontainer este boton dice "Back".
     * @param button Este botón.
     */
    onAgregarPartida: function (button) {
        var me = this,
            view = me.getMain().getActiveItem(),
            itemActivo = me.getOpcionesOrden().getActiveItem(),
            store = Ext.getStore('Productos');

        if (itemActivo.isXType('partidacontainer')) {

            Ext.getStore('Productos').resetCurrentPage();

            store.setParams({
                CardCode: me.idCliente,
                Criterio: ""
            });

            view.push({
                xtype: 'productosorden'
            });

            store.clearFilter();
            store.load();

            view.getNavigationBar().down('#agregarProductos').hide()
        } else {
            view.getActiveItem().setActiveItem(0);
        }
    },

    /**
     * Le establece la cantidad a cada uno de los elementos del store de productos, esto sucede al refrescar el store
     * pues desde el backend no traen cantidad.
     * @param productos El store de datos.
     * @param data La colección de records.
     */
    estableceCantidadAProductos: function (productos) {
        var ordenes = Ext.getStore('Ordenes'),
            codigo,
            ind,
            cantidadActual,
            cantidad;

        if (ordenes.getCount() > 0) {
            ordenes.each(function (item, index, length) {
                codigo = item.get('CodigoArticulo');
                cantidad = item.get('cantidad');
                ind = productos.find('CodigoArticulo', codigo);
                if (ind != -1) { // Validamos que el elemento de la orden esté en los elementos actuales del store.
                    cantidadActual = productos.getAt(ind).get('cantidad');
                    productos.getAt(ind).set('cantidad', cantidadActual + cantidad);
                }
            });
        }
    },

    /**
     * Al dispararse el evento pop de navigationorden muestra el botón agregarProductos si el ítem activo es
     * clientecontainer o editarpedidoform, esto sucede cuando se selecciona la moneda o la dirección.
     * @param t Éste navigationview.
     * @param v La vista que ha sido popeada.
     */
    onPopNavigationOrden: function (t, v) {
        var me = this,
            view = me.getMain().getActiveItem(),
            tabPanel = me.getOpcionesOrden(),
            itemActivo = t.getActiveItem().getActiveItem();

        if (itemActivo.isXType('clientecontainer') || itemActivo.isXType('editarpedidoform')) {
            view.getNavigationBar().down('#agregarProductos').show();
        }

        if (itemActivo.isXType('partidacontainer') && v.isXType('agregarproductosform')) {
            view.getNavigationBar().down('#agregarProductos').show();
        }

        t.getNavigationBar().setTitle(me.idCliente);
    },

    /**
     * Confirma si se desea terminar la orden de venta.
     */
    confirmaTerminarOrden: function (newActiveItem, t, oldActiveItem, eOpts) {
        var me = this;

        if (me.actionOrden == 'crear') {
            Ext.Msg.confirm("Terminar orden", "¿Desea terminar la orden de venta?", function (e) {

                if (e == 'yes') {
                    me.onTerminarOrden();
                } else {
                    me.getOpcionesOrden().setActiveItem(0);
                }
            });
        } else {
            Ext.Msg.confirm("Actualizar orden", "¿Desea actualizar la orden de venta?", function (e) {

                if (e == 'yes') {                    
                    me.onTerminarOrden();
                } else {
                    me.getOpcionesOrden().setActiveItem(0);
                }
            });
        }

    },

    /**
     * Termina la orden del pedido.
     */
    onTerminarOrden: function () {
        var me = this,
            total = 0,
            store = Ext.getStore('Ordenes'),
            array = store.getData().items,
            url, msg,
            clienteSeleccionado = me.clienteSeleccionado;

        me.getMain().getActiveItem().getMasked().setMessage('Enviando orden...');
        me.getMain().getActiveItem().setMasked(true);

        if (array.length > 0) {
            var params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "Orden.CodigoSocio": me.idCliente,
                "Orden.NombreSocio": me.titulo,
                "Orden.FechaCreacion": Ext.DateExtras.dateFormat(new Date(), 'Y-m-d'),
                "Orden.FechaEntrega": Ext.DateExtras.dateFormat(new Date(), 'Y-m-d'),
                "Orden.CodigoMoneda": me.codigoMonedaSeleccinada.trim(),
                "Orden.CodigoImpuesto": me.codigoImpuesto,
                "Orden.RFCSocio": clienteSeleccionado.RFC,
                "Orden.DireccionEntrega": me.direccionEntrega,
                "Orden.DireccionFiscal": me.direccionFiscal,                
            };            

            Ext.Array.forEach(array, function (item, index, allItems) {
                var moneda = item.get('moneda'),
                    precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio')),
                    precioConDescuento = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento'));
                    //importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad');

                if(moneda != me.codigoMonedaPredeterminada){ // Si la moneda del artículo es diferente a la predeterminada hay que hacer una conversión.
                    precioConDescuento *= me.tipoCambio;
                    precio /= me.tipoCambio;
                    precio = parseFloat(precio.toFixed(2));
                    console.log('moneda diferente ' + moneda + 'p ' + me.codigoMonedaPredeterminada + 'p');
                }

                importe = precioConDescuento * item.get('cantidad');
                total += precioConDescuento * item.get('cantidad') + item.get('totalDeImpuesto');

                params["Orden.Partidas[" + index + "].CodigoArticulo"] = item.get('CodigoArticulo');
                params["Orden.Partidas[" + index + "].Cantidad"] = item.get('cantidad');
                params["Orden.Partidas[" + index + "].Precio"] = precio;//Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio'));
                params["Orden.Partidas[" + index + "].CodigoAlmacen"] = item.get('CodigoAlmacen');
                params["Orden.Partidas[" + index + "].Linea"] = index;
                params["Orden.Partidas[" + index + "].Moneda"] = moneda.trim();//item.get('moneda').trim();
                params["Orden.Partidas[" + index + "].Importe"] = importe;//Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad');
                params["Orden.Partidas[" + index + "].PorcentajeDescuento"] = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('PorcentajeDescuento'));
                params["Orden.Partidas[" + index + "].tipoCambio"] = item.get('TipoCambio');
            });

            params["Orden.TotalDocumento"] = parseFloat(total.toFixed(2));

            if (me.actionOrden == 'crear') {
                url = "http://" + me.dirIP + "/iMobile/COK1_CL_OrdenVenta/AgregarOrdenMobile";
                msg = "Se agrego la orden correctamente con folio: ";
            } else {
                params["Orden.NumeroDocumento"] = me.NumeroDocumento;
                url = "http://" + me.dirIP + "/iMobile/COK1_CL_OrdenVenta/ActualizarOrdenVentaiMobile";
                msg = "Se acualizo la orden correctamente con folio: ";
            }

            console.log(params);

            Ext.data.JsonP.request({
                url: url,
                params: params,
                callbackKey: 'callback',
                success: function (response) {                    
                    if (response.Procesada) {
                        me.getMain().getActiveItem().setMasked(false);
                        me.getMain().setActiveItem(1);
                        Ext.Msg.alert("Orden Procesada", msg + response.CodigoUnicoDocumento);
                        store.clearData();
                        me.getNavigationOrden().remove(me.getNavigationOrden().down('toolbar'), true);
                        me.getMenu().remove(me.getMenu().down('toolbar'), true);
                        me.getMain().getActiveItem().pop();
                    } else {
                        me.getMain().getActiveItem().setMasked(false);
                        Ext.Msg.alert("Orden No Procesada", "No se proceso la orden correctamente: " + response.Descripcion);
                        me.getOpcionesOrden().setActiveItem(0);
                    }
                }
            });
        } else {
            me.getMain().getActiveItem().setMasked(false);
            me.getOpcionesOrden().setActiveItem(0);
            Ext.Msg.alert("Productos", "Selecciona al menos un Producto");
        }
    },

    onSeleccionarTransaccion: function (t, index, target, record, e, eOpts) {
        var me = this,
            view = me.getMenu(),
            store = Ext.getStore('Ordenes'),
            barraTitulo = ({
            xtype: 'toolbar',
            docked: 'top',
            title: 'titulo'
        });

        me.getMain().getAt(2).setMasked(false);

        Ext.data.JsonP.request({
            url: "http://" + me.dirIP + "/iMobile/COK1_CL_Consultas/RegresarOrdenVentaiMobile",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                Criterio: record.get('NumeroDocumento')
            },
            callbackKey: 'callback',
            success: function (response) {
                var response = response.Data[0],
                    partidas = response.Partidas;
                
                me.codigoMonedaSeleccinada = response.CodigoMoneda + ' ';
                me.NumeroDocumento = record.get('NumeroDocumento');
console.log(response);
                if (partidas.length < 2) {
                    me.getPartidaContainer().down('list').emptyTextCmp.show();
                } else {
                    me.getPartidaContainer().down('list').emptyTextCmp.hide();
                }

                partidas.forEach(function (item, index) {
                    console.log(item, 'Item');
                var moneda = item.Moneda + ' ',
                    precio = item.Importe / item.Cantidad,
                    precioConDescuento = item.PrecioDescuento,
                    importe = item.Importe;

/*                    console.log(precio);
                    console.log(precioConDescuento);
                    me.tipoCambio = precio / precioConDescuento;
                    console.log(me.tipoCambio);*/
                    //importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad');
/*                    console.log(precioConDescuento, "Precio con descuento");
                    if(moneda != me.codigoMonedaSeleccinada){ // Si la moneda del artículo es diferente a la seleccionada hay que hacer una conversión.
                        precioConDescuento *= me.tipoCambio;
                        precio /= me.tipoCambio;
                        console.log('moneda diferente ' + moneda + 'p ' + me.codigoMonedaSeleccinada + 'p');
                    }*/

                    //importe = Imobile.core.FormatCurrency.currency(precioConDescuento * item.Cantidad, me.codigoMonedaSeleccinada) ;//get('cantidad');
                //total += precioConDescuento * item.get('cantidad') + item.get('totalDeImpuesto');

                    partidas[index].cantidad = partidas[index].Cantidad;
                    partidas[index].importe = Imobile.core.FormatCurrency.currency(importe, me.codigoMonedaSeleccinada);
                    partidas[index].totalDeImpuesto = partidas[index].TotalImpuesto;
                    partidas[index].Imagen = 'http://' + me.dirIP + partidas[index].Imagen;
                    partidas[index].moneda = partidas[index].Moneda + ' ';
                    partidas[index].precioConDescuento = Imobile.core.FormatCurrency.currency(precioConDescuento, me.codigoMonedaSeleccinada);
                    partidas[index].Precio = Imobile.core.FormatCurrency.currency(precio, me.codigoMonedaSeleccinada);
                    partidas[index].nombreMostrado = Ext.String.ellipsis(partidas[index].NombreArticulo, 25, false);
                    //partidas[index].CodigoAlmacen = partidas[index].CodigoAlmacen;
                    partidas[index].PorcentajeDescuento = partidas[index].PorcentajeDescuento + '%';
                    partidas[index].esOrdenRecuperada = true;

                    console.log(partidas[index]);
                });

                if(me.codigoMonedaSeleccinada != me.codigoMonedaPredeterminada){
                    var monedas = Ext.getStore('Monedas'),
                        indMoneda = monedas.find('CodigoMoneda', me.codigoMonedaSeleccinada.trim());
                        console.log(monedas.getAt(indMoneda));

                    me.estableceMonedaPredeterminada(monedas.getAt(indMoneda));
                }
                                
                store.setData(partidas);
                Ext.getStore('Productos').setData(partidas);                
                me.getMain().setActiveItem(2); // Activamos el item 2 del menu principal navigationorden
                me.getMain().getActiveItem().getNavigationBar().setTitle(me.idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
                me.getMain().getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.actualizarTotales();
                barraTitulo.title = me.titulo;
                me.getMain().getActiveItem().add(barraTitulo);
            }
        });

    },

    actualizarTotales: function () {
        var me = this,
            store = Ext.getStore('Ordenes'),
            precioTotal = 0,
            descuentoTotal = 0,
            total = 0,
            tax = 0;

        store.each(function (item) {
            precioTotal += Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad');

            // descuentoTotal += Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('descuento')) * item.get('cantidad');
            tax += item.get('totalDeImpuesto');

        });

        me.getOrdenContainer().down('#descuento').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">' + me.codigoMonedaSeleccinada + '0.00</div>'}); //Imobile.core.FormatCurrency.currency(importe, '$')
        me.getOrdenContainer().down('#subtotal').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">' + Imobile.core.FormatCurrency.currency(parseFloat(precioTotal), me.codigoMonedaSeleccinada)/*.toFixed(2)*/ + '</div>'});
        me.getOrdenContainer().down('#tax').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">' + Imobile.core.FormatCurrency.currency(parseFloat(tax), me.codigoMonedaSeleccinada) + '</div>'});
        me.getOrdenContainer().down('#total').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">' + Imobile.core.FormatCurrency.currency(parseFloat(precioTotal + tax), me.codigoMonedaSeleccinada) + '</div>' });
    },

    /**
     * Muestra la lista de los almacenes disponibles.
     */
    onListAlmacen: function (t, e, eOpts) {
        var me = this,
            view = me.getMain().getActiveItem(),
            value = view.down('agregarproductosform').getValues();

        view.push({
            xtype: 'almacenlist',
            codigoArticulo: value.CodigoArticulo
        });

        view.down('almacenlist').setData(me.almacenes);
    },

    onSeleccionarAlmacen: function (t, index, target, record, e, eOpts) {
        var me = this,
            view = me.getMain().getActiveItem();

        Ext.Array.forEach(me.almacenes, function (item, index) {
            item.Predeterminado = false;
        });

        me.almacenes[index].Predeterminado = true;
        console.log(me.almacenes[index]);
        //me.CodigoAlmacen = me.almacenes[index].CodigoAlmacen; //record.get('CodigoAlmacen');

        Ext.data.JsonP.request({
            url: "http://" + me.dirIP + "/iMobile/COK1_CL_Consultas/ObtenerDisponibleiMobile",
            params: {
                CodigoUsuario: localStorage.getItem('CodigoUsuario'),
                CodigoSociedad: '001',
                CodigoDispositivo: '004',
                ItemCode: t.codigoArticulo,
                Token: localStorage.getItem("Token"),
                Almacen: record.get('CodigoAlmacen')
            },
            callbackKey: 'callback',
            success: function (response) {

                var procesada = response.Procesada,
                valor = {
                    Disponible: 'Disponible', 
                    NombreAlmacen: record.get('NombreAlmacen'),
                    CodigoAlmacen: record.get('CodigoAlmacen')
                };

                if(procesada){
                    valor.Disponible = parseFloat(response.Data[0]).toFixed(2);                    
                } else {
                    valor.Disponible = 'Error al obtener disponible';
                }

                    view.down('agregarproductosform').setValues(valor);
                    view.pop();
            }
        });
    },

    /**
     * Obtiene el tipo de cambio actual de acuerdo a la moneda que le pasan, este valor lo deja en la variable global tipoCambio.
     * @param moneda La divisa cuyo tipo de cambio se necesita.
     */
    obtenerTipoCambio: function (moneda, record) {
        var me = this,             
            form = me.getOpcionesOrden().down('editarpedidoform'),            
            view = me.getNavigationOrden().getActiveItem();

        Ext.data.JsonP.request({
            url: "http://" + me.dirIP + "/iMobile/COK1_CL_Consultas/RegresarTipoCambio",
            params: {
                CodigoUsuario: localStorage.getItem('CodigoUsuario'),
                CodigoSociedad: '001',
                CodigoDispositivo: '004',
                Token: localStorage.getItem("Token"),
                Criterio: moneda
            },
            callbackKey: 'callback',
            success: function (response) {
                if (response.Procesada) {
                    me.tipoCambio = parseFloat(response.Data[0]).toFixed(2);
                    
                    if (view.isXType('agregarproductosform')) {
                        me.ayudaAAgregar(view, 'monedaDiferente');
                        me.ayudaAAgregar(view, 'cantidad'); // Se modifica la cantidad sólo si el tipo de cambio es exitoso.
                    } else {
                        me.codigoMonedaSeleccinada = moneda;
                        //me.codigoMonedaPredeterminada = moneda;
                        form.setValues({
                            CodigoMoneda: moneda,
                            tipoCambio: me.tipoCambio
                        });
                        me.estableceMonedaPredeterminada(record); // Para pintar la palomita
                        me.actualizaOrden(moneda);
                        //me.actualizarTotales();
                    }

                } else {
                    var error = response.Descripcion;
                    me.mandaMensaje('Error', error);                    
                    // form.setValues({
                    //     CodigoMoneda: me.codigoMonedaSeleccinada,
                    //     tipoCambio: me.tipoCambio
                    // });
                }
            }
        });        
    }

});