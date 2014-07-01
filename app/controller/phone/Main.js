Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    esFavorito: undefined, // Para saber si el producto se visualiza en el panel de productos.
    idCliente: undefined, // EL id del cliente.
    entrega: undefined, // Para saber si la dirección es de entrega o fiscal.
    titulo: undefined, // El titulo del navigationbar del navigationorden.
    opcion: undefined, // Guarda la opción elegida del  menú principal.    
    clienteSeleccionado: undefined, // Guarda los valores del cliente seleccionado.
    //CodigoAlmacen: undefined, // El código del almacén.
    codigoImpuesto: undefined, // El código de impuesto.
    tasaImpuesto: 0, // La tasa de impuesto.
    sujetoImpuesto: undefined, // Para saber si el artítulo es sujeto de impuesto o no.
    totalDeImpuesto: 0, // Guarda el total de impuesto si es que lo hay.
    codigoMonedaPredeterminada: undefined, // Guarda el código de moneda predeterminada.
    codigoMonedaSeleccinada: undefined, // Guarda el código de moneda seleccionada.
    tipoCambio: 1, // El tipo de cambio
    aPagar: 0,
    pagado: 0,
    pendiente: 0,
    actionOrden: undefined,

    requires: [
        'Ext.device.Notification',
        'Ext.Img'
    ],

    config: {
        control: {
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
            'clienteslist #buscarClientes': {
                clearicontap: 'limpiaBusquedaClientes'
            },
            'clienteslist #btnBuscarClientes': {
                tap: 'onBuscaClientes'
            },
            'clienteslist': {
                itemtap: 'alSelecionarCliente'
            },
            'opcionclientelist': {
                itemtap: 'onOpcionesCliente'
            },
            /*'productosview': {
             itemtap: 'onTapFavorito'
             },*/
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
            /*            'opcionesorden #addOrden': {
             activate: 'onAddOrden'
             },*/
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
            'cobranzalist': {
                itemtap: 'muestraFacturasPendientes'
            },
            'facturascontainer #aplicarPago': {
                tap: 'aplicaPago'
            },
            'formasdepagolist': {
                itemtap: 'muestraCobranza'
            },
            'transaccionlist': {
                itemtap: 'onSeleccionarTransaccion'
            },
            'almacenlist': {
                itemtap: 'onSeleccionarAlmacen'
            },
            'prospectoslist #agregar': {
                tap: 'onAgregarProspecto'
            },
            'prospectosform checkboxfield': {
                change: 'toggleFieldSetItems'
            },
            'prospectosform numberfield': {
                keyup: 'respondeAKeyUp'
            },
            'fileLoadBtn': {
                loadsuccess: 'onFileLoadSuccess',
                loadfailure: 'onFileLoadFailure'
            }
        }
    },

    /**
     * Determina qué hacer de acuerdo a la opción elegida.
     * @param view Éste dataview
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     * @param eOpts Las opciones pasadas al objeto.
     */
    onSelectMenu: function (view, index, target, record, eOpts) {
        var me = this,
            view = me.getMenu();

        me.opcion = record.get('action');

        switch (me.opcion) {
            case 'sistema':
                view.push({
                    xtype: 'configuracionlist'
                });
                break;

            case 'prospectos':
                view.push({
                    //xtype: 'prospectoscontainer'
                    xtype: 'prospectoslist'
                });
                me.muestraClientes();
                break;
            case 'venta':
            case 'cobranza':
                view.push({
                    xtype: 'clienteslist',
                    opcion: me.opcion
                });

                Ext.getStore('Clientes').resetCurrentPage();

                Ext.getStore('Clientes').load();
                break;
            case 'salir':
                me.getMain().setActiveItem(0);
                break;
            case 'sincronizacion':
                view.push({
                    xtype: 'sincronizarcontainer'
                });
                break;
            case 'servidor':
                view.push({
                    xtype: 'servidorcontainer'
                });
                break;
            case 'inicializacion':
                view.push({
                    xtype: 'initializecontainer'
                });
                break;
            case 'configuracion':
                view.push({
                    xtype: 'configuracioncontainer'
                });
                break;
        }
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
            moneda = record.get('CodigoMoneda'),
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
                    tipoCambio: 1//me.tipoCambio
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

        switch (moneda) {
            case '$':
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
                break;

            case 'USD':
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
                break;
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
            boton = view.getNavigationBar().down('#agregarProductos'),
            clienteSeleccionado = me.getOpcionCliente().clienteSeleccionado;

        if (value.xtype == 'clientecontainer') {
            boton.setText('Back').show();
            boton.setUi('back');

            var form = value.down('clienteform'),
                direcciones = Ext.getStore('Direcciones');

            form.setValues(clienteSeleccionado);
        }

        if (value.xtype == 'editarpedidoform') {
            if (me.codigoMonedaSeleccinada == me.codigoMonedaPredeterminada) {
                clienteSeleccionado.tipoCambio = 1;
            } else {
                clienteSeleccionado.tipoCambio = me.tipoCambio;
            }

            clienteSeleccionado.CodigoMoneda = me.codigoMonedaSeleccinada;
            value.setValues(clienteSeleccionado);
            boton.setText('Back').show();
            boton.setUi('back');
        }

        if (value.xtype == 'partidacontainer') {
            boton.setText('Agregar').show();
            boton.setUi('normal');
        }
    },

    /*    traeCliente: function () {
     var me = this,
     clientes = Ext.getStore('Clientes'),
     ind = clientes.find('CodigoSocio', me.idCliente),
     datos = clientes.getAt(ind).data;

     return datos;
     },*/

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
        console.log(values);


        Ext.getStore('Productos').resetCurrentPage();

        if (Ext.isEmpty(descripcion) || Ext.isEmpty(cantidad)) {
            me.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {
            if (form.modo != 'edicion') {
                if (moneda != me.codigoMonedaSeleccinada) {
                    if (moneda == me.codigoMonedaPredeterminada) {
                        me.mandaMensaje('Imposible agregar', 'No es posible agregar el producto a la orden debido a que la configuración de moneda actual es ' + me.codigoMonedaSeleccinada + '  y la moneda del producto es ' + moneda + '. Cambie primero la configuración de moneda a ' + moneda + '.');
                    } else {
                        me.ayudaAAgregar(form, 'cantidad');
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
        var form, values, descripcion, cantidad, ordenes, codigo, indPro, productoAgregado, cantidadActual, precio,
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
                ordenes.add(values);
                menu.pop();
                me.actualizarTotales();
                break;

            case 'monedaDiferente':
                precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio) * me.tipoCambio;
                values.importe = precio * cantidad;
                precio = Imobile.core.FormatCurrency.currency(precio, me.codigoMonedaSeleccinada);
                values.Precio = precio;
                values.importe = Imobile.core.FormatCurrency.currency(values.importe, me.codigoMonedaSeleccinada);
                values.totalDeImpuesto = me.totalDeImpuesto * me.tipoCambio;
                //values.descuento = values.descuento;
                values.Imagen = productoAgregado.get('Imagen');
                ordenes.add(values);
                menu.pop();
                me.actualizarTotales();
                break;

            case 'edicion':
                var ind = form.ind,
                    datosProducto = ordenes.getAt(ind),
                    totalDeImpuesto,
                    moneda = values.moneda;

                if (moneda != me.codigoMonedaSeleccinada) {
                    precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio) * me.tipoCambio;
                    importe = precio * cantidad;
                    precio = Imobile.core.FormatCurrency.currency(precio, me.codigoMonedaSeleccinada);
                    importe = Imobile.core.FormatCurrency.currency(importe, me.codigoMonedaSeleccinada);
                    totalDeImpuesto = me.totalDeImpuesto * me.tipoCambio;
                    datosProducto.set('Precio', precio);
                    datosProducto.set('cantidad', cantidad);
                    datosProducto.set('importe', importe);
                    datosProducto.set('totalDeImpuesto', /*Imobile.core.FormatCurrency.currency(me.totalDeImpuesto, '$')*/ totalDeImpuesto);
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

    /*    muestraProductos: function () {
     Ext.getStore('Productos').load();
     },*/

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

    onBuscaClientes: function (t, e, eOpts) {
        var store = Ext.getStore('Clientes'),
            value = t.up('toolbar').down('#buscarClientes').getValue();

        Ext.getStore('Clientes').resetCurrentPage();

        store.setParams({
            Criterio: value
        });
        store.load();
    },

    limpiaBusquedaClientes: function (t, e, eOpts) {
        var store = Ext.getStore('Clientes');

        Ext.getStore('Clientes').resetCurrentPage();

        store.setParams({
            Criterio: ''
        });
        store.load();
    },

    /**
     * Filtra el store de productos por la variable esFavorito.
     * @param esFavorito Variable booleana para indicar si es favorito (true) o no (false).
     */
    lista: function (esFavorito) {
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
     * Establece el título y el id del cliente cada uno en una variable. Verifica de qué opción viene, venta o cobranza:
     * Venta: Muestra la vista de ventas y establece como predeterminadas las primeras direcciones que encuentra tanto fiscal
     * como de entrega, si este cliente no tiene dirección fiscal manda un mensaje y no permite avanzar.
     * Cobranza: Muestra la vista de cobranza.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    alSelecionarCliente: function (list, index, target, record) {

        var me = this,
            view = me.getMenu(),
            name = record.get('NombreSocio'),
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: 'titulo'
            });

        me.idCliente = record.get('CodigoSocio');
        me.titulo = name;
        barraTitulo.title = me.titulo;

        me.opcion = list.opcion;

        switch (me.opcion) {
            case 'venta':
                view.push({
                    xtype: 'opcionclientelist',
                    title: me.idCliente,//me.titulo,
                    clienteSeleccionado: record.data
                });

                var clienteSeleccionado = me.getOpcionCliente().clienteSeleccionado,
                    direcciones = Ext.getStore('Direcciones');
                direcciones.setData(clienteSeleccionado.Direcciones);
                direcciones.clearFilter();
                direcciones.filter('TipoDireccion', 'S');

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
                    me.mandaMensaje('Sin dirección fiscal', 'Este cliente no cuenta con dirección fiscal, solicite una al SAP.');
                    view.pop();
                    direcciones.removeAll();
                }

                break;
            case 'cobranza':
                view.push({
                    xtype: 'cobranzalist',
                    title: me.idCliente
                });
                view.add(barraTitulo);
                //me.getTotales().up('totalapagarcontainer')
                break;
        }
        this.muestralistaOrden();
    },

    /**
     * Muestra el formulario para agregar un producto a la orden.
     * @param list Esta lista.
     * @param index El índice del item tapeado.
     * @param target El elemento o DataItem tapeado.
     * @param record El record asociado al ítem.
     */
    onAgregarProducto: function (list, index, target, record, e) {
        var me = this, precio,
            view = me.getMain().getActiveItem(),
            valores = record.data,
            moneda = valores.ListaPrecios[0].CodigoMoneda,
            valoresForm,
            almacenes = me.almacenes,
            desc,
            preciocondescuento,
            totaldeimpuesto,
            importe,
            valoresForm;

        if (view.getActiveItem().xtype == 'agregarproductosform') {
            return;
        }

        if (false/*me.estaEnOrden(valores.CodigoArticulo) != -1*/) {  // Validamos si el producto ya está en la orden.
            me.editarPartida(list, index, target, record); // Si ya está, lo editamos en vez de agregarlo.
        } else {

            view.push({
                xtype: 'agregarproductosform',
                modo: 'agregar'
            });

            Ext.Array.forEach(almacenes, function (item, index) {
                var predeterminado = item.Predeterminado;

                if (predeterminado) {
                    valores.NombreAlmacen = item.NombreAlmacen;
                    valores.CodigoAlmacen = item.CodigoAlmacen
                    //me.CodigoAlmacen = item.CodigoAlmacen;
                }
            });

            var form = view.getActiveItem();

            form.setValues(valores);
            //Se establece el valor de cantidad, precio y moneda

            precio = Imobile.core.FormatCurrency.currency(valores.ListaPrecios[0].Precio, moneda),
                cantidad = 1;

            //Se calcula descuento
            Ext.data.JsonP.request({
                url: "http://25.15.241.121:88/iMobile/COK1_CL_Consultas/ObtenerPrecioEspecialiMobile",
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
                        precio2 = Imobile.core.FormatCurrency.formatCurrencytoNumber(precio),
                        desc = precio2 - response.Data[0];
                    desc = desc * 100 / precio2;

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
                            precioConDescuento: Imobile.core.FormatCurrency.currency(preciocondescuento, moneda)
                        });

                    } else {
                        Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                    }
                }
            });
        }
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
        //values = ordenes.getAt(ind).data;
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
            valuesForm = me.ponValoresOriginalesAAgregarProductoForm(values, values.moneda);
            form.setValues(valuesForm);
            form.setValues({
                importe: valuesForm.importe
            })
        } else {
            form.setValues(values);
        }
        //form.setValues(values);
    },

    ponValoresOriginalesAAgregarProductoForm: function (values, moneda) {
        var me = this,

            precio, importe, newObject, totalDeImpuesto;

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

        if (moneda != me.codigoMonedaSeleccinada) {
            if (moneda == 'USD' && me.codigoMonedaSeleccinada == '$') {
                precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio) / me.tipoCambio;
                importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.importe) / me.tipoCambio;
                totalDeImpuesto = values.totalDeImpuesto;
                newObject.Precio = Imobile.core.FormatCurrency.currency(precio, moneda);
                newObject.importe = Imobile.core.FormatCurrency.currency(importe, moneda);
                newObject.totalDeImpuesto = totalDeImpuesto / me.tipoCambio;

            }
        }

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
                viewPrincipal.setActiveItem(2); // Activamos el item 2 del menu principal navigationorden
                me.getNavigationOrden().getNavigationBar().setTitle(me.idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
                viewPrincipal.getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.getPartidaContainer().down('list').emptyTextCmp.show();

                var storeMonedas = Ext.getStore('Monedas');

                storeMonedas.load({
                    callback: function (records, operation) {
                        Ext.Array.each(records, function (item, index, ItSelf) {
                            var predeterminada = item.get('Predeterminada');
                            if (predeterminada) {
                                me.codigoMonedaPredeterminada = item.get('CodigoMoneda');
                                me.codigoMonedaSeleccinada = me.codigoMonedaPredeterminada;
                            }

                            me.actualizarTotales();

                        });
                    }
                });

                viewPrincipal.getActiveItem().add(barraTitulo);

                break;
            case 'visualizar':
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
                break;
        }
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
                CardCode: me.idCliente
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

        Ext.Msg.confirm("Terminar orden", "¿Desea terminar la orden de venta?", function (e) {

            if (e == 'yes') {
                me.onTerminarOrden();
            } else {
                me.getOpcionesOrden().setActiveItem(0);
            }
        });
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
            clienteSeleccionado = me.getOpcionCliente().clienteSeleccionado;

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
                "Orden.CodigoMoneda": '$',
                "Orden.CodigoImpuesto": me.codigoImpuesto,
                "Orden.RFCSocio": clienteSeleccionado.RFC,
                "Orden.DireccionEntrega": me.direccionEntrega,
                "Orden.DireccionFiscal": me.direccionFiscal
            };

            console.log(params);
            Ext.Array.forEach(array, function (item, index, allItems) {
                total += (Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad')) + item.get('totalDeImpuesto');

                params["Orden.Partidas[" + index + "].CodigoArticulo"] = item.get('CodigoArticulo');
                params["Orden.Partidas[" + index + "].Cantidad"] = item.get('cantidad');
                params["Orden.Partidas[" + index + "].Precio"] = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio'));
                params["Orden.Partidas[" + index + "].CodigoAlmacen"] = item.get('CodigoAlmacen');
                params["Orden.Partidas[" + index + "].Linea"] = index;
                params["Orden.Partidas[" + index + "].Moneda"] = item.get('moneda');
                params["Orden.Partidas[" + index + "].Importe"] = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad');
                params["Orden.Partidas[" + index + "].PorcentajeDescuento"] = parseInt(item.get('PorcentajeDescuento'));
            });

            params["Orden.TotalDocumento"] = parseFloat(total).toFixed(2);

            if (me.actionOrden == 'crear') {
                url = "http://25.15.241.121:88/iMobile/COK1_CL_OrdenVenta/AgregarOrdenMobile";
                msg = "Se agrego la orden correctamente con folio: ";
            } else {
                url = "http://25.15.241.121:88/iMobile/COK1_CL_OrdenVenta/ActualizarOrdenVentaiMobile";
                msg = "Se acualizo la orden correctamente con folio: ",
                    params["Orden.NumeroDocumento"] = me.NumeroDocumento;
            }
            console.log(params, 'paramss actualizar')
            Ext.data.JsonP.request({
                url: url,
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    console.log(response, 'akhkahahajhajdh');
                    if (response.Procesada) {
                        me.getMain().setActiveItem(1);
                        Ext.Msg.alert("Orden Procesada", msg + response.CodigoUnicoDocumento);
                        store.clearData();
                        me.getNavigationOrden().remove(me.getNavigationOrden().down('toolbar'), true);
                        me.getMenu().remove(me.getMenu().down('toolbar'), true);
                        me.getMain().getActiveItem().pop();
                    } else {
                        Ext.Msg.alert("Orden No Procesada", "No se proceso la orden correctamente: " + response.Descripcion);
                        me.getOpcionesOrden().setActiveItem(0);
                    }
                }
            });
        } else {
            me.getOpcionesOrden().setActiveItem(0);
            Ext.Msg.alert("Productos", "Selecciona al menos un Producto");
        }
    },

    //// Control de cobranza

    muestraFacturasPendientes: function () {
        var me = this,
            view = me.getMenu(),
            store = Ext.getStore('Facturas');

        view.push({
            xtype: 'facturascontainer',
            title: me.idCliente
        });

        params = {
            CardCode: me.idCliente
        };

        store.setParams(params);
        store.load();
    },

    aplicaPago: function () {
        var me = this,
            view = me.getMenu(),
            i,
            total = 0,
            seleccion = view.getActiveItem().down('facturaslist').getSelection();

        for (i = 0; i < seleccion.length; i++) {
            total += seleccion[i].data.TotalDocumento;
        }

        me.aPagar = total;

        view.push({
            xtype: 'formasdepagolist',
            title: me.idCliente
        });
    },

    muestraCobranza: function (list, index, target, record) {
        var me = this,
            view = me.getMenu(),
            forma = record.get('Nombre'),
            permiteCambio = record.get('PermiteCambio');

        view.push({
            xtype: 'totalapagarcontainer',
            title: me.idCliente
        });

        Ext.Msg.prompt(forma, 'Ingrese el monto a pagar:', function (text, entrada) {
            if (text === 'ok') {
                var pendiente = me.aPagar - me.pagado;
                console.log(pendiente);
                console.log(entrada);
                console.log(permiteCambio);
                console.log(entrada > pendiente);

                if(permiteCambio === 'false'){
                    console.log('no se permite dar cambio');
                    if(entrada > pendiente){
                        me.mandaMensaje('Sin cambio', 'Esta forma de pago no permite dar cambio, disminuya la cantidad.');
                    } else {
                        me.sumaCobros(forma, entrada);
                    }                       
                } else {
                    console.log('si se permite dar cambio');
                    me.sumaCobros(forma, entrada);
                }

            } else {

            }
        });

        me.getTotales().down('#aCobrar').setItems({xtype: 'container', html: me.aPagar});
        me.getTotales().down('#pagado').setItems({xtype: 'container', html: me.pagado});
        me.getTotales().down('#pendiente').setItems({xtype: 'container', html: me.aPagar - me.pagado});
    },

    sumaCobros: function (forma, entrada){
        var me = this,
            store = Ext.getStore('Totales');

        store.add({
            tipo: forma,
            monto: entrada
        });

        me.pagado = 0;

        store.each(function (item) {
                    me.pagado += parseFloat(item.get('monto'));
        });

        me.getTotales().down('#pagado').setItems({xtype: 'container', html: me.pagado});
        me.getTotales().down('#pendiente').setItems({xtype: 'container', html: me.aPagar - me.pagado});        
    },

    onSeleccionarTransaccion: function (t, index, target, record, e, eOpts) {
        var me = this,
            view = me.getMenu(),
            store = Ext.getStore('Ordenes');
        barraTitulo = ({
            xtype: 'toolbar',
            docked: 'top',
            title: 'titulo'
        });

        Ext.data.JsonP.request({
            url: "http://25.15.241.121:88/iMobile/COK1_CL_Consultas/RegresarOrdenVentaiMobile",
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

                me.codigoMonedaSeleccinada = response.CodigoMoneda;
                me.NumeroDocumento = record.get('NumeroDocumento');

                if (partidas.length < 2) {
                    me.getPartidaContainer().down('list').emptyTextCmp.show();
                } else {
                    me.getPartidaContainer().down('list').emptyTextCmp.hide();
                }
                partidas.forEach(function (item, index) {
                    console.log(item, 'itemmmmm');
                    partidas[index].cantidad = partidas[index].Cantidad;
                    partidas[index].importe = Imobile.core.FormatCurrency.currency(parseFloat(partidas[index].Importe));
                    partidas[index].totalDeImpuesto = partidas[index].TotalImpuesto;
                    partidas[index].Imagen = 'http://25.15.241.121:88' + partidas[index].Imagen;
                    partidas[index].moneda = partidas[index].Moneda;
                    partidas[index].precioConDescuento = Imobile.core.FormatCurrency.currency(parseFloat(partidas[index].PrecioDescuento));
                    partidas[index].Precio = Imobile.core.FormatCurrency.currency(parseFloat(partidas[index].Precio));
                    partidas[index].CodigoAlmacen = partidas[index].CodigoAlmacen;
                    partidas[index].PorcentajeDescuento = '%' + partidas[index].PorcentajeDescuento;
                });
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
            precioTotal += Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio')) * item.get('cantidad');

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
        //me.CodigoAlmacen = me.almacenes[index].CodigoAlmacen; //record.get('CodigoAlmacen');

        Ext.data.JsonP.request({
            url: "http://25.15.241.121:88/iMobile/COK1_CL_Consultas/ObtenerDisponibleiMobile",
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
                var valor = {
                    Disponible: parseFloat(response.Data[0]).toFixed(2),
                    NombreAlmacen: record.get('NombreAlmacen'),
                    CodigoAlmacen: record.get('CodigoAlmacen')
                };
                view.down('agregarproductosform').setValues(valor);

                console.log(view.down('agregarproductosform').getValues())

                view.pop();
            }
        });
    },


    /**
     * Obtiene el tipo de cambio actual de acuerdo a la moneda que le pasan, éste valor lo deja en la variable global tipoCambio.
     * @param moneda La divisa cuyo tipo de cambio se necesita.
     */
    obtenerTipoCambio: function (moneda, record) {
        var me = this,

            form = me.getOpcionesOrden().down('editarpedidoform'),
            view = me.getNavigationOrden().getActiveItem();

        Ext.data.JsonP.request({
            url: "http://25.15.241.121:88/iMobile/COK1_CL_Consultas/RegresarTipoCambio",
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
                    me.tipoCambio = response.Data[0];

                    if (view.isXType('agregarproductosform')) {
                        me.ayudaAAgregar(view, 'monedaDiferente');
                    } else {
                        me.codigoMonedaSeleccinada = moneda;
                        //me.codigoMonedaPredeterminada = moneda;
                        form.setValues({
                            CodigoMoneda: moneda,
                            tipoCambio: response.Data[0]
                        });
                        me.estableceMonedaPredeterminada(record);
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
    },

    //////////// Controlador de Prospectos ////////////////////////

    onAgregarProspecto: function (btn) {
        var me = this,
            view = me.getMenu();

        view.push({
            xtype: 'prospectosform'
        });
    },

    toggleFieldSetItems: function (chk, value) {
        var items = chk.up('fieldset').getItems().items,
            numberfield, fieldToFocus = undefined;

        /*        if (!value) {
         chk.uncheck();
         console.log(false);
         return false;
         }*/

        Ext.each(items, function (item, index) {
            if (!value && index != 0) {
                item.disable();
                item.hide();
            } else {
                item.enable();
                item.show();
                if (item.isXType('numberfield')) {
                    //si se trata del primer numberfield dentros del fieldset,se debe de enfocar!!!               
                    fieldToFocus = fieldToFocus || index;
                    if (fieldToFocus === index) {
                        numberfield = item;
                        setTimeout(function () {
                            numberfield.focus();
                        }, 200);
                    }
                }
            }
        });
    },

    respondeAKeyUp: function (numberfield) {
        var padre = numberfield.getParent(),
            opcion = padre.getItemId();

        switch (opcion) {
            case 'superficie':
                var items = padre.getItems().items,
                    i, suma = 0;

                for (i = 1; i < items.length - 1; i++) {
                    suma += items[i].getValue();
                }

                padre.down('#total').setValue(suma).setDisabled(true);
                break;
        }
    },

    onFileLoadSuccess: function(dataurl, e) {
        console.log('File loaded');

        var me = this;
        var image = me.getLoadedImage();
        console.log(dataurl);
        localStorage.setItem('image', dataurl);
        image.setSrc(dataurl);
    },

    onFileLoadFailure: function(message) {
        Ext.device.Notification.show({
            title: 'Loading error',
            message: message,
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });
    }
});