/**
 * @class Imobile.view.phone.Main
 * @extends Imobile.view.Main
 * La vista principal de nuestra version de telefono
 * @oswaldo@codetlan.com
 */

Ext.define('Imobile.view.phone.Main',{
    extend:'Imobile.view.Main',
    config: {
        layout:'card',
        activeItem:1,
        items: [{
            xtype:'loginform'
        },{
            xtype: 'menu'
        }]
    }
});