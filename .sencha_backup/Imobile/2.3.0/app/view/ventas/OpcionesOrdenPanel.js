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
<<<<<<< HEAD
            styleHtmlContent: true
        },
        items: [
            {
                title: 'Ordenar',
                iconCls: 'settings',
                xtype: 'partidacontainer'
            }/*,
            {
                title: 'Productos',
                iconCls: 'team',
                xtype: 'seleccionadorprofav'
            }*/,
=======
            styleHtmlContent: true,
            background: '#000'
        },
        items: [
            {
                title: 'Orden',
                iconCls: 'settings',
                xtype: 'partidacontainer'
            },
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
            {
                title: 'Cliente',
                iconCls: 'user',
                xtype: 'clientecontainer'
            },
            {
<<<<<<< HEAD
                title: 'Editar Pedido',
                iconCls: 'bookmarks',
=======

                title: 'Editar',
                iconCls: 'fa fa-pencil-square-o',
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                xtype: 'editarpedidoform'
            },

            {
<<<<<<< HEAD
                title: 'Eliminar Orden',
                iconCls: 'remove',
                itemId: 'eliminar'                
=======
                title: 'Eliminar',
                iconCls: 'fa fa-times',                
                itemId: 'eliminar'
            },
            {
                title: 'Terminar',
                iconCls: 'action',
                itemId: 'terminar'

>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
            }
        ]
    }
});