/**
 * @class Imobile.view.ventas.PartidaContainer
 * @extends extendsClass
 * Description
 */
Ext.define('Imobile.view.ventas.PartidaContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'partidacontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'card',
        activeItem: 0,
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'segmentedbutton',
                items: [{
                    text: 'Orden',
                    itemId: 'listarOrden',
                    pressed: true,
                    handler: function(btn) {
                        btn.up('partidacontainer').setActiveItem(0);
                    }
                }, {
                    text: 'Cliente',
                    itemId: 'mostrarCliente',
                    handler: function(btn) {
                        btn.up('partidacontainer').setActiveItem(1);
                    }
                }]
            }, {
                xtype: 'spacer'
            }]
        }, {
            xtype: 'ordenlist',
            layout: 'fit',
            items: [{
                docked: 'bottom',
                xtype: 'toolbar',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text:'Agregar Orden'
                }, {
                    xtype: 'spacer'
                }]
            }]
        }, {
            xtype: 'component',
            html: 'datos del cliente'
        }]
    }
});