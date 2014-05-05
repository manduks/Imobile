Ext.define('Imobile.view.menu.Menu', {
    extend: 'Ext.NavigationView',
    xtype: 'menu',
    requires: [
        'Imobile.view.menu.MenuList'
    ],
    config: {
        navigationBar: {            
            items:[
                {
                    xtype: 'button',
                    align: 'right',
                    text: 'Imobile'
                },
                {
                    text:'',
                    align: 'center'
                }
            ]
        },
        items: [
            {
                xtype: 'menulist'
            }
        ]
    }
});