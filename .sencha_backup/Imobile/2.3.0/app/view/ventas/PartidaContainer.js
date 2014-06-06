/**
 * @class Imobile.view.ventas.PartidaContainer
 * @extends extendsClass
 * Description
 */
Ext.define('Imobile.view.ventas.PartidaContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'partidacontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'card',
        activeItem: 0,
        items: [{
            xtype: 'ordenlist'/*,
            layout: 'fit',
            items: [{
                docked: 'bottom',
                xtype: 'toolbar',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text:'Agregar Orden',
                    itemId: 'agregarOrden'
                }, {
                    xtype: 'spacer'
                }]
            }]*/
        }]
    }
});