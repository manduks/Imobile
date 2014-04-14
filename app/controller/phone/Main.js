Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    esFavorito: undefined,
    config: {
        control: {
             'seleccionadorprofav #listarProductos':{
                tap:'listarProductos'
            },
            'seleccionadorprofav #listarFavoritos':{
                tap:'listarFavoritos'
            },
            'seleccionadorprofav productoslist':{
                itemtap:'cambiaStatusFavoritos'
            },
            'productoslist #busca':{
                keyup:'busca'
            },
            'agregarproductosform #agregar':{
                tap: 'agregaProductos'
            },
            'agregarproductosform #cancelar':{
                tap: 'onCancelar'
            },
            'productoslist #agregar':{
                tap: 'onAgregar'
            },
            'productoslist' :{
                itemswipe:'eliminaProducto'
            }
        }
    },

    onSelectMenu: function(view, index, target, record, eOpts) {
        console.log(record);
        var me = this,
            view = me.getMenu(),
            option = record.get('action');
        switch (option) {
            case 'favoritos':
                view.push({
                    xtype: 'seleccionadorprofav',                    
                    //html:'Favoritos'
                });
                this.esFavorito=true;
                me.lista(true);
                break;
            case 'sistema':
                view.push({
                    xtype:'configuracionlist',
//                    html: 'Configuremos la aplicacion'
                });
                break;

            case 'prospectos':
                view.push({
                    xtype: 'clienteslist'
                });
                break;
            case 'venta':
                view.push({
                    xtype: 'productoslist'                    
                    //xtype:'agregarproductosform'
                });
                this.esFavorito=false;
                me.muestraProductos();
                break;
            case 'salir':
                me.getMain().setActiveItem(0);
                break;
            // default:
            //     view.push({
            //         xtype: 'container',
            //         html: 'Voy a modificar esta linea'
            //     });
            //     break;
        }
    },

    onCancelar:function (){
        var me = this,
            view = me.getMenu();
        view.pop();
    },

    onAgregar: function (btn){
        var me = this,
            view = me.getMenu();
        view.push({
            xtype: 'agregarproductosform'
        });
    },

    agregaProductos: function(btn){
        var form, values, codigo, descripcion, query;

        form = btn.up('agregarproductosform');
        values = form.getValues();
        console.log(form);
        //alert(values.code);
        codigo = values.code;
        descripcion = values.description;

        if (descripcion == "" || codigo == null){
            //alert('Todos los campos deben estar llenos');
            this.mandaMensaje("Campos inválidos o vacíos", "Verifique que el valor de los campos sea correcto o que no estén vacíos");
        } else {
            query = "INSERT INTO PRODUCTO (code, description, favorite) VALUES (" + codigo + ", '" + descripcion + "', 'false')";
            //alert(query);
            this.hazTransaccion(query, 'Productos', true);
            this.mandaMensaje('Producto agregado', 'El producto fue agregado exitosamente');
            this.muestraProductos();
            form.reset();
        }
    },

    eliminaProducto: function(list, index, target, record){
        var me = this;
        Ext.Msg.confirm("Eliminar producto", "Se va a eliminar el producto, ¿está seguro?", function (e){
            //alert('entre');
            //console.log(e);
            if(e == 'yes'){
                var ind = record.get('id');
                var query = "DELETE FROM PRODUCTO WHERE id = " + ind + "";
                //alert(query);
                me.hazTransaccion(query,'Productos', true);
                me.muestraProductos();
            }
        }); 
    },

    muestraProductos: function (){
        var query = "SELECT * FROM PRODUCTO";
        this.hazTransaccion(query,'Productos', true);
    },

    busca: function(searchField){
        var campo = searchField.getValue();
        if(this.esFavorito){
            var query = "SELECT * FROM PRODUCTO WHERE favorite = 'true' AND (code like '%" + campo + "%' OR description like '%" + campo + "%')" ;
        } else {
            var query = "SELECT * FROM PRODUCTO WHERE code like '%" + campo + "%' OR description like '%" + campo + "%'" ;
        }
        //alert(query);
        this.hazTransaccion(query ,'Productos', true);
    },    

//// Controlador de Favoritos ////
    listarFavoritos:function(segmentedButton){        
        
        this.lista(true); // Me lista aquellos cuyo valor favorite es true
        this.esFavorito=true;
    },

    listarProductos: function (segmentedButton){
              
      this.lista(false); // Me lista aquellos cuyo valor favorite es false
      this.esFavorito=false;
    },

    cambiaStatusFavoritos: function ( list, index, target, record, e, eOpts ){       
        var ind = record.get('id');

        if(record.get('favorite') === false){
            this.actualiza(true, ind);  // Si favorite es false, lo hacemos true
            this.lista(false);

        } else {
            this.actualiza(false, ind); // Si favorite es true, lo hacemos false
            this.lista(true);
        }
        //list.getStore().sync(); // Hacer un UPDATE para esta cosa
        //console.log(record);
    },

    lista: function (esFavorito){
        this.hazTransaccion("SELECT * FROM PRODUCTO WHERE favorite = '" + esFavorito + "'" ,'Productos', true);
    },

    actualiza: function(esFavorito, ind){                
        this.hazTransaccion("UPDATE PRODUCTO SET favorite = '" + esFavorito + "' WHERE id = " + ind + "",
            'Productos', false);
    },

    hazTransaccion: function (query, storeName, add){
        var me = this;
        var store = Ext.getStore(storeName);

        db = store.getModel().getProxy().getDatabaseObject();
        
        db.transaction(function(tx) {
            tx.executeSql(query, [], function(tx, results) {
                if(add){
                    store.removeAll();
                    var len = results.rows.length,
                    i;
                    for (i = 0; i < len; i++) {
                        store.add(results.rows.item(i));
                    }
                }
            }, null);
        });
    },

    mandaMensaje:function(titulo,mensaje){
        Ext.Msg.alert(titulo, mensaje);
    }
});