Ext.define('Imobile.view.ventas.OrdenContainer', {
    extend: 'Ext.Container',
    xtype: 'ordencontainer',
    config: {
<<<<<<< HEAD
        items: [{
            xtype: 'component',
            html: 'Transaction: Sale <br> POS Code: MP0S01'
=======
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
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        }]
    }
});