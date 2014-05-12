Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    esFavorito: undefined,
    idCliente: undefined,
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
            'productoslist #agregar': {
                tap: 'onAgregar'
            },
            'clienteslist #busca': {
                keyup: 'buscaCliente'
            },
            'menu clienteslist': {
                itemtap: 'alSelecionarCliente'
            },
            'opcionclientelist': {
                itemtap: 'onOpcionesOrden'
            },
            'productosview': {
                itemtap: 'onTapFavorito'
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
            'partidacontainer #agregarOrden': {
                tap: 'agregaOrden'
            },
            'clienteForm #agregar': {
                tap: 'agregaDireccion'
            },
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
                itemswipe: 'eliminaPartida'
            },
            'opcionesorden #terminar': {

            }
        }
    },

    onSelectMenu: function (view, index, target, record, eOpts) {
        //console.log(record);
        var me = this,
            view = me.getMenu(),
            option = record.get('action');
        switch (option) {
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
//                    html: 'Configuremos la aplicacion'
                });
                break;

            case 'prospectos':
                view.push({
                    xtype: 'clienteslist'
                });
                me.muestraClientes();
                break;
            case 'venta':
                var clientes = Ext.getStore('Clientes');

                view.push({
                    xtype: 'clienteslist'
                });

                var params = {
                    CodigoUsuario: '1',
                    CodigoSociedad: '001',
                    CodigoDispositivo: '004',
                    Contrasenia: '12345',
                    Token: "6VVcR7brnB4="
                };
                clientes.setParams(params);

                clientes.load();

                this.esFavorito = false;
                //me.muestraClientes();
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
            // default:
            //     view.push({
            //         xtype: 'container',
            //         html: 'Voy a modificar esta linea'
            //     });
            //     break;
            // default:
            //     view.push({
            //         xtype: 'container',
            //         html: 'Voy a modificar esta linea'
            //     });
            //     break;
        }
    },

    eliminaPartida: function (list, index, target, record) {
        var me = this;
        Ext.Msg.confirm("Eliminar producto de la orden", "Se va a eliminar el producto de la orden, ¿está seguro?", function (e) {

            if (e == 'yes') {
                /*var query = "DELETE FROM ORDEN WHERE id = " + record.get('id') + "";
                me.hazTransaccion(query, 'Ordenes', false);
                me.muestralistaOrden();*/
            }
        });
    },

    cambiaItem: function (tabPanel, value, oldValue) {
        var me=this,
            view = me.getMain().getActiveItem();

        console.log(view);
        view.getNavigationBar().down('#agregarProductos').show();


        if (value.title == 'Cliente') {
            var query = "SELECT * FROM CLIENTE WHERE id = " + this.idCliente + "";
            form = value.down('clienteform');
            /*this.hazTransaccion(query, 'Clientes', true, form);*/
            setTimeout(function () {
                datos = Ext.getStore('Clientes').getAt(0).data;
                form.setValues(datos);
            }, 500)
        }

        /*if(value.title == 'Eliminar Orden'){
         tabPanel.setActiveItem(0);
         }*/
    },

    agregaDireccion: function (btn) {
        var query, me, form, fiscal, calle, colonia, municipio, cp, ciudad, estado, pais, view, direcciones, entrega;
        me = this;
        form = btn.up('clienteForm');
        values = form.getValues();
        direcciones = me.getDirecciones();
        fiscal = direcciones.down('#fiscal').getChecked();
        entrega = direcciones.down('#entrega').getChecked();
        calle = values.calle;
        colonia = values.colonia;
        municipio = values.municipio;
        cp = values.cp;
        ciudad = values.ciudad;
        estado = values.estado;
        pais = values.pais;

        if (fiscal) {
            query = "INSERT INTO DIRECCIONFISCAL (idCliente, calle, colonia, municipio, cp, ciudad, estado, pais) VALUES (" +
                this.idCliente + ", '" + calle + "', '" +
                colonia + "', '" + municipio + "', " + cp + ", '" + ciudad + "', '" + estado + "', '" +
                pais + "')";

            //this.hazTransaccion(query, 'DireccionesFiscales', false);
        }

        if (entrega) {
            query = "INSERT INTO DIRECCION (idCliente, calle, colonia, municipio, cp, ciudad, estado, pais) VALUES (" +
                this.idCliente + ", '" + calle + "', '" +
                colonia + "', '" + municipio + "', " + cp + ", '" + ciudad + "', '" + estado + "', '" +
                pais + "')";

            //this.hazTransaccion(query, 'Direcciones', false);
        }


        view = me.getMenu();

        view.pop();

        me.muestraDirecciones();
    },

    muestraDirecciones: function () {
        //alert("Entre a direcciones");
        var me = this;
            //query = "SELECT * FROM DIRECCION WHERE idCliente = " + me.idCliente;

        var view = me.getMain().getActiveItem();
        //me.hazTransaccion(query, 'Direcciones', true);

        view.push({
            xtype: 'tpldirecciones'
        });

        //Ext.getStore('Direccion').load();

        view.getNavigationBar().down('#agregarProductos').hide()

        /*        var query = "SELECT * FROM DIRECCIONFISCAL";
         this.hazTransaccion(query, 'DireccionesFiscales', true);*/

    },

    agregaOrden: function (button) {
        /*var me = this,
         view = me.getMenu();

         view.push({
         xtype: 'direccionescontainer'
         });
         me.muestraDirecciones();*/
    },

    mostrarListaProductos: function (container, button, pressed) {
        var me = this;
        query = "SELECT * FROM PRODUCTO";
        //me.hazTransaccion(query, 'Productos', true);
        me.getProductosOrden().setItems({xtype: 'productoslist'});
    },

    mostrarPanelProductos: function (container, button, pressed) {
        var me = this;
        me.listarFavoritos();
        me.getProductosOrden().setItems({xtype: 'productosview'});
    },

    onCancelar: function () {
        var me = this,
            view = me.getOpcionesOrden();
        view.setActiveItem(0);
    },

    onAgregar: function (btn) {
        var me = this,
            view = me.getMenu();
        view.push({
            xtype: 'agregarproductosform'
        });
    },

    agregaProductos: function (btn) {
        var form, values, codigo, descripcion, cantidad, precio, moneda, descuento, precioConDescuento, totalDeImpuesto, query,
            importe, almacen, existencia,
            me = this,
            menu = me.getMain().getActiveItem();

        form = btn.up('agregarproductosform');
        values = form.getValues();
        codigo = values.code;
        descripcion = values.description;
        cantidad = values.cantidad;
        precio = values.precio;
        moneda = values.moneda;
        descuento = values.descuento;
        precioConDescuento = values.precioConDescuento;
        totalDeImpuesto = values.totalDeImpuesto;
        importe = values.importe;
        almacen = values.almacen;
        existencia = values.existencia;


        if (descripcion == "" || codigo == null) {
            me.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {

            query = "INSERT INTO ORDEN (clienteId, code, description, cantidad, precio, moneda, descuento, precioConDescuento, " +
                "totalDeImpuesto, importe, almacen, existencia) VALUES (" + this.idCliente + "," + codigo + ", '" + descripcion + "'," +
                cantidad + "," + precio + ", '" + moneda + "', " + descuento + "," + precioConDescuento + "," +
                totalDeImpuesto + "," + importe + ",'" + almacen + "', " + existencia + ")";
            //alert(query);
            //this.hazTransaccion(query, 'Ordenes', false);
            //this.mandaMensaje('Producto agregado', 'El producto fue agregado exitosamente');
            menu.pop();

            menu.getNavigationBar().down('#agregarProductos').hide();
            //menu.getNavigationBar().getBackButton().hide();
            //me.getMain().setActiveItem(0);
            //view.setActiveItem(1);
            Ext.getStore('Ordenes').load();
        }
    },

    eliminaProducto: function (list, index, target, record) {
        var me = this;
        Ext.Msg.confirm("Eliminar producto", "Se va a eliminar el producto, ¿está seguro?", function (e) {

            if (e == 'yes') {
                var ind = record.get('id');
                var query = "DELETE FROM PRODUCTO WHERE id = " + ind + "";
                //me.hazTransaccion(query, 'Productos', false);

                me.muestraProductos();
            }
        });
    },

    muestraProductos: function () {
        var query = "SELECT * FROM PRODUCTO";
        //this.hazTransaccion(query, 'Productos', true);
    },

    muestraClientes: function () {
        var query = "SELECT * FROM CLIENTE";
        //this.hazTransaccion(query, 'Clientes', true);
        Ext.getStore('Clientes').load();
    },

    muestralistaOrden: function () {
        var query = "SELECT * FROM ORDEN WHERE clienteId = " + this.idCliente + "";
        //alert(query);
        //this.hazTransaccion(query, 'Ordenes', true);
    },

    busca: function (searchField) {
        var campo = searchField.getValue();
        if (this.esFavorito) {
            var query = "SELECT * FROM PRODUCTO WHERE favorite = 'true' AND (code like '%" + campo + "%' OR description like '%" + campo + "%')";
        } else {
            var query = "SELECT * FROM PRODUCTO WHERE code like '%" + campo + "%' OR description like '%" + campo + "%'";
        }
        //alert(query);
        //this.hazTransaccion(query, 'Productos', true);
    },

    buscaCliente: function (searchField) {
        var campo = searchField.getValue();
        var query = "SELECT * FROM CLIENTE WHERE code like '%" + campo + "%' OR name like '%" + campo + "%'";
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
        var ind = record.get('id');

        if (record.get('favorite') === false) {
            this.actualiza(true, ind);  // Si favorite es false, lo hacemos true
            this.lista(false);

        } else {
            this.actualiza(false, ind); // Si favorite es true, lo hacemos false
            this.lista(true);
        }
    },

    lista: function (esFavorito) {
        //this.hazTransaccion("SELECT * FROM PRODUCTO WHERE favorite = '" + esFavorito + "'", 'Productos', true);
    },

    actualiza: function (esFavorito, ind) {
        //this.hazTransaccion("UPDATE PRODUCTO SET favorite = '" + esFavorito + "' WHERE id = " + ind + "",
            //'Productos', false);
    },

    mandaMensaje: function (titulo, mensaje) {
        Ext.Msg.alert(titulo, mensaje);
    },

    alSelecionarCliente: function (view, index, target, record, eOpts) {
        var me = this,
            view = me.getMenu(),
            code = record.get('code'),
            name = record.get('name');

        view.push({
            xtype: 'opcionclientelist',
            title: code + ' ' + name
        });

        this.idCliente = record.get('id');
        this.muestralistaOrden();
    },

    onAgregarProducto: function (list, index, target, record) {
        var me = this,
            view = me.getMain().getActiveItem(),
            viewOrden = me.getOpcionesOrden();

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
        });
    },

    onOpcionesOrden: function (t, index, target, record, e) {
        var me = this,
            view = me.getMenu(),
            opcion = record.get('action');

        switch (opcion) {
            case 'orden':

                me.getMain().setActiveItem(2);

                me.getMain().getActiveItem().getNavigationBar().setTitle(view.getActiveItem().title);
                me.getMain().getActiveItem().down('opcionesorden').setActiveItem(0);
                break;
        }
    },

    onTapFavorito: function (t, index, target, record, e, es) {
        var me = this,
            view = me.getMenu(),
            viewOrden = me.getOpcionesOrden();

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
        });
    },

    onEliminarOrden: function (newActiveItem, tabPanel) {
        var me = this;

        Ext.Msg.confirm("Eliminar orden", "Se va a eliminar la orden, todos los productos agregados se perderán ¿está seguro?", function (e) {

            if (e == 'yes') {
                var query = "DELETE FROM ORDEN WHERE clienteId = " + me.idCliente + "";
                //me.hazTransaccion(query, 'Ordenes', false);
                me.muestralistaOrden();
                me.getMain().setActiveItem(1);
            } else {
                tabPanel.setActiveItem(0);
            }
        });
    },

    onAgregarPartida: function () {
        var me = this,
            view = me.getMain().getActiveItem();

        me.muestraProductos();

        view.push({
            xtype: 'productosorden'
        });

        view.getNavigationBar().down('#agregarProductos').hide()
    },

    onPopNavigationOrden: function (t, v, e) {
        var me = this,
            view = me.getMain().getActiveItem();

        if (v.getItemId() != 'principal') {
            view.getNavigationBar().down('#agregarProductos').hide()
        } else {
            view.getNavigationBar().down('#agregarProductos').show()
        }
    },

    onAddOrden: function () {
        var me = this;

        me.getMain().setActiveItem(1);
    }

});