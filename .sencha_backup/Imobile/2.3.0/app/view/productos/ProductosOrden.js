/**
 * @class Imobile.view.favoritos.SeleccionadorProFav
 * @extends Ext.Toolbar
 * Es un seleccionador para elegir productos o favoritos
 */
Ext.define('Imobile.view.productos.ProductosOrden', {
    extend: 'Imobile.view.favoritos.SeleccionadorProFav',
    xtype: 'productosorden',
    requires: ['Ext.Toolbar','Ext.SegmentedButton'],
    config: {
        layout: 'fit',
<<<<<<< HEAD
=======
        itemId: 'principal',
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        items:[{
            xtype:'toolbar',
            docked: 'top',
            items:[{
                xtype:'spacer'
            },{
                xtype:'segmentedbutton',
                items:[{
                    text:'Lista',
                    itemId: 'listaProductos',
                    pressed: true
                },{
                    text:'Panel',
                    itemId: 'panelProductos'
                }]
            },{
                xtype:'spacer'
            }]
        },{
            xtype:'productoslist'
            //html:'Lista de productos'
        }]
    }
});