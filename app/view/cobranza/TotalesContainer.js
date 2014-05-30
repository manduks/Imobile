Ext.define('Imobile.view.cobranza.TotalesContainer', {
    extend: 'Ext.Container',
    xtype: 'totalescontainer',
    config: {
        layout: 'hbox',
        //itemCls: 'factura',
        items: [{
            xtype: 'container',
            html: 'A cobrar',
            flex: 1
        },{
            xtype: 'container',
            html: 'Pagado',
            flex: 1
        },{
            xtype: 'container',
            html: 'Pendiente',
            flex: 1
        }]
    }
});