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
                    //xtype: 'container',
                    //items:[{
                        xtype: 'button',                    
                        //src: 'resources/images/iMobile.png',                        
                        align: 'right',
                        //height: 20,
                        //width: 100,
                        icon: 'resources/images/iMobilei.png'
                        //iconAlign: 'center'
                    //}]
                }]
        },
        items: [
            {
                xtype: 'menulist'
            }
        ]
    }
});