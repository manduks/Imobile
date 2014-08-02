/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginForm:'loginpanel loginform',
            servidorLogin:'loginpanel loginform textfield[name=servidor]',
            idiomaLogin:'loginpanel loginform textfield[name=idioma]',
            loginPanel:'loginpanel'
        },
        control: {
            'loginform button[action=login]': {
                tap: 'onLoginUser'
            },
            'loginpanel image[id=configloginbutton]':{
                tap:'showConfigOptions'
            }
        }
    },



    onLoginUser: function(btn){
        var form = this.getLoginForm(),
            almacenes,
            values = form.getValues();

        localStorage.setItem("dirIP",values.servidor);
        localStorage.setItem("idioma",values.idioma);

        Ext.Viewport.setMasked({xtype:'loadmask',message:'Accediendo'});

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_UsuarioiMobile/Login",
            params: {
                CodigoUsuario: values.usuario,
                CodigoSociedad: '001',
                CodigoDispositivo: '004',
                Contrasenia: values.password,
                idioma:values.idioma
            },
            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada

                if (procesada) {
                    localStorage.setItem("Token", response.Token);
                    localStorage.setItem("CodigoUsuario", response.Usuario.Codigo);
                    localStorage.setItem("CodigoSociedad", '001');
                    localStorage.setItem("CodigoDispositivo", '004');
                    localStorage.setItem("NombreUsuario", response.Usuario.Nombre);
                    localStorage.setItem("Contrasenia", response.Usuario.Contrasenia);
                    localStorage.setItem("NombreDispositivo", response.ConfiguracionDispositivo.Nombre);
                    //localStorage.setItem("Almacenes", response.ConfiguracionDispositivo.Almacenes);
                    //console.log(response.ConfiguracionDispositivo.Almacenes);
                    almacenes = response.ConfiguracionDispositivo.Almacenes;
                    Ext.Viewport.removeAll(true);
                    Ext.Viewport.add(Ext.create('APP.view.phone.MainCard'));
                    Ext.Viewport.getActiveItem().getAt(0).almacenes = almacenes;

                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
                Ext.Viewport.setMasked(false);
            },
            failure:function(){
                Ext.Msg.alert('Problemas de conexión', 'No se puede encontrar el servidor',function(){Ext.Viewport.setMasked(false);});
                Ext.Viewport.setMasked(false);
            },
            scope:this
        });
    },

    showConfigOptions:function(x){
        var form = this.getLoginForm(),
            server = this.getServidorLogin(),
            idioma = this.getIdiomaLogin();

        if(server.isHidden()){
            server.setHidden(false);
            idioma.setHidden(false);
        }
        else{
            server.setHidden(true);
            idioma.setHidden(true);
        }
    }


});