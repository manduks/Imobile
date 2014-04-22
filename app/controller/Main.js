Ext.define('Imobile.controller.Main',{
    extend:'Ext.app.Controller',

    config:{
        refs:{
            main:{
                selector:'main'
            },
            menu: 'menu',
            opcionesOrden: 'opcionesorden',
            opcionCliente: 'opcionclientelist'
        },
        control:{
            'loginform':{
                logged: 'onLoginUser'
            },
            'menu dataview':{
                itemtap: 'onSelectMenu'
            }
        }
    },

    onLoginUser:function(form,token){
        this.getMain().setActiveItem(1);
    },

    onSelectMenu: Ext.emptyFn,

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
            }, null,function(){
                console.log(arguments);
            });
        });

        store.sync()
    },   

    launch:function(){        

    //Borramos datos de productos, clientes y órdenes
        var query = "DELETE FROM PRODUCTO";
        this.hazTransaccion(query, 'Productos', true);

        query = "DELETE FROM CLIENTE";
        this.hazTransaccion(query, 'Clientes', true);

        query = "DELETE FROM ORDEN";
        this.hazTransaccion(query, 'Ordenes', true);

        //Ingresamos datos de productos y clientes
        
        for(var i = 0; i < 10; i++){
            query = "INSERT INTO PRODUCTO (code, description, cantidad, precio, moneda, descuento, precioConDescuento, " +
                "totalDeImpuesto, importe, almacen, existencia, favorite) VALUES (" + i + ", '" + "Producto" + i + "'," + 
                1 + "," + (i+28.45) + "," + " 'pesos', " + (i +1 * .1) + "," + 23.25 + "," + 1.16 + "," + 5.25 + ", 'almacén', " + (i+10) + ", 'false')";
//            query = "INSERT INTO PRODUCTO (code, description, cantidad) VALUES (" + i + ", '" + "Producto" + i + "'," + (i +2) + ")";
            //alert(query);
            this.hazTransaccion(query, 'Productos', true);

        }

       for(var i = 0; i < 5; i++){
            query = "INSERT INTO CLIENTE (code, name) VALUES ('C00" + i + "', '" + "Pablito" + i + "')";
            this.hazTransaccion(query, 'Clientes', true);
        }

        var store = Ext.getStore('Ordenes');
        store.load();
        var c = store.getCount();
        //alert(c);

/*        if(c <= 0){
            for(var i = 0; i < 5; i++){
                store.add({
                    code: i, 
                    description: 'descripcion' + i                    
                })
            }
            store.sync();            
        }*/
    }
});