/**
 * @class Imobile.view.clientes.ClientesList
 * @extends Ext.dataview.List
 * Esta es la lista para listar clientes de la cartera
 */
Ext.define('Imobile.view.productos.ProductosList', {
    extend: 'Ext.dataview.List',
    xtype: 'productoslist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.MessageBox'],
    config: {
        indexBar: true,
        pinHeaders: false,
<<<<<<< HEAD
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{code}</p>', '<span><b>{description}</b></span> </br>', '<span style="color: red;">Selected Quantity: <b>0</b></span>', '</div>'].join(''),
=======
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{CodigoArticulo}</p>', '<span><b>{NombreArticulo}</b></span> </br>', '<span style="color: red;">Selected Quantity: <b>0</b></span>', '</div>'].join(''),
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        store: 'Productos',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay productos con esos datos</div>',
        disableSelection: true,
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'searchfield',
                itemId: 'busca',
                placeHolder: ' Buscar producto...',
                flex: 4
            }]
         }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    }
});