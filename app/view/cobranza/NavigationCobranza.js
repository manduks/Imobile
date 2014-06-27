Ext.define('Imobile.view.cobranza.NavigationCobranza', {
    extend: 'Ext.NavigationView',
    xtype: 'navigationcobranza',
    config: {
        navigationBar: {
            items:[
                {
                    xtype: 'button',
                    align: 'right',
                    iconCls: 'logo'
                },
                {
                    xtype: 'button',
                    text:'Agregar',
                    align: 'left',
                    itemId: 'agregarPago'
                }
            ]
        },

        items: [{
            xtype: 'totalapagarcontainer'
        }]
    }
});