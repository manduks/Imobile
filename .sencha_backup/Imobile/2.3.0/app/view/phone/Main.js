    /**
 * @class Imobile.view.phone.Main
 * @extends Imobile.view.Main
 * La vista principal de nuestra version de telefono
 * @oswaldo@codetlan.com
 */

Ext.define('Imobile.view.phone.Main',{
    extend:'Imobile.view.Main',
    config: {
        layout:'card',
        activeItem:0,
        items: [{
            xtype: 'container',
            baseCls: 'login-background',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [{
                xtype: 'container'
            }, {
                xtype: 'loginform',
                baseCls: '',
                flex: 2
            }, {
                xtype: 'container'
            }]
        },{
<<<<<<< HEAD
            xtype: 'menu'
        },{
            xtype: 'navigationview',
            navigationBar: {
                items:[
                    {
                        xtype: 'button',
                        align: 'right',
                        text: 'Imobile'
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
=======
            xtype: 'menu'            
        },{
            xtype: 'navigationorden'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        }]
    }
});