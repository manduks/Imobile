Ext.define('Imobile.controller.Main', {
    extend: 'Ext.app.Controller',
    CodigoUsuario: undefined,
    CodigoSociedad: undefined,
    CodigoDispositivo: undefined,
    Contrasenia: undefined,
    Token: undefined,
    direccionEntrega: undefined,
    direccionFiscal: undefined,
    dirIP: '25.15.241.121:88',    

    config: {
        refs: {
            main: {
                selector: 'main'
            },
            menu: 'menu',
            opcionesOrden: 'opcionesorden',
            opcionCliente: 'opcionclientelist',
            seleccionadorProFav: 'seleccionadorprofav',
            direcciones: 'direccionescontainer',
            productosOrden: 'productosorden',
            productosView: 'productosview',
            navigationOrden: 'navigationorden',
            totales: 'totalescontainer',
            listaFacturas: 'facturaslist',
            ordenContainer: 'ordencontainer',
            partidaContainer: 'partidacontainer'

        },
        control: {
            'loginform': {
                logged: 'onLoginUser'
            },
            'menu dataview': {
                itemtap: 'onSelectMenu'
            },
            'main navigationview #agregarProductos': {
                tap: 'onAgregarPartida'
            },
            'navigationorden': {
                pop: 'onPopNavigationOrden',
                back: 'onBack'
            },
            'menu': {
                back: 'onBackMenu'
            }
        }
    },

    onLoginUser: function (form) {
        var me = this,
            values = form.getValues();

        Ext.data.JsonP.request({
            url: "http://" + me.dirIP + "/iMobile/COK1_CL_UsuarioiMobile/Login",
            params: {
                CodigoUsuario: values.usuario,
                CodigoSociedad: '001',
                CodigoDispositivo: '004',
                Contrasenia: values.password
            },
            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada

                if (procesada) {
                    localStorage.setItem("Token", response.Token);
                    localStorage.setItem("CodigoUsuario", response.Usuario.Codigo);
                    localStorage.setItem("CodigoSociedad", '001');
                    localStorage.setItem("CodigoDispositivo", '004');
                    localStorage.setItem("Contrasenia", response.Usuario.Contrasenia);

                    me.getMain().setActiveItem(1);

                    me.CodigoUsuario = localStorage.getItem("CodigoUsuario");
                    me.CodigoSociedad = localStorage.getItem("CodigoSociedad");
                    me.CodigoDispositivo = localStorage.getItem("CodigoDispositivo");
                    me.Contrasenia = localStorage.getItem("Contrasenia");
                    me.Token = localStorage.getItem("Token");

                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
            }
        });

    },

    onSelectMenu: Ext.emptyFn,

    aleatorio: function (inferior, superior) {
        var numPosibilidades = superior - inferior,
            aleat = Math.random() * numPosibilidades,
            aleat = Math.floor(aleat);

        return parseInt(inferior) + aleat;
    },

    dameColorAleatorio: function () {
        var hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"),
            color_aleatorio = "#",
            posarray;

        for (i = 0; i < 6; i++) {
            posarray = this.aleatorio(0, hexadecimal.length)
            color_aleatorio += hexadecimal[posarray]
        }
        return color_aleatorio
    },

    onBack: function (navigationview) {
        var me = this,
            view = me.getMain().getActiveItem(),
            itemActivo = navigationview.getActiveItem().getActiveItem();

        me.getPartidaContainer().down('list').emptyTextCmp.show()
        //console.log(itemActivo.isXType('clientecontainer'));

        /*        if(itemActivo.isXType('clientecontainer') || itemActivo.isXType('editarpedidoform')){
         navigationview.getActiveItem().setActiveItem(0);
         }*/

        if (itemActivo.isXType('partidacontainer') || itemActivo.isXType('clientecontainer') || itemActivo.isXType('editarpedidoform')) {
            navigationview.getActiveItem().setActiveItem(0);
            view.getNavigationBar().down('#agregarProductos').show();
        }
    },

    onBackMenu: function(){
        var me =this,
            store = Ext.getStore('Clientes'),

            params = {
                CodigoUsuario: me.CodigoUsuario,
                CodigoSociedad: me.CodigoSociedad,
                CodigoDispositivo: me.CodigoDispositivo,
                Token: me.Token
            };

        store.getProxy().setUrl("http://" + me.dirIP + "/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile");
        store.setParams(params);
        store.load();
    }

});