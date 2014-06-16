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
    aPagar: 0,
    pagado: 0,
    pendiente: 0,

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
                    xtype: 'clienteslist'
                });
                me.muestraClientes();
                break;
            case 'venta':
            case 'cobranza':

                view.push({
                    xtype: 'clienteslist',
                    opcion: me.opcion
                });

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
            form = tabOpciones.down('editarpedidoform'),
            store = Ext.getStore('Monedas');

        store.each(function (item, index, length) {
            item.set('Predeterminada', false);
        });
        record.set('Predeterminada', true);
        if (me.codigoMonedaPredeterminada != moneda) {
            me.obtenerTipoCambio(moneda);
        } else {
            form.setValues({
                CodigoMoneda: me.codigoMonedaPredeterminada,
                tipoCambio: 1
            });
        }
        view.pop();
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
            clienteSeleccionado.tipoCambio = 1;
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
            importe = values.importe;

        if (Ext.isEmpty(descripcion) || Ext.isEmpty(cantidad)) {
            me.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {
            var codigo = values.CodigoArticulo,                
                indPro = productos.find('CodigoArticulo', codigo),
                productoAgregado = productos.getAt(indPro),
                cantidadActual = productoAgregado.get('cantidad');

            productoAgregado.set('cantidad', cantidadActual + cantidad);

              if (form.modo != 'edicion'){  
                values.Precio = values.Precio;
                values.descuento = values.descuento;
                values.importe = values.importe;
                values.totalDeImpuesto = Imobile.core.FormatCurrency.currency(me.totalDeImpuesto, '$');
                values.Imagen = cantidadProducto.get('Imagen');
                ordenes.add(values);
            } else {
                var ind = form.ind,
                    datosProducto = ordenes.getAt(ind);

                datosProducto.set('cantidad', cantidad);                
                datosProducto.set('importe', importe);
                datosProducto.set('totalDeImpuesto', Imobile.core.FormatCurrency.currency(me.totalDeImpuesto, '$'));
                datosProducto.set('Imagen', cantidadProducto.get('Imagen'));
            }

            menu.pop();
            me.actualizarTotales();
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
            value = t.up('toolbar').down('#buscarProductos').getValue(),

            params = {
                Criterio: value,
                CardCode: me.idCliente
            };

        store.setParams(params);
        store.load();
    },

    limpiaBusquedaProductos: function (t, e, eOpts) {
        var me = this,
            store = Ext.getStore('Productos');

        store.setParams({Criterio: '', CardCode: me.idCliente});
        store.load();
    },

    onBuscaClientes: function (t, e, eOpts) {
        var store = Ext.getStore('Clientes'),
            value = t.up('toolbar').down('#buscarClientes').getValue(),
            params = {
                Criterio: value
            };

        store.setParams(params);
        store.load();
    },

    limpiaBusquedaClientes: function (t, e, eOpts) {
        var store = Ext.getStore('Clientes');

        store.setParams({Criterio: ''});
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
                    xtype: 'cobranzalist'
                });
                view.add(barraTitulo);
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
        var me = this,
            view = me.getMain().getActiveItem(),
            valores = record.data,
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
                    me.CodigoAlmacen = item.CodigoAlmacen;
                }
            });

            var form = view.getActiveItem();

            form.setValues(valores);
            //Se establece el valor de cantidad, precio y moneda
            form.setValues({
                Precio: Imobile.core.FormatCurrency.currency(valores.ListaPrecios[0].Precio, '$'),
                moneda: valores.ListaPrecios[0].CodigoMoneda,
                cantidad: 1
            });

            valoresForm = form.getValues();
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
                    Cantidad: valoresForm.cantidad

                },
                callbackKey: 'callback',
                success: function (response) {
                    var procesada = response.Procesada,
                        precio2 = Imobile.core.FormatCurrency.formatCurrencytoNumber(valoresForm.Precio),
                        desc = precio2 - response.Data[0];
                        desc = desc * 100 / precio2;

                    if (procesada) {

                        //Se establece precio con descuento
                        preciocondescuento = response.Data[0];
                        me.sujetoImpuesto = valores.SujetoImpuesto;

                        //Se valida si el producto es sujeto de impuesto                        
                        if(me.sujetoImpuesto){
                            //Se calcula total de impuesto
                            totaldeimpuesto = preciocondescuento * me.tasaImpuesto / 100;
                            me.totalDeImpuesto = totaldeimpuesto;
                        } else {
                            me.totalDeImpuesto = 0;                            
                        }

                        //Se calcula importe
                        importe = preciocondescuento * valoresForm.cantidad;

                        // Se establecen los valores al formulario
                        form.setValues({
                            descuento: desc + '%',
                            importe: Imobile.core.FormatCurrency.currency(importe, '$'),
                            precioConDescuento: Imobile.core.FormatCurrency.currency(preciocondescuento, '$'),                            
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
            id = record.data.id,
            ordenes = Ext.getStore('Ordenes'), // Porque el evento no responde a la misma lista, pueden ser productos de la lista, del panel o de la orden
            ind = ordenes.find('id', id),
            values = ordenes.getAt(ind).data;

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
        form.setValues(values);
        //form.
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

            if(me.sujetoImpuesto){
                totaldeimpuesto = preciocondescuento * me.tasaImpuesto / 100;
                me.totalDeImpuesto = totaldeimpuesto;
            }            
        
        view.getActiveItem().setValues({
            importe: Imobile.core.FormatCurrency.currency(importe, '$')
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
                viewPrincipal.setActiveItem(2); // Activamos el item 2 del menu principal navigationorden
                me.getNavigationOrden().getNavigationBar().setTitle(me.idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
                viewPrincipal.getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.actualizarTotales();
                me.getPartidaContainer().down('list').emptyTextCmp.show();

                var storeMonedas = Ext.getStore('Monedas');

                storeMonedas.load({
                    callback: function (records, operation) {
                        Ext.Array.each(records, function (item, index, ItSelf) {
                            var predeterminada = item.get('Predeterminada');
                            if (predeterminada) {
                                me.codigoMonedaPredeterminada = item.get('CodigoMoneda');
                            }
                        });
                    }
                });
                viewPrincipal.getActiveItem().add(barraTitulo);

                break;
            case 'visualizar':
                var store = Ext.getStore('Transacciones'),
                    params = {
                        CardCode: 'C00001'//me.idCliente
                    };

                store.setParams(params);
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
            console.log(store.getCount());
        if (itemActivo.isXType('partidacontainer')) {

            var params = {
                CardCode: me.idCliente,
                page: 1
            };

            store.setParams(params);

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
                if(ind != -1){ // Validamos que el elemento de la orden esté en los elementos actuales del store.
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

/*    onAddOrden: function () {
        var me = this;

        me.getMain().setActiveItem(1);
    },*/

    /**
     * Confirma si se desea terminar la orden de venta.
     */
    confirmaTerminarOrden: function () {
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
            array = store.getData().items;


        if (array.length > 0) {
            var Folio = parseInt(localStorage.getItem("FolioInterno")) + 1;


            var params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "Orden.FolioInterno": Folio,
                "Orden.CodigoSocio": me.idCliente,
                //"Orden.NombreSocio":
                "Orden.FechaCreacion": '2014-06-04',
                "Orden.FechaEntrega": '2014-06-04',
                "Orden.CodigoMoneda": '$',
                "Orden.CodigoImpuesto": me.codigoImpuesto
            };


            localStorage.setItem("FolioInterno", Folio);
            Ext.Array.forEach(array, function (item, index, allItems) {
                total += (Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad')) + Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('totalDeImpuesto'));

                params["Orden.Partidas[" + index + "].CodigoArticulo"] = item.get('CodigoArticulo');
                params["Orden.Partidas[" + index + "].Cantidad"] = item.get('cantidad');
                params["Orden.Partidas[" + index + "].Precio"] = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio'));
                params["Orden.Partidas[" + index + "].CodigoAlmacen"] = me.CodigoAlmacen;
                params["Orden.Partidas[" + index + "].Linea"] = index;
                params["Orden.Partidas[" + index + "].Moneda"] = item.get('moneda');
                params["Orden.Partidas[" + index + "].Importe"] = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad');
            });

            params["Orden.TotalDocumento"] = parseFloat(total).toFixed(2);

            Ext.data.JsonP.request({
                url: "http://25.15.241.121:88/iMobile/COK1_CL_OrdenVenta/AgregarOrdenMobile",
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    if (response.Procesada) {
                        me.getMain().setActiveItem(1);
                        Ext.Msg.alert("Orden Procesada", "Se agrego la orden correctamente con folio: " + response.CodigoUnicoDocumento);
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
            view = me.getMenu();

        view.push({
            xtype: 'facturascontainer'
        });
    },

    aplicaPago: function () {
        var me = this,
            view = me.getMenu(),
            i,
            total = 0,
            seleccion = view.getActiveItem().down('facturaslist').getSelection();

        for (i = 0; i < seleccion.length; i++) {
            total += seleccion[i].data.saldo;
        }

        me.aPagar = total;

        view.push({
            xtype: 'formasdepagolist'
        });
    },

    muestraCobranza: function (list, index, target, record) {
        var me = this,
            view = me.getMenu(),
            forma = record.get('title');

        view.push({
            xtype: 'totalapagarcontainer'
        });

        Ext.Msg.prompt(forma, 'Ingrese el monto a pagar:', function (text, entrada) {
            if (text == 'ok') {
                var store = Ext.getStore('Totales');
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

            } else {


            }
        });
        me.getTotales().down('#aCobrar').setItems({xtype: 'container', html: me.aPagar});
        me.getTotales().down('#pagado').setItems({xtype: 'container', html: me.pagado});
        me.getTotales().down('#pendiente').setItems({xtype: 'container', html: me.aPagar - me.pagado});
    },

    onSeleccionarTransaccion: function () {
        var me = this,
            view = me.getMenu(),
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
                Criterio: 2
            },
            callbackKey: 'callback',
            success: function (response) {
                me.getMain().setActiveItem(2); // Activamos el item 2 del menu principal navigationorden
                me.getMain().getActiveItem().getNavigationBar().setTitle(me.idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
                me.getMain().getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.actualizarTotales();
                me.getPartidaContainer().down('list').emptyTextCmp.show();
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

        store.each(function(item){
            precioTotal += Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio')) * item.get('cantidad');
            descuentoTotal += Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('descuento')) * item.get('cantidad');
            tax += me.totalDeImpuesto
        });

        me.getOrdenContainer().down('#descuento').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">$0.00</div>'});
        me.getOrdenContainer().down('#subtotal').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">$' + parseFloat(precioTotal).toFixed(2) + '</div>'});
        me.getOrdenContainer().down('#tax').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">$' + parseFloat(tax).toFixed(2) + '</div>'});
        me.getOrdenContainer().down('#total').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">$' + parseFloat(precioTotal + tax).toFixed(2) + '</div>' });
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
        me.CodigoAlmacen = me.almacenes[index].CodigoAlmacen; //record.get('CodigoAlmacen');

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
                    NombreAlmacen: record.get('NombreAlmacen')
                };
                view.down('agregarproductosform').setValues(valor);

                view.pop();
            }
        });
    },

    obtenerTipoCambio: function (moneda) {
        var me = this,
            form = me.getMain().getActiveItem().down('editarpedidoform');

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
                    me.tipoCambio = response.Data[0]
                    me.codigoMonedaSeleccinada = moneda
                    form.setValues({
                        CodigoMoneda: moneda,
                        tipoCambio: response.Data[0]
                    });
                } else {
                    form.setValues({
                        CodigoMoneda: me.codigoMonedaSeleccinada,
                        tipoCambio: me.tipoCambio
                    });
                }
            }
        });
    }
});