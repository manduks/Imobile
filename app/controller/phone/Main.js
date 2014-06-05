Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    esFavorito: undefined,
    idCliente: undefined,
    entrega: undefined,
    titulo: undefined,
    opcion: undefined,
    aPagar: 0,
    pagado: 0,
    pendiente: 0,
    clienteSeleccionado: undefined,
    CodigoAlmacen: undefined,
    codigoImpuesto: undefined,
    tasaImpuesto: 0,

    config: {
        control: {
            'seleccionadorprofav #listarProductos': {
                tap: 'listarProductos'
            },
            'seleccionadorprofav #listarFavoritos': {
                tap: 'listarFavoritos'
            },
            'seleccionadorprofav productoslist': {
                itemtap: 'cambiaStatusFavoritos'
            },
            'productoslist #busca': {
                keyup: 'busca'
            },
            'agregarproductosform #agregar': {
                tap: 'agregaProductos'
            },
            'agregarproductosform #cancelar': {
                tap: 'onCancelar'
            },
            'agregarproductosform #cantidad': {
                change: 'actualizaCantidad'
            },
            'agregarproductosform #almacenProducto': {
                focus: 'onListAlmacen'
            },
            'clienteslist #busca': {
                keyup: 'buscaCliente'
            },
            'menu clienteslist': {
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
            /*'clienteForm #agregar': {
             tap: 'agregaDireccion'
             },*/
            'opcionesorden #addOrden': {
                activate: 'onAddOrden'
            },
            'opcionesorden': {
                activeitemchange: 'cambiaItem'
            },
            'direccioneslist': {
                itemtap: 'muestraDirecciones'
            },
            'ordenlist': {
                itemswipe: 'eliminaPartida',
                itemtap: 'onAgregarProducto'
            },
            'opcionesorden #terminar': {
                activate: 'onTerminarOrden'
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

    onSelectMenu: function (view, index, target, record, eOpts) {
        var me = this,
            view = me.getMenu();

        me.opcion = record.get('action');

        switch (me.opcion) {
            case 'favoritos':
                view.push({
                    xtype: 'seleccionadorprofav'
                    //html:'Favoritos'
                });
                this.esFavorito = true;
                me.lista(true);
                break;
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
                this.esFavorito = false;
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
            view = me.getMain().getActiveItem();            

        if (me.entrega) {
            me.direccionEntrega = record.data.CodigoDireccion;
            me.mandaMensaje('Dirección de entrega', 'Dirección de entrega seleccionada'); // mensajes temporales
        } else {
            me.direccionFiscal = record.data.CodigoDireccion;
            me.mandaMensaje('Dirección fiscal', 'Dirección fiscal seleccionada');
            me.codigoImpuesto = record.data.CodigoImpuesto;
            me.tasaImpuesto = record.data.Tasa;
        }
        view.pop();
    },

    seleccionaMoneda: function (list, index, target, record) {
        var me = this,
            view = me.getMain().getActiveItem();
        moneda = record.data.CodigoMoneda,
            tabOpciones = me.getOpcionesOrden(),
            form = tabOpciones.down('editarpedidoform');
        form.setValues({CodigoMoneda: moneda});

        view.pop();
    },

    muestraMonedas: function () {
        var me = this,
            view = me.getMain().getActiveItem();

        me.ponParametros('Monedas', me.CodigoUsuario, me.CodigoSociedad, me.CodigoDispositivo, "", me.Token);

        view.push({
            xtype: 'monedaslist'
        })

        view.getNavigationBar().down('#agregarProductos').hide()
    },

    eliminaPartida: function (list, index, target, record) {
        var me = this,
            ordenes = Ext.getStore('Ordenes');
        Ext.Msg.confirm("Eliminar producto de la orden", "Se va a eliminar el producto de la orden, ¿está seguro?", function (e) {

            if (e == 'yes') {
                var ind = ordenes.find('CodigoArticulo', record.data.CodigoArticulo);
                ordenes.removeAt(ind);
                me.actualizarTotales();
                var store = Ext.getStore('Ordenes');
                if (store.getData().items.length <= 2) {
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
     Aparece el botón Back y desaparece Agregar.
     *   - Editar: Establece valores para el formulario de editar pedido aparece el botón Back y desaparece Agregar.
     * @param tabPanel Este TabPanel
     * @param value El nuevo ítem
     * @param oldValue El ítem anterior
     */
    cambiaItem: function (tabPanel, value, oldValue) {
        var me = this,
            view = me.getMain().getActiveItem(),
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
            value.setValues(clienteSeleccionado);
            boton.setText('Back').show();
            boton.setUi('back');
        }

        if (value.xtype == 'partidacontainer') {
            boton.setText('Agregar').show();
            boton.setUi('normal');
        }
    },

    traeCliente: function () {
        var me = this,
            clientes = Ext.getStore('Clientes'),
            ind = clientes.find('CodigoSocio', me.idCliente),
            datos = clientes.getAt(ind).data;

        return datos;
    },

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

        //Ext.getStore('Direccion').load();

        view.getNavigationBar().down('#agregarProductos').hide()

        /*        var query = "SELECT * FROM DIRECCIONFISCAL";
         this.hazTransaccion(query, 'DireccionesFiscales', true);*/

    },


    mostrarListaProductos: function (container, button, pressed) {
        var me = this;
        Ext.getStore('Productos').clearFilter();
        //Ext.getStore('Productos').load();
        me.getProductosOrden().setItems({xtype: 'productoslist'});
    },


    /**
     * Muestra el panel de productos
     */
    mostrarPanelProductos: function () {
        var me = this,
            productos = Ext.getStore('Productos');

        //me.listarFavoritos();
        me.getProductosOrden().setItems({xtype: 'productosview'});

        setTimeout(function () { //Función para esperar algunos milisegundos
            productos.each(function (item, index, length) {
                item.set('color', me.dameColorAleatorio());
            })
        }, 100)
    },

    onCancelar: function () {
        var me = this,
            view = me.getOpcionesOrden();
        view.setActiveItem(0);
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
            menu = me.getMain().getActiveItem(), //NavigationOrden

            form = btn.up('agregarproductosform'),
            values = form.getValues(),
            descripcion = values.NombreArticulo,
            cantidad = values.cantidad,
            importe = values.importe;

        if (Ext.isEmpty(descripcion) || Ext.isEmpty(cantidad)) {
            me.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {
            var codigo = values.CodigoArticulo,
                ind = ordenes.find('CodigoArticulo', codigo),
                indPro = productos.find('CodigoArticulo', codigo),
                cantidadProducto = productos.getAt(indPro);

            cantidadProducto.set('cantidad', cantidad);

            if (ind == -1) {
                ordenes.add(values);
            } else {
                var datosProducto = ordenes.getAt(ind);
                datosProducto.set('cantidad', cantidad);
                datosProducto.set('NombreArticulo', descripcion);
                datosProducto.set('importe', importe);
            }
            menu.pop();

            //if()
            //menu.getNavigationBar().down('#agregarProductos').hide();
        }

        me.actualizarTotales();
    },

    muestraProductos: function () {
        //var query = "SELECT * FROM PRODUCTO";
        //this.hazTransaccion(query, 'Productos', true);
        Ext.getStore('Productos').load();
    },

    muestraClientes: function () {
        //var query = "SELECT * FROM CLIENTE";
        //this.hazTransaccion(query, 'Clientes', true);
        Ext.getStore('Clientes').load();
    },

    muestralistaOrden: function () {
        //var query = "SELECT * FROM ORDEN WHERE clienteId = " + this.idCliente + "";
        //alert(query);
        //this.hazTransaccion(query, 'Ordenes', true);
        Ext.getStore('Ordenes').load();
    },

    busca: function (searchField) {
        /*var campo = searchField.getValue();
         if (this.esFavorito) {
         var query = "SELECT * FROM PRODUCTO WHERE favorite = 'true' AND (code like '%" + campo + "%' OR description like '%" + campo + "%')";
         } else {
         var query = "SELECT * FROM PRODUCTO WHERE code like '%" + campo + "%' OR description like '%" + campo + "%'";
         }*/
        //alert(query);
        //this.hazTransaccion(query, 'Productos', true);
    },

    buscaCliente: function (searchField) {
        /*var campo = searchField.getValue();
         var query = "SELECT * FROM CLIENTE WHERE code like '%" + campo + "%' OR name like '%" + campo + "%'";*/
        //alert(query);
        //this.hazTransaccion(query, 'Clientes', true);
    },

//// Controlador de Favoritos ////
    listarFavoritos: function (segmentedButton) {
        this.lista(true); // Me lista aquellos cuyo valor favorite es true
        this.esFavorito = true;
    },

    listarProductos: function (segmentedButton) {
        this.lista(false); // Me lista aquellos cuyo valor favorite es false
        this.esFavorito = false;
    },

    cambiaStatusFavoritos: function (list, index, target, record, e, eOpts) {
        var me = this;
        record.set('favorite', !record.get('favorite'));     //Invertimos el estatus

        //Por aqui establecemos el color
        if (record.get('favorite')) {
            var color = me.dameColorAleatorio();
            record.set('color', color);
        }

        //this.lista(record.get('favorite')); // Listamos 


        /*if (record.get('favorite') === false) {
         //this.actualiza(true, ind);  // Si favorite es false, lo hacemos true
         this.lista(false);

         } else {
         //this.actualiza(false, ind); // Si favorite es true, lo hacemos false
         this.lista(true);
         }*/
    },


    /**
     * Filtra el store de productos por la variable esFavorito.
     * @param esFavorito Variable booleana para indicar si es favorito (true) o no (false).
     */
    lista: function (esFavorito) {
        //this.hazTransaccion("SELECT * FROM PRODUCTO WHERE favorite = '" + esFavorito + "'", 'Productos', true);
        var productos = Ext.getStore('Productos'),
            me = this;

        productos.clearFilter(); //Para limpiar todos los filtros por si tiene alguno el store
        productos.filter('DesplegarEnPanel', esFavorito);
        //me.ponParametros('Productos', '1', '001', '004', '12345', "6VVcR7brnB4=");
    },

    mandaMensaje: function (titulo, mensaje) {
        Ext.Msg.alert(titulo, mensaje);
    },

    alSelecionarCliente: function (list, index, target, record, eOpts) {
        var me = this,
            view = me.getMenu(),
            name = record.get('NombreSocio');

        me.idCliente = record.get('CodigoSocio');
        me.titulo = me.idCliente + ' ' + name;

        switch (list.opcion) {
            case 'venta':
                view.push({
                    xtype: 'opcionclientelist',
                    title: me.titulo,
                    clienteSeleccionado: record.data
                });                

                var clienteSeleccionado = me.getOpcionCliente().clienteSeleccionado,
                    direcciones = Ext.getStore('Direcciones');

                direcciones.setData(clienteSeleccionado.Direcciones);
                direcciones.filter('TipoDireccion', 'S');

                if(direcciones.getCount() > 0){
                    me.direccionFiscal = direcciones.getAt(0).data.CodigoDireccion; // Se obtiene el codigo de la direccion fiscal y se lo asignamos a una variable global.
                    me.codigoImpuesto = direcciones.getAt(0).data.CodigoImpuesto;
                    me.tasaImpuesto = direcciones.getAt(0).data.Tasa;
                    direcciones.clearFilter();
                    direcciones.filter('TipoDireccion', 'B');
                    me.direccionEntrega = direcciones.getAt(0).data.CodigoDireccion; // Se obtiene el codigo de la direccion de entrega y se lo asignamos a una variable global.                                        
                } else {
                    me.mandaMensaje('Sin dirección fiscal','Este cliente no cuenta con dirección fiscal, solicite una al SAP.');
                    view.pop();
                }

                break;
            case 'cobranza':
                view.push({
                    xtype: 'cobranzalist',
                    title: me.titulo
                });
                break;
        }

        //this.idCliente = record.get('id');
        this.muestralistaOrden();
    },


    /**
     * Muestra el formulario para agregar un producto a la orden.
     * @param list Esta lista.
     * @param index El índice del item tapeado.
     * @param target El elemento o DataItem tapeado.
     * @param record El record asociado al ítem.
     */
    onAgregarProducto: function (list, index, target, record) {
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


        Ext.Array.forEach(almacenes,function(item, index){
            var predeterminado = item.Predeterminado;

            me.CodigoAlmacen = item.CodigoAlmacen;

            if (predeterminado){
               valores.NombreAlmacen = item.NombreAlmacen;
            }
        });

        view.push({
            xtype: 'agregarproductosform'
        });

        var form = view.getActiveItem();
        form.setValues(valores);

        //Se establece el valor de cantidad, precio y moneda
        form.setValues({
            Precio: valores.ListaPrecios[0].Precio,
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
                    desc = response.Data[0] * 100 / valoresForm.Precio;

                if (procesada) {
                    form.setValues({
                        descuento: desc
                    });


                //Se calcula precio con descuento

                preciocondescuento = valoresForm.Precio - desc,


                //Se calcula total de impuesto                        
                totaldeimpuesto = preciocondescuento * me.tasaImpuesto/100,

                //Se calcula importe
                
                
                importe = preciocondescuento * valoresForm.cantidad + totaldeimpuesto,

                form.setValues({
                    descuento: desc,
                    totalDeImpuesto: totaldeimpuesto,
                    importe: importe,
                    precioConDescuento: preciocondescuento
                });

                    //if (list.isXType('ordenlist')) { // Para editar pedido
                    if (valores.cantidad > 0) {
                        form.down('fieldset').setTitle('Editar producto');
                        view.getNavigationBar().down('#agregarProductos').hide();
                    }

                } else {
                            Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                       }
                    }
                }); 

    },

    /**
     * Actualiza la el valor del importe al modificarse la cantidad
     * @param numberField Éste NumberField
     * @param newValue El nuevo valor
     * @param oldValue El valor original
     */
    actualizaCantidad: function (numberField, newValue, oldValue) {
        var me = this,
            view = me.getMain().getActiveItem(),
            valoresForm = view.getActiveItem().getValues(),
            preciocondescuento = valoresForm.precioConDescuento * newValue,
            impuesto = newValue * valoresForm.totalDeImpuesto;


        view.getActiveItem().setValues({
            importe: preciocondescuento + impuesto,
            totalDeImpuesto: impuesto
        });
    },

    /**
     * Manda un mensaje con el codigo de las direcciones tanto de entrega como fiscal.
     */
    guardaDatosDeCliente: function (button) {
        var me = this;

        me.mandaMensaje('Códigos de dirección', 'Entrega: ' + me.direccionEntrega + '\nFiscal: ' + me.direccionFiscal);
    },

    onOpcionesCliente: function (t, index, target, record, e) {
        var me = this,
            view = me.getMenu(),
            opcion = record.get('action');

        switch (opcion) {
            case 'orden':
                me.getMain().setActiveItem(2); // Activamos el item 2 del menu principal navigationorden
                me.getMain().getActiveItem().getNavigationBar().setTitle(me.titulo); //Establecemos el title del menu principal como el mismo del menu de opciones
                me.getMain().getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.actualizarTotales();
                me.getPartidaContainer().down('list').emptyTextCmp.show();
                break;
            case 'visualizar':
                var store = Ext.getStore('Transacciones'),

                    params = {
                        CardCode: 'C00001'//me.idCliente
                    };

                store.setParams(params);
                store.load();

                view.push({
                    xtype: 'transaccionlist'
                });
                break;
        }
    },

    onTapFavorito: function (t, index, target, record, e, es) {
        /*var me = this,
         view = me.getMenu(),
         viewOrden = me.getOpcionesOrden();

         alert('onTapFavorito');

         view.push({
         xtype: 'agregarproductosform'
         });

         view.getActiveItem().setValues({
         code: record.get('code'),
         description: record.get('description'),
         cantidad: record.get('cantidad'),
         precio: record.get('precio'),
         moneda: record.get('moneda'),
         descuento: record.get('descuento'),
         precioConDescuento: record.get('precioConDescuento'),
         totalDeImpuesto: record.get('totalDeImpuesto'),
         importe: record.get('importe'),
         almacen: record.get('almacen'),
         existencia: record.get('existencia')
         });*/
    },

    onEliminarOrden: function (newActiveItem, tabPanel) {
        var me = this,
            ordenes = Ext.getStore('Ordenes');

        Ext.Msg.confirm("Eliminar orden", "Se va a eliminar la orden, todos los productos agregados se perderán ¿está seguro?", function (e) {

            if (e == 'yes') {
                //var query = "DELETE FROM ORDEN WHERE clienteId = " + me.idCliente + "";
                //me.hazTransaccion(query, 'Ordenes', false);
                ordenes.removeAll();
                //me.muestralistaOrden();
                me.getMain().setActiveItem(1);
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
            navigationview = button.up('navigationorden'),
            itemActivo = navigationview.getActiveItem().getActiveItem(),
            store = Ext.getStore('Productos');

        if (itemActivo.isXType('partidacontainer')) {
            //navigationview.getActiveItem().setActiveItem(0);
            //view.getNavigationBar().down('#agregarProductos').show();

            var params = {
                CardCode: me.idCliente
            };

            store.setParams(params);

            view.push({
                xtype: 'productosorden'
            })  

            store.load();          

            view.getNavigationBar().down('#agregarProductos').hide()
        } else {
            navigationview.getActiveItem().setActiveItem(0);
        }
    },

    /**
     * Al dispararse el evento pop de navigationorden muestra el botón agregarProductos si el ítem activo es
     * clientecontainer o editarpedidoform, esto sucede cuando se selecciona la moneda o la dirección.
     * @param t This navigationview
     * @param v La vista que ha sido popeada
     */
    onPopNavigationOrden: function (t, v) {
        var me = this,
            view = me.getMain().getActiveItem(),
            itemActivo = t.getActiveItem().getActiveItem();

        /*            if(v.getItemId().substring(4, 24) == 'agregarproductosform'){
         view.getNavigationBar().down('#agregarProductos').hide()
         } else {
         view.getNavigationBar().down('#agregarProductos').show()
         }*/

        if (itemActivo.isXType('clientecontainer') || itemActivo.isXType('editarpedidoform')) {
            view.getNavigationBar().down('#agregarProductos').show();
        }

        if (itemActivo.isXType('partidacontainer') && v.isXType('agregarproductosform')) {
            view.getNavigationBar().down('#agregarProductos').show();
        }

        /*        if (v.getItemId() != 'principal') {
         view.getNavigationBar().down('#agregarProductos').hide()
         } else {
         view.getNavigationBar().down('#agregarProductos').show()
         }*/
    },

    onAddOrden: function () {
        var me = this;

        me.getMain().setActiveItem(1);
    },

    ponParametros: function (storeName, cUsuario, cSociedad, cDispositivo, passw, tok) {
        var store = Ext.getStore(storeName);

        params = {
            CodigoUsuario: cUsuario,
            CodigoSociedad: cSociedad,
            CodigoDispositivo: cDispositivo,
            Contrasenia: passw,
            Token: tok,
            Elementos: 10
        };

        store.setParams(params);
        store.load();
    },

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
                "Orden.CodigoCliente": me.idCliente,
                "Orden.FechaCreacion": '2014-06-04',
                "Orden.FechaEntrega": '2014-06-04',
                "Orden.CodigoMoneda": '$'
            };

            localStorage.setItem("FolioInterno", Folio);
            Ext.Array.forEach(array, function (item, index, allItems) {
                total += item.get('precioConDescuento')

                params["Orden.Partidas[" + index + "].CodigoArticulo"] = item.get('CodigoArticulo');
                params["Orden.Partidas[" + index + "].Cantidad"] = item.get('cantidad');
                params["Orden.Partidas[" + index + "].Precio"] = item.get('Precio');
                params["Orden.Partidas[" + index + "].CodigoAlmacen"] = me.CodigoAlmacen;
                params["Orden.Partidas[" + index + "].Linea"] = index;
                params["Orden.Partidas[" + index + "].Moneda"] = item.get('moneda');
                params["Orden.Partidas[" + index + "].Importe"] = item.get('importe');
            });

            params["Orden.TotalDocumento"] = parseFloat(total).toFixed(2);

            //console.log(params);
            Ext.data.JsonP.request({
                url: "http://25.15.241.121:88/iMobile/COK1_CL_OrdenVenta/AgregarOrdenMobile",
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    //console.log(response);
                    me.getMain().setActiveItem(1);
                    store.clearData();
                    if (response.Procesada) {
                        Ext.Msg.alert("Orden Procesada", "Se proceso la orden correctamente");
                    } else {
                        Ext.Msg.alert("Orden No Procesada", "No se proceso la orden correctamente");
                    }
                }
            });
        } else {
            me.getMain().setActiveItem(1);
            Ext.Msg.alert("Productos", "Selecciona al menos un Producto");
        }
    },

    //// Control de cobranza

    muestraFacturasPendientes: function () {
        var me = this,
            view = me.getMenu();

        view.push({
            xtype: 'facturascontainer',
            title: me.titulo
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
            xtype: 'formasdepagolist',
            title: me.titulo
        });
    },

    muestraCobranza: function (list, index, target, record) {
        var me = this,
            view = me.getMenu(),
            forma = record.get('title');

        view.push({
            xtype: 'totalapagarcontainer',
            title: me.titulo
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
            view = me.getMenu();

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
                me.getMain().getActiveItem().getNavigationBar().setTitle(me.titulo); //Establecemos el title del menu principal como el mismo del menu de opciones
                me.getMain().getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.actualizarTotales();
                me.getPartidaContainer().down('list').emptyTextCmp.show();
            }
        });

    },

    actualizarTotales: function () {
        var me = this,
            items = Ext.getStore('Ordenes').getData().items,
            precioTotal = 0,
            descuentoTotal = 0,
            total = 0,
            tax = 0;

        Ext.Array.forEach(items, function (item, index) {
            precioTotal += item.get('Precio') * item.get('cantidad');
            descuentoTotal += item.get('descuento') * item.get('cantidad');
            tax += item.get('totalDeImpuesto');
            total += item.get('importe')
        });

        me.getOrdenContainer().down('#descuento').setItems({xtype: 'container', html: descuentoTotal});
        me.getOrdenContainer().down('#subtotal').setItems({xtype: 'container', html: parseFloat(precioTotal).toFixed(2)});
        me.getOrdenContainer().down('#tax').setItems({xtype: 'container', html: parseFloat(tax).toFixed(2)});
        me.getOrdenContainer().down('#total').setItems({xtype: 'container', html: parseFloat(total).toFixed(2)});
    },

    onListAlmacen: function(t, e, eOpts ){
        var me = this,
            view = me.getMain().getActiveItem(),
            value = view.down('agregarproductosform').getValues();

        view.push({
            xtype: 'almacenlist',
            codigoArticulo: value.CodigoArticulo
        });
        view.down('almacenlist').setData(me.almacenes);

    },

    onSeleccionarAlmacen: function (t, index, target, record, e, eOpts){
        var me = this,
            view = me.getMain().getActiveItem();

        me.CodigoAlmacen = record.get('CodigoAlmacen');

        Ext.data.JsonP.request({
            url: "http://192.168.15.9:88/iMobile/COK1_CL_Consultas/ObtenerDisponibleiMobile",
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
                var valor =  {
                    Disponible: response.Data[0],
                    NombreAlmacen: record.get('NombreAlmacen')
                };
                view.down('agregarproductosform').setValues(valor);

                view.pop();
            }
        });
    }
});