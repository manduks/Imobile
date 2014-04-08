Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    config: {
        control: {
             'seleccionadorprofav #listarProductos':{
                tap:'listarProductos'
            },
            'seleccionadorprofav #listarFavoritos':{
                tap:'listarFavoritos'
            },
            'seleccionadorprofav productoslist':{
                itemtap:'onAgregarAFavoritos'
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
                });
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

    listarFavoritos:function(segmentedButton){        

        this.filtrar("SELECT * FROM PRODUCTO WHERE favorite = 'true'", 'Productos');
    },

    listarProductos: function (segmentedButton){
        
      this.filtrar("SELECT * FROM PRODUCTO WHERE favorite = 'false'", 'Productos');
    },

    onAgregarAFavoritos: function ( list, index, target, record, e, eOpts ){
        record.set('favorite',true);
        //"UPDATE PRODUCTO SET favorite = 'false' WHERE favorite = 'false'", 'Productos'
        list.getStore().sync(); // Hacer un UPDATE para esta cosa
        console.log(record);
    },

    filtrar: function (query, storeName){
        var me = this;
        var store = Ext.getStore(storeName);

        db = store.getModel().getProxy().getDatabaseObject();

        store.removeAll();
        db.transaction(function(tx) {
            tx.executeSql(query, [], function(tx, results) {
                var len = results.rows.length,
                    i;
                for (i = 0; i < len; i++) {
                    store.add(results.rows.item(i));
                }
            }, null);
        });
    }
});