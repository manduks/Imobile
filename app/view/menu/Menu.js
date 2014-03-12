Ext.define('Imobile.view.menu.Menu', {
    extend: 'Ext.NavigationView',
    xtype: 'menu',
    requires: [
        'Ext.dataview.DataView'
    ],
    config: {
        navigationBar: {
            items:[
                {
                    xtype: 'button',
                    align: 'right',
                    text: 'Imobile'
                }
            ]
        },
        items: [
            {
                xtype: 'container',
                layout: 'fit',
                items: [
                    {
                        xtype: 'dataview',
                        scrollable: true,
                        padding: 20,
                        inline: true,
                        cls: 'dataview-inline',
                        store: 'Menu',
                        itemTpl: '<div style="width: 65px; height: 100px;"><img src="{icon}"/><br><span style="font-size: 10px;">{name}</span></div>'
                    }
                ]
            }
        ]
    }
});