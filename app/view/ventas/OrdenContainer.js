Ext.define('Imobile.view.ventas.OrdenContainer', {
    extend: 'Ext.Container',
    xtype: 'ordencontainer',
    config: {
        layout: 'hbox',
        style:{
            background: 'white'
        },
        items: [{
            xtype: 'container',
            html: 'Descuento',
            flex: 1
        },{
            xtype: 'container',
            html: 'Subtotal',
            flex: 1
        },{
            xtype: 'container',
            html: 'TAX',
            flex: 1
        },{
            xtype: 'container',
            html: 'TOTAL',
            flex: 1
        }]
    }
});