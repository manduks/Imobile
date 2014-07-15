Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    esFavorito: undefined, // Para saber si el producto se visualiza en el panel de productos.
    idCliente: undefined, // EL id del cliente.
    entrega: undefined, // Para saber si la dirección es de entrega o fiscal.
    titulo: undefined, // El titulo del navigationbar del navigationorden.
    opcion: undefined, // Guarda la opción elegida del  menú principal.    
    clienteSeleccionado: undefined, // Guarda los valores del cliente seleccionado.
    CodigoAlmacen: undefined, // El código del almacén.
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
                //keyup: 'onBuscaClientes'
            },
            'clienteslist #btnBuscarClientes': {
                tap: 'onBuscaClientes'
            },
            'clienteslist': {
                //itemtap: 'alSelecionarCliente'
                itemsingletap: 'alSelecionarCliente'
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
                itemtap: 'onItemTapCobranzaList'
            },
            'totalapagarcontainer #cancelar': {
                tap: 'cancelaPago'
            },
            'totalapagarcontainer #terminar': {
                tap: 'onTerminarCobranza'
            },
            'navigationcobranza #agregarPago': {
                tap: 'onAgregarPago'
            },
            'navigationcobranza': {
                pop: 'onPopNavigationCobranza'
            },
            'facturascontainer #aplicarPago': {
                tap: 'muestraCobranza'
            },
            'formasdepagolist': {
                itemtap: 'agregaPago'
            },
            'montoapagarform #pagar': {
                tap: 'onPagar'
            },
            'totalapagarlist':{
                itemtap: 'editaPago',
                itemswipe: 'eliminaPago'
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
            view = me.getMenu(),

         opcion = record.get('action');

        switch (opcion) {
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
                    itemId: opcion
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

//        switch (moneda) {
            //case '$':
//            case me.codigoMonedaPredeterminada:        
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
                //break;
            } else {

//            case 'USD':
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
                //break;
   //     }
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
                precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio) * me.tipoCambio;
                values.importe = precio * cantidad;
                precio = Imobile.core.FormatCurrency.currency(precio, me.codigoMonedaSeleccinada);
                values.Precio = precio;
                values.importe = Imobile.core.FormatCurrency.currency(values.importe, me.codigoMonedaSeleccinada);
                values.totalDeImpuesto = me.totalDeImpuesto * me.tipoCambio;
                //values.descuento = values.descuento;
                values.Imagen = productoAgregado.get('Imagen');
                values.nombreMostrado = Ext.String.ellipsis(descripcion, 25, false);                
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
                    precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio) * me.tipoCambio;
                    importe = precio * cantidad;
                    precio = Imobile.core.FormatCurrency.currency(precio, me.codigoMonedaSeleccinada);
                    importe = Imobile.core.FormatCurrency.currency(importe, me.codigoMonedaSeleccinada);
                    totaldeimpuesto = me.totalDeImpuesto * me.tipoCambio;
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
            //value = t.getValue();

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
     * Venta: Muestra la vista de ventas.
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

        switch (list.getItemId()) {
            case 'venta':                                
                if (view.getActiveItem().xtype == 'opcionclientelist') {
                    return;
                }

                view.push({
                    xtype: 'opcionclientelist',
                    title: me.idCliente
                });

                Ext.data.JsonP.request({
                    url: "http://" + me.dirIP + "/iMobile/COK1_CL_Socio/ObtenerSocioiMobile",
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
                break;

            case 'cobranza':
                if (view.getActiveItem().xtype == 'cobranzalist') {
                    return;
                }

                view.push({
                    xtype: 'cobranzalist',
                    title: me.idCliente
                });

                view.add(barraTitulo);
                //me.getTotales().up('totalapagarcontainer')
                break;
        }
        //this.muestralistaOrden();
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
     * @param list Esta lista.
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
    //},

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
        precio = Imobile.core.FormatCurrency.currency(valores.ListaPrecios[0].Precio, moneda),
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
                    desc = precio2 - response.Data[0];
                    desc = desc * 100 / precio2;
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
//    ponValoresOriginalesAAgregarProductoForm: function (values, moneda) {
    ponValoresOriginalesAAgregarProductoForm: function (values) {
        var me = this,
            precio, importe, newObject, totaldeimpuesto, precioConDescuento,
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
            console.log(me.tipoCambio);            

        if (!values.esOrdenRecuperada) {
//            if (moneda == 'USD' && me.codigoMonedaSeleccinada == '$') {            
            if (moneda != me.codigoMonedaPredeterminada && me.codigoMonedaSeleccinada == me.codigoMonedaPredeterminada) {
                precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio) / me.tipoCambio;
                importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.importe) / me.tipoCambio;
                precioConDescuento = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento);

                
                newObject.totalDeImpuesto = newObject.totalDeImpuesto / me.tipoCambio;

                    /* else if (moneda == '$' && me.codigoMonedaSeleccinada == 'USD'){
                     precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio) * me.tipoCambio;
                     console.log(Imobile.core.FormatCurrency.formatCurrencytoNumber(values.Precio));
                     console.log(me.tipoCambio);
                     importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.importe) * me.tipoCambio;
                     totalDeImpuesto = values.totalDeImpuesto;
                     //values.precioConDescuento = Imobile.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento);
                     values.Precio = Imobile.core.FormatCurrency.currency(precio, moneda);
                     values.importe = Imobile.core.FormatCurrency.currency(importe, moneda);
                     //values.precioConDescuento = Imobile.core.FormatCurrency.currency(values.precioConDescuento, moneda);
                     values.totalDeImpuesto = totalDeImpuesto * me.tipoCambio;
                     //console.log(values);
                     }                */
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
//        }

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
                console.log(Ext.getStore('Totales').getCount());
                viewPrincipal.setActiveItem(2); // Activamos el item 2 del menu principal navigationorden
                me.getNavigationOrden().getNavigationBar().setTitle(me.idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
                viewPrincipal.getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.getPartidaContainer().down('list').emptyTextCmp.show();

/*                var storeMonedas = Ext.getStore('Monedas');

                storeMonedas.load({
                    callback: function (records, operation) {
                        Ext.Array.each(records, function (item, index, ItSelf) {
                            var predeterminada = item.get('Predeterminada');
                            if (predeterminada) {
                                me.codigoMonedaPredeterminada = item.get('CodigoMoneda') + ' ';
                                me.codigoMonedaSeleccinada = me.codigoMonedaPredeterminada;
                            }

                            me.actualizarTotales();

                        });
                    }
                });*/

                me.dameMonedaPredeterminada();
                me.actualizarTotales();

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
                "Orden.DireccionFiscal": me.direccionFiscal
            };
            Ext.Array.forEach(array, function (item, index, allItems) {
                var moneda = item.get('moneda'),
                    precio = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio')), 
                    precioConDescuento = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento'));
                    //importe = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad');

                if(moneda != me.codigoMonedaPredeterminada){ // Si la moneda del artículo es diferente a la predeterminada hay que hacer una conversión.
                    precioConDescuento *= me.tipoCambio;
                    precio /= me.tipoCambio;
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
            });

            params["Orden.TotalDocumento"] = parseFloat(total).toFixed(2);

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

    onSeleccionarTransaccion: function (t, index, target, record, e, eOpts) {
        var me = this,
            view = me.getMenu(),
            store = Ext.getStore('Ordenes'),
        barraTitulo = ({
            xtype: 'toolbar',
            docked: 'top',
            title: 'titulo'
        });

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
                var moneda = item.Moneda + ' ',//get('Moneda'),
                    precio = item.Importe / item.Cantidad,//Imobile.core.FormatCurrency.formatCurrencytoNumber(item.Precio),
                    precioConDescuento = item.PrecioDescuento,//Imobile.core.FormatCurrency.formatCurrencytoNumber(item.precioDescuento),
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
                var valor = {
                    Disponible: parseFloat(response.Data[0]).toFixed(2),
                    NombreAlmacen: record.get('NombreAlmacen'),
                    CodigoAlmacen: record.get('CodigoAlmacen')
                };
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
    },

    //// Control de cobranza

    /**
     * Muestra la lista de facturas pendientes asociadas al cliente elegido en clienteslist.
     */
    onItemTapCobranzaList: function (list, index, target, record) {
        var me = this,
            view = me.getMenu();


        switch(record.data.action){
            case 'cobranzaFacturas':            
                var store = Ext.getStore('Facturas');                

                view.push({
                    xtype: 'facturascontainer',
                    title: me.idCliente,
                    opcion: record.data.action
                });

                params = {
                    CardCode: me.idCliente
                };
                
                store.clearFilter();
                store.setParams(params);
                store.load();

                break;

            case 'anticipo':
                var store = Ext.getStore('Anticipos'),
                    anticiposlist;                

                view.push({
                    xtype: 'facturascontainer',
                    title: me.idCliente,
                    opcion: record.data.action
                });

                anticiposlist = view.getActiveItem().down('facturaslist');

                anticiposlist.setStore(store);
                anticiposlist.setMode('SINGLE');

                params = {
                    CardCode: me.idCliente
                };
                
                store.clearFilter();
                store.setParams(params);
                store.load();

                break;

            case 'visualizarCobranza':
                var store = Ext.getStore('Transacciones'),
                    anticiposlist;

                view.push({
                    xtype: 'visualizacioncobranzalist',
                    title: me.idCliente
                    //opcion: record.data.action
                });
        }
    },

    agregaSaldoAMostrar: function (facturas) {
        var me = this,
            moneda,
            saldoMostrado;

        facturas.each(function (item, index, length) {
            moneda = item.get('CodigoMoneda') + ' ';
            //saldoMostrado = Imobile.core.FormatCurrency.currency(item.get('Saldo'), moneda);
            saldoMostrado = Imobile.core.FormatCurrency.currency(item.get('TotalDocumento'), moneda);
            item.set('saldoAMostrar', saldoMostrado);
        });
    },

    /**
     * Muestra la lista de formas de pago.
     */
    aplicaPago: function () {
        view.push({
            xtype: 'formasdepagolist',
            title: me.idCliente
        });
    },

    /**
     * Responde al evento "tap" del botón "cancelar" de "totalapagarcontainer".
     * Establece en el menú principal el item 1 como activo.
     * @param btn Este botón.
     */

    cancelaPago: function (btn) {
        var me = this,
            view = me.getMain(),
            navigationCobranza = view.getActiveItem(),
            titulo = navigationCobranza.down('toolbar'),
            totales = Ext.getStore('Totales'),
            facturas = Ext.getStore('Facturas');

        navigationCobranza.remove(titulo, true); // Remueve el título de la vista, si no, al volver a entrar aparecerá sobre el actual.
        totales.removeAll();
        me.pagado = 0;
        facturas.clearFilter();
        view.setActiveItem(1);
    },

    /**
     * Responde al evento "tap" del botón "Agregar" de "totalapagarcontainer".
     * Muestra la lista de las formas de pago.
     * @param btn Este botón.
     */
    onAgregarPago: function (btn) {
        var me = this,
            view = me.getMain().getActiveItem();
    
        view.push({
            xtype: 'formasdepagolist',
            title: me.idCliente,
            opcion: me.getMenu().getActiveItem().opcion
        });

        view.getNavigationBar().down('#agregarPago').hide();
    },

    /**
     * Valida la vista actual y si es el caso hace visible el botón "Agregar".
     * Setea el título el toolbar.
     * @param navigationview Este navigationview.
     */
    onPopNavigationCobranza: function (navigationview) {
        var me = this,
            barra = navigationview.getNavigationBar(),
            view = navigationview.getActiveItem();

        if (view.isXType('totalapagarcontainer')) {
            barra.down('#agregarPago').show();
        }

        barra.setTitle(me.idCliente);
    },

    /**
     * Responde al evento "itemtap" de "formasdepagolist". Muestra el formulario correspondiente a la forma de pago elegida.
     * Muestra el formulario para agregar un pago a la cobranza actual.
     * @param list Esta lista "formasdepagolist"
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    agregaPago: function (list, index, target, record) {
        var me = this,
            view = list.up('navigationcobranza'); //NavigationCobranza

        view.push({
            xtype: 'montoapagarform',
            //xtype: 'montoapagarformcontainer',
            title: me.idCliente,
            datos: record.data,
            opcion: list.opcion
        });

        me.determinaVistaMontoAPagar(record.data.TipoFormaPago, view);
        view.down('fieldset').setTitle(record.data.Nombre);
    },

    determinaVistaMontoAPagar: function(opcion, view){

        switch (opcion) {
            case "0":
                view.down('fieldset').add([
                    {
                        xtype: 'numberfield',
                        name: 'NumeroCheque',
                        placeHolder: 'Ingrese el número de cheque',
                        label: 'No. Cheque'
                    },{
                        xtype: 'textfield',
                        name: 'Banco',
                        placeHolder: 'Ingrese el nombre del banco',
                        label: 'Banco'
                    }
                ]);
                break;
            case "2":
                view.down('fieldset').add([
                    {
                        xtype: 'numberfield',
                        name: 'NumeroAutorizacion',
                        placeHolder: 'Ingrese el número de autorización',
                        label: 'No. Autorización'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'NumeroTarjeta',
                        placeHolder: 'Ingrese el número de tarjeta',
                        label: 'No. Tarjeta'
                    }
                ]);
                break;
        }

    },

    /**
     * Responde al evento "tap" del botón "pagar" de "montoapagarform".
     * Valida si todos los campos del formulario vienen llenos.
     * Valida si este tipo de pago permite dar cambio para en su caso permitirlo o no.
     * @param btn Este botón.
     */
    onPagar: function (btn) {
        var me = this,
            view = btn.up('navigationcobranza'),
            form = view.down('montoapagarform'),
            moneda,
            pendiente = me.aPagar - me.pagado,
            forma = form.datos.Nombre,
            entrada = form.getValues().monto,
            codigo = form.datos.Codigo,
            tipo = form.datos.TipoFormaPago,
            esVacio = false,
            valores = form.getValues(),
            numeroCheque = valores.numeroCheque,
            //numeroCuenta = valores.numeroCuenta,
            numeroTarjeta = valores.numeroTarjeta,
            banco = valores.banco,
            numeroAutorizacion = valores.numeroAutorizacion,
            nombres = form.getInnerItems(),
            modoEdicion = form.modo === 'edicion' ? true : false,
            permiteCambio = form.datos.PermiteCambio;        

         if(form.opcion == 'cobranzaFacturas'){
            moneda = Ext.getStore('Facturas').getAt(0).data.CodigoMoneda + ' '; //Estamos asumiendo que el código de moneda de todas las facturas es la local.            
         } else {
            moneda = Ext.getStore('Anticipos').getAt(0).data.CodigoMoneda + ' '; //Estamos asumiendo que el código de moneda de todas las facturas es la local.            
         }

/*        console.log(moneda);
        console.log(nombres[0].innerItems[0]._label);
        console.log(Ext.getStore('Facturas').getAt(0));*/

        Ext.Object.each(valores, function (key, value, myself) { // Validamos que todos los campos estén llenos.            

            if (value === null) { 
                esVacio = true;
                me.mandaMensaje('Datos incompletos', 'Ingrese todos los datos.');
                return false; // stop the iteration
            }
        });

        if (esVacio) {
            //me.mandaMensaje('Sin cantidad', 'Ingrese la cantidad a pagar.');
        } else {
            if (permiteCambio === 'false') {
                if (entrada > pendiente) {
                    me.mandaMensaje('Sin cambio', 'Esta forma de pago no permite dar cambio, disminuya la cantidad.');
                } else {
                    //me.sumaCobros(forma, entrada, moneda, codigo, tipo, numeroCheque, numeroCuenta, banco, numeroAutorizacion, form);
                    me.sumaCobros(form, moneda);
                    view.pop(2);
                }
            } else {
                //me.sumaCobros(forma, entrada, moneda, codigo, tipo, numeroCheque, numeroCuenta, banco, numeroAutorizacion, form);
                me.sumaCobros(form, moneda);
                view.pop(2);
            }
        }
    },

    /**
     * Muestra la vista "totalapagarcontainer".
     */
    muestraCobranza: function () {
        var me = this,
            view = me.getMain(),
            facturaslist = view.getActiveItem().down('facturaslist'),
            navigationCobranza,
            i,
            total = 0,
            seleccion = facturaslist.getSelection(),            
            moneda,// = seleccion[0].data.CodigoMoneda,
            facturas = Ext.getStore('Facturas'),
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: me.titulo
            });        

        if(seleccion.length > 0){ // Validamos que por lo menos se haya seleccionado una factura.
            moneda = seleccion[0].data.CodigoMoneda + ' ';

            for (i = 0; i < seleccion.length; i++) {
                //total += seleccion[i].data.Saldo;
                total += seleccion[i].data.TotalDocumento;
                seleccion[i].data.aPagar = true;
            }

            facturas.clearFilter();
            facturas.filter('aPagar', true);

            me.aPagar = total;

            view.setActiveItem(3);
            navigationCobranza = view.getActiveItem();

            navigationCobranza.getNavigationBar().setTitle(me.idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
            navigationCobranza.add(barraTitulo);

            me.getTotales().down('#aCobrar').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.aPagar, moneda)});
            me.getTotales().down('#pagado').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.pagado, moneda)});
            me.getTotales().down('#pendiente').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.aPagar - me.pagado, moneda)});
        } else {
            me.mandaMensaje("Sin selección", "Seleccione al menos una factura para continuar.");
        }
    },

    /**
    * Elimina el pago de totalapagarlist. Primero valida preguntándole al usuario si realmente desea elminar el pago.
    * @param list Ésta lista totalapagarlist.
    * @param index El índice del ítem swipeado.
    * @param target El elemento swipeado.
    * @param record El record asociado al ítem.
    */
    eliminaPago: function (list, index, target, record){
        var me = this,
            totales = Ext.getStore('Totales');

        Ext.Msg.confirm("Eliminar pago", "Se va a eliminar el pago, ¿está seguro?", function (e) {

            if (e == 'yes') {
                totales.removeAt(index);
                me.pagado-= Imobile.core.FormatCurrency.formatCurrencytoNumber(record.data.monto);
                me.actualizaCobranza(record.data.moneda);
            }
        });
    },

    editaPago: function(list, index, target, record){
        var me = this
            view = list.up('navigationcobranza'), //NavigationCobranza
            valores = record.data;        

        //me.agregaPago(list, index, target, record);        

        view.push({
            xtype: 'montoapagarform',
            modo: 'edicion',
            ind: record.data.id,
            montoAnterior: record.data.monto,
            //xtype: 'montoapagarformcontainer',
            //title: me.idCliente,
            datos: record.data
        });

        me.determinaVistaMontoAPagar(record.data.tipoFormaPago, view);

        view.down('fieldset').setTitle(record.data.tipo);

        view.getActiveItem().setValues(valores);

        view.getNavigationBar().down('#agregarPago').hide();
    },

    /**
    * Actualiza los campos "pagado" y "pendiente" del totalescontainer
    * @moneda El código de moneda que se tiene que mostrar.
    */
    actualizaCobranza: function (moneda){
        var me = this;

        me.getTotales().down('#pagado').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.pagado, moneda)});
        me.getTotales().down('#pendiente').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.aPagar - me.pagado, moneda)});
    },

    /**
     * Agrega el pago ingresado al store "Totales" o lo modifica si el pago es editado.
     * Suma cada uno de los saldos del store "Totales" y los muestra en "totalescontainer".
     * @param form La forma de pago.
     * @param moneda El código de moneda del pago.
     */
//    sumaCobros: function (forma, entrada, moneda, codigo, tipoFormaPago, numeroCheque, numeroCuenta, banco, numeroAutorizacion, modoEdicion) {
    sumaCobros: function (form, moneda) {
        var me = this,
            forma = form.datos.Nombre,
            entrada = form.getValues().monto,
            codigo = form.datos.Codigo,
            tipo = form.datos.TipoFormaPago,
            esVacio = false,
            valores = form.getValues(),
            numeroCheque = valores.NumeroCheque,
            numeroTarjeta = valores.NumeroTarjeta,
            banco = valores.Banco,
            numeroAutorizacion = valores.NumeroAutorizacion,
            nombres = form.getInnerItems(),
            modoEdicion = form.modo === 'edicion' ? true : false,
            permiteCambio = form.datos.PermiteCambio,
            temp,
            entradaMostrada = Imobile.core.FormatCurrency.currency(entrada, moneda),
            ind = form.ind,
            store = Ext.getStore('Totales');
            
        if(modoEdicion){
            var ind = store.find('id', ind);
            pagoACambiar = store.getAt(ind);

            pagoACambiar.set('monto', entradaMostrada);            
            me.pagado-= Imobile.core.FormatCurrency.formatCurrencytoNumber(form.montoAnterior);
            temp = entrada;

        } else {

            store.add({
                tipo: forma,
                monto: entradaMostrada,
                codigoFormaPago: codigo,
                tipoFormaPago: tipo,
                NumeroCheque: numeroCheque,
                NumeroTarjeta: numeroTarjeta,
                Banco: banco,
                NumeroAutorizacion: numeroAutorizacion,
                moneda: moneda
            });

            temp = Imobile.core.FormatCurrency.formatCurrencytoNumber(store.getAt(store.getCount() - 1).get('monto'));
        }
        
        me.pagado += parseFloat(temp);

        // store.each(function (item) {
        //     temp = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('monto'));
        //     me.pagado += parseFloat(temp);
        // });

        me.actualizaCobranza(moneda);
    },

    /**
     * Termina la cobranza
     */
    onTerminarCobranza: function () {
        var me = this,
            total = 0,
            store = Ext.getStore('Facturas'),
            totales = Ext.getStore('Totales'),
            array = store.getData().items,
            fecha = new Date(Ext.Date.now()),
            hora = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds(),
            fecha = Ext.Date.format(fecha, "d-m-Y"),
            view = me.getMain().getActiveItem(),
            url,
            msg = 'Se realizó el cobro exitosamente con folio '
        
        if (totales.getCount() > 0) {
            //var Folio = parseInt(localStorage.getItem("FolioInterno")) + 100;


            var params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "Cobranza.Fecha": fecha,
                "Cobranza.Hora": hora,
                "Cobranza.CodigoVendedor": localStorage.getItem("CodigoUsuario"),
                "Cobranza.Tipo": 'C',
                "Cobranza.CodigoCliente": me.idCliente
            };

            if(me.getMenu().getActiveItem().opcion == 'anticipo'){
                params["Cobranza.Tipo"] = 'A';
                msg = 'Se realizó el anticipo exitosamente con folio ';
            }

            //console.log(params);
            //localStorage.setItem("FolioInterno", Folio);

            Ext.Array.forEach(array, function (item, index, allItems) {
                //console.log(item, 'terminar cobranza');
                //total += (Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad')) + item.get('totalDeImpuesto');

                params["Cobranza.CobranzaFacturas[" + index + "].NumeroFactura"] = item.data.NumeroDocumento;//get('NumeroDocumento');
                params["Cobranza.CobranzaFacturas[" + index + "].Monto"] = item.get('TotalDocumento');//item.get('Saldo');
            });

            totales.each(function (item, index) {                
                params["Cobranza.CobranzaDetalles[" + index + "].NumeroLinea"] = index;
                params["Cobranza.CobranzaDetalles[" + index + "].CodigoFormaPago"] = item.data.codigoFormaPago;
                params["Cobranza.CobranzaDetalles[" + index + "].MontoNeto"] = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.data.monto);
                //params["oCobranzaCobranzaDetalles[" + index + "].NoFacturaAplicada"] = 'Sin número'

                switch (item.data.tipoFormaPago) {
                    case "0": //Cheque
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroCheque"] = item.data.NumeroCheque;
                        //params["Cobranza.CobranzaDetalles[" + index + "].NumeroCuenta"] = item.data.NumeroCuenta;
                        params["Cobranza.CobranzaDetalles[" + index + "].Banco"] = item.data.Banco;
                        params["Cobranza.CobranzaDetalles[" + index + "].Fecha"] = fecha;
                        break;

                    case "1": //Transferencia
                        break;
                    case "2": //Tarjeta
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroAutorizacion"] = item.data.NumeroAutorizacion;
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroTarjeta"] = item.data.NumeroTarjeta; 
                        break;
                }
            });
            //params["Orden.TotalDocumento"] = parseFloat(total).toFixed(2);

            /*            if(me.actionOrden == 'crear'){
             url = "http://" + me.dirIP + "/iMobile/COK1_CL_OrdenVenta/AgregarOrdenMobile";
             msg = "Se agrego la orden correctamente con folio: ";
             } else {
             url = "http://" + me.dirIP + "iMobile/COK1_CL_OrdenVenta/ActualizarOrdenVentaiMobile";
             msg = "Se acualizo la orden correctamente con folio: ";
             } */

            url = "http://" + me.dirIP + "/iMobile/COK1_CL_Cobranza/AgregarCobranza";

            Ext.data.JsonP.request({
                url: url,
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    if (response.Procesada) {
                        me.getMain().setActiveItem(1);
                        Ext.Msg.alert("Cobro procesado", msg + response.CodigoUnicoDocumento + ".");
                        store.removeAll();
                        totales.removeAll();                        
                        view.remove(view.down('toolbar'), true);
                        me.pagado = 0;
                        me.getMain().getActiveItem().pop();
                    } else {
                        Ext.Msg.alert("Cobro no procesado", "No se proceso el cobro correctamente: " + response.Descripcion);
                    }
                }
            });

        } else {            
            Ext.Msg.alert("Sin pago", "Agrega por lo menos un pago.");
        }
    },

    ////// Termina control de cobranza /////////

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

    onFileLoadSuccess: function (dataurl, e) {

        var me = this;
        var image = me.getLoadedImage();
        localStorage.setItem('image', dataurl);
        image.setSrc(dataurl);
    },

    onFileLoadFailure: function (message) {
        Ext.device.Notification.show({
            title: 'Loading error',
            message: message,
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });
    }
});