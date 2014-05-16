Ext.define('Imobile.view.menu.Menu', {
    extend: 'Ext.NavigationView',
    xtype: 'menu',
    requires: [
        'Imobile.view.menu.MenuList'
    ],
    config: {
        navigationBar: {            
            items:[
                /*{
                    xtype: 'button',
                    align: 'right',
                    iconCls: 'fa-circle',
                    text: 'offline'
                },*/
                {
                   xtype: 'image',
                    src: 'resources/images/iMobile.png',
                    align: 'right',
                    height: 20 
                }
                /*{
                    text:'',
                    align: 'center'
                }*/
            ]
        },
        items: [
            {
                xtype: 'menulist'

            }
        ]
    }
});