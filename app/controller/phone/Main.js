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
            'productoslist': {
                //itemswipe: 'eliminaProducto',
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
            },
            'seleccionadorprofav toolbar segmentedbutton':{
                toogle: 'mostrarActivo'
            },
            'partidacontainer #agregarOrden':{
                tap: 'agregaOrden'
            },
            'clienteForm #agregar':{
                tap: 'agregaDireccion'
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

    agregaDireccion: function(btn){
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

        if(fiscal){
            query = "INSERT INTO DIRECCIONFISCAL (idCliente, calle, colonia, municipio, cp, ciudad, estado, pais) VALUES (" + 
                this.idCliente + ", '" + calle + "', '" + 
                colonia + "', '" + municipio + "', " +cp + ", '" + ciudad + "', '" + estado + "', '" + 
                pais + "')";

            this.hazTransaccion(query, 'DireccionesFiscales', false);
        }        

        if (entrega){ 
            query = "INSERT INTO DIRECCION (idCliente, calle, colonia, municipio, cp, ciudad, estado, pais) VALUES (" + 
                this.idCliente + ", '" + calle + "', '" + 
                colonia + "', '" + municipio + "', " +cp + ", '" + ciudad + "', '" + estado + "', '" + 
                pais + "')";

            this.hazTransaccion(query, 'Direcciones', false);
        }            

        

        view = me.getMenu();        

         view.pop();

        me.muestraDirecciones();        
    },

    muestraDirecciones: function(){        
        var query = "SELECT * FROM DIRECCION";
        this.hazTransaccion(query, 'Direcciones', true);

        var query = "SELECT * FROM DIRECCIONFISCAL";
        this.hazTransaccion(query, 'DireccionesFiscales', true);        

    },

    agregaOrden: function(button){
         var me = this,
         view = me.getMenu();
      
         view.push({
            xtype: 'direccionescontainer'
        });
         me.muestraDirecciones();
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
        var form, values, codigo, descripcion, cantidad, precio, moneda, descuento, precioConDescuento, totalDeImpuesto,query,
            importe, almacen, existencia,
            me = this,
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
            //alert('Todos los campos deben estar llenos');
            me.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {

             query = "INSERT INTO ORDEN (clienteId, code, description, cantidad, precio, moneda, descuento, precioConDescuento, " +
                "totalDeImpuesto, importe, almacen, existencia) VALUES (" + this.idCliente + "," + codigo + ", '" + descripcion + "'," + 
                cantidad + "," + precio + ", '" + moneda + "', " + descuento + "," + precioConDescuento + "," + 
                totalDeImpuesto + "," + importe + ",'" + almacen + "', " + existencia + ")";
            //alert(query);
            this.hazTransaccion(query, 'Ordenes', false);
            this.mandaMensaje('Producto agregado', 'El producto fue agregado exitosamente');
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
    },

    muestralistaOrden: function(){
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
            bar = me.getMenu().getNavigationBar();


        view.push({
            xtype: 'opcionclientelist'
        });
        this.idCliente = record.get('id');
        this.muestralistaOrden();
        bar.titleComponent.setTitle(record.get('code') + ' ' + record.get('name'));
        //bar        text: 'Cheto',//record.get('code') + ' ' + record.get('name'),
        //console.log(me.getOpcionCliente());
        //me.getOpcionCliente().setTitle(record.get('code') + ' ' + record.get('name'));        
    },

    onAgregarProducto: function (list, index, target, record) {
        //console.log(record);
        var me = this,
            viewOrden = me.getOpcionesOrden();

        viewOrden.setActiveItem(2);
        //viewOrden.getActiveItem().code.setValue(record.get('code'));
        //viewOrden.down('agregarproductosform').getValues().code.setValue(record.get('code'));
        viewOrden.getActiveItem().setValues({
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
                    xtype: 'opcionesorden'
                });
/*                Ext.getStore('Productos').add({code:123, description:'descripcion', cantidad: 1});
                Ext.getStore('Productos').sync();
*/                me.muestraProductos();
                break;
        }
    }
});