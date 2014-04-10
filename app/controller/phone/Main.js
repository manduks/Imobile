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
                });
                this.esFavorito=false;
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
});