/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Menu', {
    extend: 'Ext.app.Controller',
    config:{
        refs:{
            loginForm:'menunav menulist'
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
                break;
            case 'rutas':
                break;
            case 'cobranza':
                break;
            case 'informes':
                break;
            case 'configuracion':
                break;
            case 'prospectos':
                break;
            case 'favoritos':
                break;
            case 'salir':
                Ext.Viewport.removeAll(true);
                Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel'));
                break;

        }
    }
});