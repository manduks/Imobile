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
<<<<<<< HEAD
        cls: 'dataview-inline',
        itemTpl: [
            '<tpl for=".">',
            '<div class="product-list">',
            '{description}',
=======
        padding: '10 10 10 17',
        cls: 'dataview-inline',
        itemTpl: [
            '<tpl for=".">',
            '<div class="product-list" style="background-color: {color}">',
            '{NombreArticulo}',
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
            //'<h2>{name}</h2>',
            '</div>',
            '</tpl>'
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