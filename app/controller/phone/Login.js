/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginForm:'loginpanel loginform'
        },
        control: {
            'loginform button[action=login]': {
                tap: 'onLoginUser'
            }
        }
    },



    onLoginUser: function(btn){
        var form = this.getLoginForm(),
            values = form.getValues();

        localStorage.setItem("dirIP","values.servidor");

        Ext.Viewport.setMasked({xtype:'loadmask',message:'Accediendo'});

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_UsuarioiMobile/Login",
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
                    localStorage.setItem("NombreUsuario", response.Usuario.Nombre);
                    localStorage.setItem("Contrasenia", response.Usuario.Contrasenia);
                    localStorage.setItem("NombreDispositivo", response.ConfiguracionDispositivo.Nombre);
                    localStorage.setItem("Almacenes", response.ConfiguracionDispositivo.Almacenes);

                    Ext.Viewport.removeAll(true);
                    Ext.Viewport.add(Ext.create('APP.view.phone.menu.MenuNav'));

                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
                Ext.Viewport.setMasked(false);
            },
            failure:function(){
                Ext.Msg.alert('Problemas de conexión', 'No se puede encontrar el servidor',function(){Ext.Viewport.setMasked(false);});

            },
            scope:this
        });
    },

    addLogoutButton: function() {
        this.getNav().add({
            text: 'Logout'
        });
    }
});