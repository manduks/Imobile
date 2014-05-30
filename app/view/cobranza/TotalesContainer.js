Ext.define('Imobile.view.cobranza.TotalesContainer', {
    extend: 'Ext.Container',
    xtype: 'totalescontainer',
    requires:['Ext.Label'],
    config: {
        layout: 'hbox',
        //itemCls: 'factura',
        items: [{   
            xtype: 'container',
            html: 'A cobrar', 
            flex: 1,
            itemId: 'aCobrar',
            style: {
                background: 'black',
                'color': 'yellow',
                'margin-right': '1px',
                'text-align': 'center',
                'font-weight':'bold',
                'vertical-align': 'middle'
            }
        },{
            xtype: 'container',
            html: 'Pagado',
            flex: 1,
            itemId: 'pagado',
/*            items:[{
                xtype: 'label',
                itemId: 'pagado',                
                //docked: 'bottom'
            }]*/
            style: {
                background: 'black',
                'color': 'green',
                'margin-right': '1px',
                'text-align': 'center',
                'font-weight':'bold'
            }
        },{
            xtype: 'container',
            html: 'Pendiente',
            flex: 1,
            itemId: 'pendiente',
            style: {
                background: 'black',
                'color': 'red',
                'margin-righ': '1px',
                'text-align': 'center',
                'font-weight':'bold'
            }
/*            items:[{
                xtype: 'label',
                itemId: 'pendiente'
                //docked: 'bottom'
            }]*/
        }]
    }
});