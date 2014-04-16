Ext.define('Imobile.controller.Main',{
    extend:'Ext.app.Controller',

    config:{
        refs:{
            main:{
                selector:'main'
            },
            menu: 'menu',
            opcionesOrden: 'opcionesorden'

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

    launch:function(){
        var store = Ext.getStore('Productos');
        store.load();
        var c = store.getCount();
        //alert(c);

        if(c <= 0){
            for(var i = 0; i < 5; i++){
                store.add({
                    code: i, 
                    description: 'descripcion' + i,
                    favorite: false
                })
            }
            store.sync();            
        }
    }
});