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
            /*'productoslist': {
                //itemswipe: 'eliminaProducto',
                itemtap: 'onAgregarProducto'
            },*/
            'clienteslist #busca': {
                keyup: 'buscaCliente'
            },
            'menu clienteslist': {
                itemtap: 'alSelecionarCliente'
            },
            'opcionclientelist': {
                itemtap: 'onOpcionesOrden'
            },
            'seleccionadorprofav toolbar segmentedbutton': {
                //toggle: 'mostrarActivo'
            },
            'productosview': {
                itemtap: 'onTapFavorito'
            },
            'opcionesorden #eliminar': {
                activate: 'onEliminarOrden'
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
                view.push({
                    xtype: 'clienteslist'
                });
                this.esFavorito = false;
                me.muestraClientes();
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

    mostrarActivo: function(container, button, pressed){
        var me = this;

        if(button.getText() == 'Favoritos' && pressed){
            me.getSeleccionadorProFav().setItems({xtype: 'productosview'});
        } else {
            me.getSeleccionadorProFav().setItems({xtype: 'productoslist'});
        }
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
            menu = me.getMenu(),
            view = me.getOpcionesOrden();

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
            this.hazTransaccion(query, 'Ordenes', false);
            this.mandaMensaje('Producto agregado', 'El producto fue agregado exitosamente');
            menu.pop();
            menu.getNavigationBar().getBackButton().hide();
            view.setActiveItem(2);
            Ext.getStore('Ordenes').load();
        }
    },

    eliminaProducto: function (list, index, target, record) {
        var me = this;
        Ext.Msg.confirm("Eliminar producto", "Se va a eliminar el producto, ¿está seguro?", function (e) {

            if (e == 'yes') {
                var ind = record.get('id');
                var query = "DELETE FROM PRODUCTO WHERE id = " + ind + "";
                me.hazTransaccion(query, 'Productos', false);

                me.muestraProductos();
            }
        });
    },

    muestraProductos: function () {
        var query = "SELECT * FROM PRODUCTO";
        this.hazTransaccion(query, 'Productos', true);
    },

    muestraClientes: function () {
        var query = "SELECT * FROM CLIENTE";
        this.hazTransaccion(query, 'Clientes', true);
        Ext.getStore('Clientes').load();
    },

    muestralistaOrden: function () {
        var query = "SELECT * FROM ORDEN WHERE clienteId = " + this.idCliente + "";
        //alert(query);
        this.hazTransaccion(query, 'Ordenes', true);
    },

    busca: function (searchField) {
        var campo = searchField.getValue();
        if (this.esFavorito) {
            var query = "SELECT * FROM PRODUCTO WHERE favorite = 'true' AND (code like '%" + campo + "%' OR description like '%" + campo + "%')";
        } else {
            var query = "SELECT * FROM PRODUCTO WHERE code like '%" + campo + "%' OR description like '%" + campo + "%'";
        }
        //alert(query);
        this.hazTransaccion(query, 'Productos', true);
    },

    buscaCliente: function (searchField) {
        var campo = searchField.getValue();
        var query = "SELECT * FROM CLIENTE WHERE code like '%" + campo + "%' OR name like '%" + campo + "%'";
        //alert(query);
        this.hazTransaccion(query, 'Clientes', true);
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
        this.hazTransaccion("SELECT * FROM PRODUCTO WHERE favorite = '" + esFavorito + "'", 'Productos', true);
    },

    actualiza: function (esFavorito, ind) {
        this.hazTransaccion("UPDATE PRODUCTO SET favorite = '" + esFavorito + "' WHERE id = " + ind + "",
            'Productos', false);
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
            title: code +' '+ name
        });

        this.idCliente = record.get('id');
        this.muestralistaOrden();
    },

    onAgregarProducto: function (list, index, target, record) {
        //console.log(record);
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

    onOpcionesOrden: function (t, index, target, record, e) {
        var me = this,
            view = me.getMenu(),
            opcion = record.get('action');

        switch (opcion) {
            case 'orden':
                view.push({
                    xtype: 'opcionesorden',
                    title: view.getActiveItem().title
                });
                me.muestraProductos();
                view.getNavigationBar().getBackButton().hide();
                Ext.getStore('Productos').load();
                break;
        }
    },

    mostrarActivo: function (container, button, pressed) {
        var me = this;

        if (button.getText() == 'Favoritos' && pressed) {
            me.getSeleccionadorProFav().setItems({xtype: 'productosview'});
            Ext.getStore('Productos').load();
            //me.muestraProductos();
        } else {
            me.getSeleccionadorProFav().setItems({xtype: 'productoslist'});
            Ext.getStore('Productos').load();
            //me.muestraProductos();
        }
    },

    onTapFavorito: function ( t, index, target, record, e, es) {
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

    onEliminarOrden: function (){
        var me = this,
            view = me.getMenu();

        view.pop();
    }

});