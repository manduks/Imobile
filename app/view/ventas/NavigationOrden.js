Ext.define('Imobile.view.ventas.NavigationOrden', {
    extend: 'Ext.NavigationView',
    xtype: 'navigationorden',
    config: {
        navigationBar: {
            items:[
                {
                    xtype: 'button',
                    align: 'right',
                    iconCls: 'fa-circle',
                    text: 'offline'
                },
                {
                    xtype: 'button',
                    text:'Agregar',
                    align: 'left',
                    itemId: 'agregarProductos'
                }
            ]
        },
        items: [{
            xtype: 'opcionesorden'
        }]
    }
});