/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Menu', {
    extend: 'Ext.app.Controller',
    config:{
        refs:{
            loginForm:'menunav menulist',
            menuNav:'menunav',
            clientesList:'clienteslist'
        },
        control:{
            'menunav': {
                back: 'onBackMenu'
            },

            'menunav menulist': {
                itemtap: 'onMenuTap'
            }

        }
    },
    onMenuTap:function(list,index,target,record){

        var action = record.data.action;
        var params= {
            Token: localStorage.getItem("Token"),
            CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo")
        };
        switch(action){
            case 'ordenes':
                this.getMenuNav().push({
                    xtype:'container',
                    layout:'fit',
                    id:'ordenescont',
                    items:[{
                        xtype: 'clienteslist',
                        title:'Ordenes'
                    }]

                });
                var store = Ext.getStore('Clientes');
                store.setParams(params);
                store.load();
                break;
            case 'rutas':
                this.getMenuNav().push({
                    xtype:'container',
                    layout:'fit',
                    id:'rutascont',
                    items:[{
                        xtype: 'clienteslist',
                        title:'Rutas'
                    }]
                });
                break;
            case 'cobranza':
                this.getMenuNav().push({
                    xtype:'container',
                    layout:'fit',
                    id:'cobranzacont',
                    items:[{
                        xtype: 'clienteslist',
                        title:'Cobranza'
                    }]

                });
                break;
            case 'informes':
                this.getMenuNav().push({
                    title:'informes',
                    html:'informes'
                });
                break;
            case 'configuracion':
                this.getMenuNav().push({
                    xtype:'configuracionpanel',
                    title:'Configuración'
                });
                break;
            case 'prospectos':
                this.getMenuNav().push({
                    xtype: 'prospectoslist',
                    title:'prospectos'              
                });
                break;
            case 'favoritos':
                this.getMenuNav().push({
                    title:'favoritos',
                    html:'favoritos'
                });
                break;
            case 'salir':
                Ext.Viewport.removeAll(true);
                Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel'));
                break;

        }
    },

    onBackMenu: function(navigationview){
        
        var me =this,
            store = this.getClientesList().getStore(),
            view = this.getMenuNav(),
            titulo,

            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token")
            };

        if( navigationview.getActiveItem().getId() == 'ordenescont' ||
            navigationview.getActiveItem().getId() == 'cobranzacont' ||
            navigationview.getActiveItem().getId() == 'rutascont'
        ){
            titulo = view.down('toolbar');

            view.remove(titulo, true);

            store.getProxy().setUrl("http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile");
            store.setParams(params);
            store.load();
        }
    }
});