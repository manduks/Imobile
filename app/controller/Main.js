Ext.define('Imobile.controller.Main',{
    extend:'Ext.app.Controller',

    config:{
        refs:{
            main:{
                selector:'main'
            },
            menu: 'menu',
            opcionesOrden: 'opcionesorden',
            opcionCliente: 'opcionclientelist',
            seleccionadorProFav: 'seleccionadorprofav',
            direcciones: 'direccionescontainer',
            productosOrden: 'productosorden',
            productosView: 'productosview',
            navigationOrden: 'navigationorden'

        },
        control:{
            'loginform':{
                logged: 'onLoginUser'
            },
            'menu dataview':{
                itemtap: 'onSelectMenu'
            },
            'main navigationview #agregarProductos':{
                tap: 'onAgregarPartida'
            },
            'navigationorden':{
                pop: 'onPopNavigationOrden'
            }
        }
    },

    //onLoginUser:function(form,token){
    onLoginUser:function(){
        this.getMain().setActiveItem(1);

        // Make the JsonP request
        /*Ext.data.JsonP.request({
            url: 'http://192.168.15.8:88/iMobile/COK1_CL_UsuarioiMobile/Login',
            params:{
              CodigoUsuario: '1',
                CodigoSociedad: '001',
                CodigoDispositivo: '004',
                Contrasenia: '12345'
            },
            callbackKey: 'callback',
            success: function(result, request) {
                console.log(result);
            }
        });*/

    },

    onSelectMenu: Ext.emptyFn,

     hazTransaccion: function (query, storeName, add, form){
        var me = this;
        var store = Ext.getStore(storeName),

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
    },

    aleatorio: function (inferior,superior){ 
        var numPosibilidades = superior - inferior,
        aleat = Math.random() * numPosibilidades, 
        aleat = Math.floor(aleat);

        return parseInt(inferior) + aleat;
    },

    dameColorAleatorio: function (){ 
        var hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"),
        color_aleatorio = "#",
        posarray;

        for (i=0;i<6;i++){ 
            posarray = this.aleatorio(0,hexadecimal.length) 
            color_aleatorio += hexadecimal[posarray] 
        } 
        return color_aleatorio 
    },

    launch:function(){
         
    }
         
});