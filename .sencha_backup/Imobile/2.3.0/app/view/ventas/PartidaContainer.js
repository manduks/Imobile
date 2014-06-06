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
<<<<<<< HEAD
            xtype: 'ordenlist'/*,
=======
            style:{
                background: 'gray'
            },
            xtype: 'ordenlist',
            flex: 5/*,

>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
            layout: 'fit',
            items: [{
                docked: 'bottom',
                xtype: 'toolbar',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text:'Agregar Orden',
                    itemId: 'agregarOrden'
                }, {
                    xtype: 'spacer'
                }]
            }]*/
<<<<<<< HEAD
=======
        },{
            xtype: 'ordencontainer',
            flex: 1
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        }]
    }
});