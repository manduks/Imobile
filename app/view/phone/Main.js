/**
 * @class Imobile.view.phone.Main
 * @extends Imobile.view.Main
 * La vista principal de nuestra version de telefono
 * @oswaldo@codetlan.com
 */

Ext.define('APP.view.phone.Main',{
    extend:'Ext.Panel',
    xtype:'main',
    config: {
        layout:'card',
        activeItem:0,
        items: [{
            xtype: 'menunav'
        },{
            xtype: 'container',
            html:'hey'
        /*},{
            xtype: 'navigationcobranza'*/
        }]
    }
});