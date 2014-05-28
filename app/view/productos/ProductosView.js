/**
 * @class Imobile.view.productos.ProductosView
 * @extends Ext.dataview.List
 * Esta es la lista para el panel de productos (los cuadritos de colores)
 */
Ext.define('Imobile.view.productos.ProductosView', {
    extend: 'Ext.dataview.DataView',
    xtype: 'productosview',

    config: {
        inline: true,
        padding: '10 10 10 17',        
        cls: 'dataview-inline',
        itemTpl: [
            '<tpl for=".">',
            '<div class= "ovalo"></div>',
            '<div class="product-list" style="background-color: {color}">',                
                '<div class="container"> ',
                    '{NombreArticulo}',
                //'<h2>{name}</h2>',
                '</div>',
            '</div>',
            '</tpl>',
            //'<div style="clear:both"></div>'
        ].join(''),
        //itemTpl: '<div class="img" style="background"></div>',
        //useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay productos con esos datos</div>',
        store: 'Productos',
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        }
    }
});