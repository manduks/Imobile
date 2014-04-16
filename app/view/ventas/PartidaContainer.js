/**
 * @class Imobile.view.ventas.PartidaContainer
 * @extends extendsClass
 * Description
 */
Ext.define('Imobile.view.ventas.PartidaContainer', {
    extend: 'Ext.Contianer',
    requires: [],
    xtype: 'partidacontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'card',
        activeItem:0,
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'segmentedbutton',
                items: [{
                    text: 'Orden',
                    itemId: 'listarOrden',
                    pressed: true
                }, {
                    text: 'Cliente',
                    itemId: 'mostrarCliente'
                }]
            }, {
                xtype: 'spacer'
            }]
        }, {
            xtype: 'productoslist',
            //html:'Lista de productos'
        },{
        	xtype:'component',
        	html:'datos del cliente'
        }]
    }
});