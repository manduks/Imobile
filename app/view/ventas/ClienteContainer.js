/**
 * @class Imobile.view.ventas.ClienteContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('Imobile.view.ventas.ClienteContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'clientecontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'vbox',
        items: [{
            xtype: 'clienteform',
            flex: 6            
        },{
            xtype: 'direccionescontainer',
            flex: 1.5
        },{
            xtype: 'container',
            flex: 1,
                defaults: {
                    xtype: 'button',
                    margin: 5,
                    flex: 1
                },
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'spacer',
                        docked: 'top',
                        padding: 5
                    },
                    {
                        itemId: 'guardar',
                        text: 'Guardar',
                        ui: 'confirm'
                    }
                ]
            }]
    }
});