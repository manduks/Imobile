/**
 * @class Imobile.view.phone.Main
 * @extends Imobile.view.Main
 * La vista principal de nuestra version de telefono
 */
Ext.define('Imobile.view.phone.Main',{
    extend:'Imobile.view.Main',
    config: {
        layout:'card',
        activeItem:0,
        items: [{
            xtype:'loginform'
        },{
            xtype: 'menu'
        }]
    }
});