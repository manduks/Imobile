Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    esFavorito: undefined,
    idCliente: undefined,
<<<<<<< HEAD
=======
    entrega: undefined,
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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
<<<<<<< HEAD
            'productosorden #listaProductos':{
                tap: 'mostrarListaProductos'
            },
            'productosorden #panelProductos':{
=======
            'productosorden #listaProductos': {
                tap: 'mostrarListaProductos'
            },
            'productosorden #panelProductos': {
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                tap: 'mostrarPanelProductos'
            },
            'productosorden productoslist': {
                itemtap: 'onAgregarProducto'
            },
            'productosorden productosview': {
                itemtap: 'onAgregarProducto'
            },
<<<<<<< HEAD
            'partidacontainer #agregarOrden':{
                tap: 'agregaOrden'
            },
            'clienteForm #agregar':{
=======
            'partidacontainer #agregarOrden': {
                tap: 'agregaOrden'
            },
            'clienteForm #agregar': {
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                tap: 'agregaDireccion'
            },
            'opcionesorden #addOrden': {
                activate: 'onAddOrden'
            },
<<<<<<< HEAD
            'opcionesorden':{
=======
            'opcionesorden': {
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                activeitemchange: 'cambiaItem'
            },
            'direccioneslist': {
                itemtap: 'muestraDirecciones'
            },
<<<<<<< HEAD
            'ordenlist':{
                itemswipe: 'eliminaPartida'
=======
            'ordenlist': {
                itemswipe: 'eliminaPartida',
                itemtap: 'onAgregarProducto'
            },            
            'opcionesorden #terminar': {
                activate: 'onTerminarOrden'
            },
            'editarpedidoform #moneda':{
                focus: 'muestraMonedas'
            },
            'tpldirecciones':{
                itemtap: 'seleccionaDireccion'
            },
            'monedaslist':{
                itemtap: 'seleccionaMoneda'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
            }
        }
    },

    onSelectMenu: function (view, index, target, record, eOpts) {
        //console.log(record);
        var me = this,
            view = me.getMenu(),
<<<<<<< HEAD
            option = record.get('action');
=======
            option = record.get('action');            
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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
<<<<<<< HEAD
                    xtype: 'configuracionlist'
//                    html: 'Configuremos la aplicacion'
=======
                    xtype: 'configuracionlist'                    
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                });
                break;

            case 'prospectos':
                view.push({
<<<<<<< HEAD
                    xtype: 'clienteslist'                    
=======
                    xtype: 'clienteslist'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                });
                me.muestraClientes();
                break;
            case 'venta':
<<<<<<< HEAD
                view.push({
                    xtype: 'clienteslist'
                });
                this.esFavorito = false;
                me.muestraClientes();
=======
                
                me.ponParametros('Clientes', '1', '001', '004', '12345', "6VVcR7brnB4=");

                view.push({
                    xtype: 'clienteslist'
                });

                this.esFavorito = false;                
                //me.muestraClientes();
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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
<<<<<<< HEAD
                    xtype: 'initializecontainer'
=======
                    xtype: 'initializecontainer'                    
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                });
                break;
            case 'configuracion':
                view.push({
<<<<<<< HEAD
                    xtype: 'configuracioncontainer'                    
=======
                    xtype: 'configuracioncontainer'                   
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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

<<<<<<< HEAD
    eliminaPartida: function (list, index, target, record){                
        var me = this;
        Ext.Msg.confirm("Eliminar producto de la orden", "Se va a eliminar el producto de la orden, ¿está seguro?", function (e) {

            if (e == 'yes') {
                var query = "DELETE FROM ORDEN WHERE id = " + record.get('id') + "";
                me.hazTransaccion(query, 'Ordenes', false);
                me.muestralistaOrden();
            } 
        });
    },

    cambiaItem:function(tabPanel, value, oldValue){
        if(value.title == 'Cliente'){
            var query = "SELECT * FROM CLIENTE WHERE id = " + this.idCliente + "";
            form = value.down('clienteform');
            this.hazTransaccion(query, 'Clientes', true, form);
            setTimeout(function(){
                datos = Ext.getStore('Clientes').getAt(0).data;                            
                form.setValues(datos);
            }, 500)
        }

        /*if(value.title == 'Eliminar Orden'){
            tabPanel.setActiveItem(0);
        }*/
    },

    agregaDireccion: function(btn){
        var query, me, form, fiscal, calle, colonia, municipio, cp, ciudad, estado, pais, view, direcciones, entrega;
        me = this;        
        form = btn.up('clienteForm');
        values = form.getValues();        
=======
    seleccionaDireccion: function(list, index, target, record){
        //console.log(record);
        if(this.entrega){
            var direccionEntrega = record.data; 
            this.mandaMensaje('Dirección de entrega', 'Dirección de entrega seleccionada'); // mensajes temporales
        } else {
            var direccionFiscal = record.data;
            this.mandaMensaje('Dirección fiscal', 'Dirección fiscal seleccionada');
        }        
    },

    seleccionaMoneda: function (list, index, target, record){
        var moneda = record.data.NombreMoneda;
            tabOpciones = this.getOpcionesOrden();
            form = tabOpciones.down('editarpedidoform');
            form.setValues({NombreMoneda: moneda});
        //console.log(moneda);
        //this.mandaMensaje('Moneda', 'Se eligió ' + moneda.NombreMoneda); // mensajes temporales
    },

    muestraMonedas: function (){
         var me = this,            
            view = me.getMain().getActiveItem();        

        me.ponParametros('Monedas', '1', '001', '004', '12345', "6VVcR7brnB4=");
               
        view.push({
            xtype: 'monedaslist'
        })        
                //console.log(monedas);

        view.getNavigationBar().down('#agregarProductos').hide()      
    },

    eliminaPartida: function (list, index, target, record) {
        var me = this;
            ordenes = Ext.getStore('Ordenes');
        Ext.Msg.confirm("Eliminar producto de la orden", "Se va a eliminar el producto de la orden, ¿está seguro?", function (e) {

            if (e == 'yes') {
                /*var query = "DELETE FROM ORDEN WHERE id = " + record.get('id') + "";
                me.hazTransaccion(query, 'Ordenes', false);
                */
                console.log(record.data);
                ind = ordenes.find('CodigoArticulo', record.data.CodigoArticulo);
                console.log(ind);
                ordenes.removeAt(ind);                
            }
        });
    },

    cambiaItem: function (tabPanel, value, oldValue) {
        var me=this,
            view = me.getMain().getActiveItem();
        
        view.getNavigationBar().down('#agregarProductos').show();        

        if (value.title == 'Cliente') {                        
            form = value.down('clienteform');
            datos = me.traeCliente();
                            
            direcciones = Ext.getStore('Direcciones');
            direcciones.removeAll();
            direcciones.add(datos.Direcciones);
            form.setValues(datos);
        }

        if(value.title == 'Editar'){            
            value.setValues(me.traeCliente());
        }

        /*if(value.title == 'Eliminar Orden'){
         tabPanel.setActiveItem(0);
         }*/
    },

    traeCliente: function (){
        var me = this,
        clientes = Ext.getStore('Clientes');
        ind = clientes.find('CodigoSocio', me.idCliente);
        datos = clientes.getAt(ind).data;

        return datos;
    },

    agregaDireccion: function (btn) {
        var query, me, form, fiscal, calle, colonia, municipio, cp, ciudad, estado, pais, view, direcciones, entrega;
        me = this;
        form = btn.up('clienteForm');
        values = form.getValues();
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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

<<<<<<< HEAD
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
        //alert("Entre a direcciones");
        var me = this,
            query = "SELECT * FROM DIRECCION WHERE idCliente = " + me.idCliente;
            
            view = me.getMain().getActiveItem();
            me.hazTransaccion(query, 'Direcciones', true);

        view.push({
           xtype: 'tpldirecciones'
        })

        view.getNavigationBar().down('#agregarProductos').hide()

/*        var query = "SELECT * FROM DIRECCIONFISCAL";
        this.hazTransaccion(query, 'DireccionesFiscales', true);*/

    },

    agregaOrden: function(button){
         /*var me = this,
         view = me.getMenu();
      
         view.push({
            xtype: 'direccionescontainer'
        });
         me.muestraDirecciones();*/
    },

    mostrarListaProductos: function(container, button, pressed){
        var me = this;
            query = "SELECT * FROM PRODUCTO";
            me.hazTransaccion(query, 'Productos', true);
            me.getProductosOrden().setItems({xtype: 'productoslist'});
    },

    mostrarPanelProductos: function(container, button, pressed){
        var me = this;
        me.listarFavoritos();
        me.getProductosOrden().setItems({xtype: 'productosview'});
        console.log(me.getProductosView());

        /*setTimeout(function(){
            var elements = me.getProductosView().getViewItems();
        Ext.Array.each(elements, function(name, index, countriesItSelf){
               console.log(name.setAttribute("style", "background-color: blue;"));
        });
            }, 1000)*/
=======
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

    muestraDirecciones: function (list, index, target, record) {
        //alert("Entre a direcciones");
        var me = this;
            view = me.getMain().getActiveItem();
            direcciones = Ext.getStore('Direcciones');
            direcciones.clearFilter();            

            if(record.data.action == 'entrega'){
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
        Ext.getStore('Productos').clearFilter();
        Ext.getStore('Productos').load();        
        me.getProductosOrden().setItems({xtype: 'productoslist'});
    },

    mostrarPanelProductos: function (container, button, pressed) {
        var me = this,
        productos = Ext.getStore('Productos');

        me.listarFavoritos();
        me.getProductosOrden().setItems({xtype: 'productosview'});
        
        setTimeout(function () { //Función para esperar algunos milisegundos
            productos.each(function(item, index, length){
            item.set('color', me.dameColorAleatorio());            
        })            
        }, 100)
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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
<<<<<<< HEAD
        var form, values, codigo, descripcion, cantidad, precio, moneda, descuento, precioConDescuento, totalDeImpuesto, query,
            importe, almacen, existencia,
=======
        var form, values, descripcion, cantidad,            
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
            me = this,
            menu = me.getMain().getActiveItem();

        form = btn.up('agregarproductosform');
<<<<<<< HEAD
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
            //this.mandaMensaje('Producto agregado', 'El producto fue agregado exitosamente');
            menu.pop();

            menu.getNavigationBar().down('#agregarProductos').hide();
            //menu.getNavigationBar().getBackButton().hide();
            //me.getMain().setActiveItem(0);
            //view.setActiveItem(1);
            Ext.getStore('Ordenes').load();
=======
        values = form.getValues();        
        descripcion = values.NombreArticulo;
        cantidad = values.cantidad;        
        ordenes = Ext.getStore('Ordenes');

        if (Ext.isEmpty(descripcion) || Ext.isEmpty(cantidad)) {
            me.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {
            codigo = values.CodigoArticulo;
            ind = ordenes.find('CodigoArticulo', codigo);

            if(ind == -1){                
                ordenes.add(values);
            } else {
                datosProducto = ordenes.getAt(ind);
                datosProducto.set('cantidad', cantidad);
                datosProducto.set('NombreArticulo', descripcion);
            }
                        
            menu.pop();
            menu.getNavigationBar().down('#agregarProductos').hide();
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        }
    },

    eliminaProducto: function (list, index, target, record) {
        var me = this;
        Ext.Msg.confirm("Eliminar producto", "Se va a eliminar el producto, ¿está seguro?", function (e) {

            if (e == 'yes') {
                var ind = record.get('id');
                var query = "DELETE FROM PRODUCTO WHERE id = " + ind + "";
<<<<<<< HEAD
                me.hazTransaccion(query, 'Productos', false);

                me.muestraProductos();
            } 
=======
                //me.hazTransaccion(query, 'Productos', false);

                me.muestraProductos();
            }
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        });
    },

    muestraProductos: function () {
        var query = "SELECT * FROM PRODUCTO";
<<<<<<< HEAD
        this.hazTransaccion(query, 'Productos', true);
    },

    muestraClientes: function () {
        var query = "SELECT * FROM CLIENTE";
        this.hazTransaccion(query, 'Clientes', true);
=======
        //this.hazTransaccion(query, 'Productos', true);
        Ext.getStore('Productos').load();
    },

    muestraClientes: function () {
        //var query = "SELECT * FROM CLIENTE";
        //this.hazTransaccion(query, 'Clientes', true);
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        Ext.getStore('Clientes').load();
    },

    muestralistaOrden: function () {
<<<<<<< HEAD
        var query = "SELECT * FROM ORDEN WHERE clienteId = " + this.idCliente + "";
        //alert(query);
        this.hazTransaccion(query, 'Ordenes', true);
=======
        //var query = "SELECT * FROM ORDEN WHERE clienteId = " + this.idCliente + "";
        //alert(query);
        //this.hazTransaccion(query, 'Ordenes', true);
      Ext.getStore('Ordenes').load();  
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    },

    busca: function (searchField) {
        var campo = searchField.getValue();
        if (this.esFavorito) {
            var query = "SELECT * FROM PRODUCTO WHERE favorite = 'true' AND (code like '%" + campo + "%' OR description like '%" + campo + "%')";
        } else {
            var query = "SELECT * FROM PRODUCTO WHERE code like '%" + campo + "%' OR description like '%" + campo + "%'";
        }
        //alert(query);
<<<<<<< HEAD
        this.hazTransaccion(query, 'Productos', true);
=======
        //this.hazTransaccion(query, 'Productos', true);
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    },

    buscaCliente: function (searchField) {
        var campo = searchField.getValue();
        var query = "SELECT * FROM CLIENTE WHERE code like '%" + campo + "%' OR name like '%" + campo + "%'";
        //alert(query);
<<<<<<< HEAD
        this.hazTransaccion(query, 'Clientes', true);
=======
        //this.hazTransaccion(query, 'Clientes', true);
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    },

//// Controlador de Favoritos ////
    listarFavoritos: function (segmentedButton) {
        this.lista(true); // Me lista aquellos cuyo valor favorite es true
        this.esFavorito = true;
    },

    listarProductos: function (segmentedButton) {
        this.lista(false); // Me lista aquellos cuyo valor favorite es false
<<<<<<< HEAD
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
=======
        this.esFavorito = false;
    },

    cambiaStatusFavoritos: function (list, index, target, record, e, eOpts) {
        var me = this;
        console.log(record.get('favorite'));
        record.set('favorite', !record.get('favorite'));     //Invertimos el estatus
        console.log(record.get('favorite'));
        
        //console.log(values);
        //Por aqui establecemos el color
        if(record.get('favorite')){
            color = me.dameColorAleatorio();
            record.set('color', color);
            console.log(color);
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

    lista: function (esFavorito) {
        //this.hazTransaccion("SELECT * FROM PRODUCTO WHERE favorite = '" + esFavorito + "'", 'Productos', true);
       var productos = Ext.getStore('Productos');
            me = this,

        productos.clearFilter(); //Para limpiar todos los filtros por si tiene alguno el store
        productos.filter('favorite', esFavorito);
        me.ponParametros('Productos', '1', '001', '004', '12345', "6VVcR7brnB4=");        
    },

    actualiza: function (esFavorito, ind) {
        //this.hazTransaccion("UPDATE PRODUCTO SET favorite = '" + esFavorito + "' WHERE id = " + ind + "",
            //'Productos', false);
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    },

    mandaMensaje: function (titulo, mensaje) {
        Ext.Msg.alert(titulo, mensaje);
    },

    alSelecionarCliente: function (view, index, target, record, eOpts) {
        var me = this,
<<<<<<< HEAD
            view = me.getMenu(),
            code = record.get('code'),
            name = record.get('name');

        view.push({
            xtype: 'opcionclientelist',
            title: code +' '+ name
        });

        this.idCliente = record.get('id');
=======
            view = me.getMenu(),           
            name = record.get('NombreSocio');

            me.idCliente = record.get('CodigoSocio'),

        view.push({
            xtype: 'opcionclientelist',
            title: me.idCliente + ' ' + name
        });

        //this.idCliente = record.get('id');
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        this.muestralistaOrden();
    },

    onAgregarProducto: function (list, index, target, record) {
<<<<<<< HEAD
        //console.log(record);        
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
=======
        var me = this,
            view = me.getMain().getActiveItem(),
            viewOrden = me.getOpcionesOrden();
            valores = record.data; 

        view.push({
            xtype: 'agregarproductosform'
        });

        view.getActiveItem().setValues(valores); //agregarproductoform

        if(list.isXType('ordenlist')){ // Para editar pedido
            view.getActiveItem().down('fieldset').setTitle('Editar producto');
            view.getNavigationBar().down('#agregarProductos').hide();
        }
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    },

    onOpcionesOrden: function (t, index, target, record, e) {
        var me = this,
            view = me.getMenu(),
            opcion = record.get('action');

        switch (opcion) {
            case 'orden':

<<<<<<< HEAD
                me.getMain().setActiveItem(2);

                me.getMain().getActiveItem().getNavigationBar().setTitle(view.getActiveItem().title);
                me.getMain().getActiveItem().down('opcionesorden').setActiveItem(0);
                /*view.push({
                    xtype: 'opcionesorden',
                    title: view.getActiveItem().title
                });*/
                //me.muestraProductos();
                //view.getNavigationBar().getBackButton().hide();
                //Ext.getStore('Productos').load();
=======
                me.getMain().setActiveItem(2); // Activamos el item 2 del menu principal

                me.getMain().getActiveItem().getNavigationBar().setTitle(view.getActiveItem().title); //Establecemos el title del menu principal como el mismo del menu de opciones
                me.getMain().getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                //console.log(me.getMain().getActiveItem().down('opcionesorden').getActiveItem());
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                break;
        }
    },

<<<<<<< HEAD
    onTapFavorito: function ( t, index, target, record, e, es) {
=======
    onTapFavorito: function (t, index, target, record, e, es) {
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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

<<<<<<< HEAD
    onEliminarOrden: function (newActiveItem, tabPanel){
        var me = this;         
=======
    onEliminarOrden: function (newActiveItem, tabPanel) {
        var me = this;
            ordenes = Ext.getStore('Ordenes');
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3

        Ext.Msg.confirm("Eliminar orden", "Se va a eliminar la orden, todos los productos agregados se perderán ¿está seguro?", function (e) {

            if (e == 'yes') {
                var query = "DELETE FROM ORDEN WHERE clienteId = " + me.idCliente + "";
<<<<<<< HEAD
                me.hazTransaccion(query, 'Ordenes', false);
                me.muestralistaOrden();
                me.getMain().setActiveItem(1);
            } else{
=======
                //me.hazTransaccion(query, 'Ordenes', false);
                ordenes.removeAll();
                //me.muestralistaOrden();
                me.getMain().setActiveItem(1);
            } else {
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                tabPanel.setActiveItem(0);
            }
        });
    },

<<<<<<< HEAD
    onAgregarPartida: function (){
        var me = this,
            view = me.getMain().getActiveItem();

        me.muestraProductos();

        view.push({
           xtype: 'productosorden'
=======
    onAgregarPartida: function () {
        var me = this,
            view = me.getMain().getActiveItem();

        me.ponParametros('Productos', '1', '001', '004', '12345', "6VVcR7brnB4=");

        view.push({
            xtype: 'productosorden'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        });

        view.getNavigationBar().down('#agregarProductos').hide()
    },

<<<<<<< HEAD
    onPopNavigationOrden: function (){
        var me = this,
            view = me.getMain().getActiveItem();

        view.getNavigationBar().down('#agregarProductos').show()
=======
    onPopNavigationOrden: function (t, v, e) {
        var me = this,
            view = me.getMain().getActiveItem();
            //console.log(view.getActiveItem().isXType('ordenlist'));
            //console.log(t.getActiveItem().getActiveItem().xtype);            

/*            if(v.getItemId().substring(4, 24) == 'agregarproductosform'){ 
                view.getNavigationBar().down('#agregarProductos').hide()
            } else {
                view.getNavigationBar().down('#agregarProductos').show()
            }*/

            if(t.getActiveItem().getActiveItem().isXType('partidacontainer')){
                view.getNavigationBar().down('#agregarProductos').show();
            }

/*        if (v.getItemId() != 'principal') {
            view.getNavigationBar().down('#agregarProductos').hide()
        } else {
            view.getNavigationBar().down('#agregarProductos').show()
        }*/
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    },

    onAddOrden: function () {
        var me = this;

        me.getMain().setActiveItem(1);
<<<<<<< HEAD
=======
    },

    ponParametros: function (storeName, cUsuario, cSociedad, cDispositivo, passw, tok){
        var store = Ext.getStore(storeName);

        params = {
                    CodigoUsuario: cUsuario,
                    CodigoSociedad: cSociedad,
                    CodigoDispositivo: cDispositivo,
                    Contrasenia: passw,
                    Token: tok
                };

        store.setParams(params);
        store.load();        
    },

    onTerminarOrden: function () {
        var me = this;

        me.getMain().setActiveItem(1);
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    }

});