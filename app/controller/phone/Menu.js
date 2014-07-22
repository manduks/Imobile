/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Menu', {
    extend: 'Ext.app.Controller',
    config:{
        refs:{
            loginForm:'menunav menulist',
            menuNav:'menunav'
        },
        control:{
            'menunav menulist': {
                itemtap: 'onMenuTap'
            }
        }
    },
    onMenuTap:function(list,index,target,record){

        var action = record.data.action;
        switch(action){
            case 'ordenes':
                this.getMenuNav().push({
                    title:'ordenes',
                    html:'ordenes'
                });
                break;
            case 'rutas':
                this.getMenuNav().push({
                    title:'rutas',
                    html:'rutas'
                });
                break;
            case 'cobranza':
                this.getMenuNav().push({
                    title:'cobranza',
                    html:'cobranza'
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
                    xtype:'configuracionpanel'
                });
                break;
            case 'prospectos':
                this.getMenuNav().push({
                    title:'prospectos',
                    html:'prospectos'
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
    }
});