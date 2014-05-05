/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 12:01
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Imobile.view.ventas.OpcionesOrdenPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'opcionesorden',
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',

        defaults: {
            styleHtmlContent: true
        },

        items: [
            {
                title: 'Productos',
                iconCls: 'team',
                //xtype: 'productoslist'
                xtype:'seleccionadorprofav'
            },
            {
                title: 'Cliente',
                iconCls: 'user',
                xtype: 'clientecontainer',                
            },
            {
                title: 'Editar Pedido',
                iconCls: 'bookmarks',
                xtype: 'editarpedidoform'
            },

            {
                title: 'Ordenar',
                iconCls: 'settings',
                xtype: 'partidacontainer'
            }
        ]
    }
});