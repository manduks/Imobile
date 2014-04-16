Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    esFavorito: undefined,
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
            'productoslist': {
                itemswipe: 'eliminaProducto',
                itemtap: 'onAgregarProducto'
            },
            'clienteslist #busca': {
                keyup: 'buscaCliente'
            },
            'menu clienteslist': {
                itemtap: 'alSelecionarCliente'
            },
            'opcionclientelist': {
                itemtap: 'onOpcionesOrden'
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
                    //xtype: 'productoslist'                  
                    xtype: 'clienteslist'
                    //xtype:'agregarproductosform'                    
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
        var form, values, codigo, descripcion, query,
            me = this,
            view = me.getOpcionesOrden();

        form = btn.up('agregarproductosform');
        values = form.getValues();
        //console.log(form);
        //alert(values.code);
        codigo = values.code;
        descripcion = values.description;

        if (descripcion == "" || codigo == null) {
            //alert('Todos los campos deben estar llenos');
            this.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {
            query = "INSERT INTO ORDEN (code, description) VALUES (" + codigo + ", '" + descripcion + "')";
            alert(query);
            this.hazTransaccion(query, 'Ordenes', true);
            //this.mandaMensaje('Producto agregado', 'El producto fue agregado exitosamente');
            //this.muestraProductos();
            this.muestralistaOrden();
            view.setActiveItem(3);
            form.reset();
        }
    },

    eliminaProducto: function (list, index, target, record) {
        var me = this;
        Ext.Msg.confirm("Eliminar producto", "Se va a eliminar el producto, ¿está seguro?", function (e) {
            //alert('entre');
            //console.log(e);
            if (e == 'yes') {
                var ind = record.get('id');
                var query = "DELETE FROM PRODUCTO WHERE id = " + ind + "";
                //alert(query);
                me.hazTransaccion(query, 'Productos', true);
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
    },

    muestralistaOrden: function(){
        var query = "SELECT * FROM ORDEN";
        this.hazTransaccion(query, 'Orden', true);
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
        //list.getStore().sync(); // Hacer un UPDATE para esta cosa
        //console.log(record);
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
            option = record.get('action');


        view.push({
            xtype: 'opcionclientelist'
        });
        me.getOpcionCliente().down('toolbar').setTitle(record.get('code') + ' ' + record.get('name'));
    },

    onAgregarProducto: function () {
        var me = this,
            viewOrden = me.getOpcionesOrden();

        viewOrden.setActiveItem(2);
    },

    onOpcionesOrden: function (t, index, target, record, e) {
        var me = this,
            view = me.getMenu(),
            opcion = record.get('action');


        switch (opcion) {
            case 'orden':
                view.push({
                    xtype: 'opcionesorden'
                });
                me.listarProductos();
                break;
        }
    }
});