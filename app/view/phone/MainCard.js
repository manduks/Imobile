/**
 * @class Imobile.view.phone.Main
 * @extends Imobile.view.Main
 * La vista principal de nuestra version de telefono
 * @oswaldo@codetlan.com
 */

Ext.define('APP.view.phone.MainCard',{
    extend:'Ext.Panel',
    xtype:'maincard',
    config: {
        layout:'card',
        activeItem:0,
        items: [{
            xtype: 'menunav'
        },{
            xtype:'container',
            html:'navigationorden'
            //xtype: 'navigationorden'
        /*},{
            xtype: 'navigationcobranza'*/
        }]
    }
});