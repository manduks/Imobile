/**
 * @class Imobile.view.cobranza.TotalAPagarContainer
 * @extends extendsClass
 * Description
 */
Ext.define('Imobile.view.cobranza.TotalAPagarContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'totalapagarcontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'vbox',
        //activeItem: 0,
        items: [{
            style:{
                background: 'gray'
            },
            xtype: 'totalapagarlist',
            flex: 5/*,

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
        },{
            xtype: 'totalescontainer',
            flex: 1
        },{
            html: 'Boton Terminar cobranza'
        }]
    }
});