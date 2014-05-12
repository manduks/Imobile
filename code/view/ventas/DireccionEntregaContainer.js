/**
 * @class Imobile.view.ventas.DireccionEntregaContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('Imobile.view.ventas.DireccionEntregaContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'direccionentregacontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'fit',
        items: [{
            xtype: 'direccionentregalist'            
        }]
    }
});