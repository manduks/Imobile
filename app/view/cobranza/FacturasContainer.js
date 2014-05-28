/**
 * @class Imobile.view.cobranza.CobranzaContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('Imobile.view.cobranza.FacturasContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'facturascontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'vbox',
        items: [{
            xtype: 'facturaslist',
            flex: 5
        },{
            xtype: 'button',
            text: 'Aplicar pago',
            ui: 'confirm',
            margin: 10,            
        }]
    }
});