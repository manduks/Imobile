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

    onLoginUser:function(form,token){
        this.getMain().setActiveItem(1);

        // Make the JsonP request
        Ext.data.JsonP.request({
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
        });

    },

    onSelectMenu: Ext.emptyFn,

     hazTransaccion: function (query, storeName, add, form){
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
    },

    aleatorio: function (inferior,superior){ 
        numPosibilidades = superior - inferior 
        aleat = Math.random() * numPosibilidades 
        aleat = Math.floor(aleat) 
        return parseInt(inferior) + aleat 
    },

    dame_color_aleatorio: function (){ 
        hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F") 
        color_aleatorio = "#"; 
        for (i=0;i<6;i++){ 
            posarray = this.aleatorio(0,hexadecimal.length) 
            color_aleatorio += hexadecimal[posarray] 
        } 
        return color_aleatorio 
    },

    launch:function(){
        var me = this;
        Ext.data.JsonP.request({
            url: 'http://192.168.15.8:88/iMobile/COK1_CL_Socio/ObtenerListaSocios',
            params:{
                CodigoUsuario: '1',
                CodigoSociedad: '001',
                CodigoDispositivo: '004',
                Token: "6VVcR7brnB4="
            },
            callbackKey: 'callback',
            success: function(result, request) {
                Ext.Array.each(result.Data,function(item,record, e){
                    console.log(item);
                    Ext.Array.each(item.Direcciones, function(direcciones,record,e){
                        var calle = direcciones.Calle,
                            colonia = direcciones.Colonia,
                            municipio = direcciones.Municipio,
                            cp = direcciones.CodigoPostal,
                            ciudad = direcciones.Ciudad,
                            estado = direcciones.Estado,
                            pais = direcciones.Pais,

                            query = "INSERT INTO DIRECCION (idCliente, calle, colonia, municipio, cp, ciudad, estado, pais)" +
                                " VALUES ('" + 1 + "', '" + calle + "', '" + colonia + "', '"+municipio+"', '"+cp+"','"+
                                ciudad+"','"+estado+"','"+pais+"')";
                        me.hazTransaccion(query, 'Direcciones', false);
                    });
                })
            }
        });


      //Ext.getStore("Productos").getModel().getProxy().dropTable();

    //Borramos datos de productos, clientes, órdenes y direcciones
/*      var query = "DELETE FROM PRODUCTO";
        this.hazTransaccion(query, 'Productos', false);

        query = "DELETE FROM CLIENTE";
        this.hazTransaccion(query, 'Clientes', false); */

        var query = "DELETE FROM ORDEN";
        this.hazTransaccion(query, 'Ordenes', false);

        query = "DELETE FROM DIRECCION";
        this.hazTransaccion(query, 'Direcciones', false);

        /*
        var query = "DELETE FROM DIRECCIONFISCAL";
        this.hazTransaccion(query, 'DireccionesFiscales', false); */

        //Ingresamos datos de productos y clientes

        if (true){
        
            for(var i = 0; i < 10; i++) {
                color = this.dame_color_aleatorio();
                query = "INSERT INTO PRODUCTO (code, description, cantidad, precio, moneda, descuento, precioConDescuento, " +
                    "totalDeImpuesto, importe, almacen, existencia, favorite, color) VALUES (" + i + ", '" + "Producto" + i + "'," +
                    1 + "," + (i+28.45) + "," + " 'pesos', " + (i +1 * .1) + "," + 23.25 + "," + 1.16 + "," + 5.25 + ", 'almacén', " + 
                    (i+10) + ", 'false', '" + color +"')";
                this.hazTransaccion(query, 'Productos', false);
                //alert(query);

            }

           /*for(var i = 0; i < 5; i++){
                query = "INSERT INTO CLIENTE (code, name, idFiscal, telefono, mail, precios, condicionCredito, saldo)" +
                " VALUES ('C00" + i + "', '" + "Pablito" + i + "', 'Fiscal00" + i + "', '5658111" + i + "', 'correo@mail.com'," +
                "'precios', 'condicion de crédito', 123.54)";
                this.hazTransaccion(query, 'Clientes', false);
                //alert(query);
            }*/

            for(var i = 0; i < 3; i++){
                query = "INSERT INTO DIRECCION (idCliente, calle, colonia, municipio, cp, ciudad, estado, pais)" +
                " VALUES ('" + 1 + "', '" + "Madero " + i + "', 'Presidentes " + i + "', 'Tlalpan', 12345," +
                "'Mexico', 'DF', 'Mexico')";
                this.hazTransaccion(query, 'Direcciones', false);
                //alert(query);
            } 

            /*for(var i = 0; i < 3; i++){
                query = "INSERT INTO DIRECCIONFISCAL (idCliente, calle, colonia, municipio, cp, ciudad, estado, pais)" +
                " VALUES ('" + 1 + "', '" + "Veracruz " + i + "', 'Verde Ayala " + i + "', 'Milpa Alta', 12345," +
                "'Mexico', 'DF', 'Mexico')";
                this.hazTransaccion(query, 'DireccionesFiscales', false);
                //alert(query);
        }*/
    }

        /*Ext.getStore('DireccionesFiscales').add({code:'e123', description:'descripcion'});
        Ext.getStore('DireccionesFiscales').sync();

        Ext.getStore('Ordenes').add({code:'e123', description:'descripcion'});
        Ext.getStore('Ordenes').sync();*/

        /*Ext.getStore('Direcciones').add({code:'e123', description:'descripcion'});
        Ext.getStore('Direcciones').sync();

        /*Ext.getStore('Clientes').add({code:'e123', description:'descripcion'});
        Ext.getStore('Clientes').sync();

        Ext.getStore('Productos').add({code:'e123', description:'descripcion'});
        Ext.getStore('Productos').sync();*/

/*        var store = Ext.getStore('Clientes');
        store.load();
        var c = store.getCount();*/
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