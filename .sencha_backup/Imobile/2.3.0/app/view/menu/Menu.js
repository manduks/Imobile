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
<<<<<<< HEAD
                    text: 'Imobile'
                },
                {
                    text:'',
                    align: 'center'
                }
            ]
=======
                    iconCls: 'logo'
                }]
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        },
        items: [
            {
                xtype: 'menulist'
            }
        ]
    }
});