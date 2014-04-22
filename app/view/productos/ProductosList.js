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
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{code}</p>', '<span><b>{description}</b></span> </br>', '<span style="color: red;">Selected Quantity: <b>0</b></span>', '</div>'].join(''),
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
            }, {
                xtype: 'button',
                iconCls: 'add',
                itemId: 'agregar',
                flex: 1
                //text: 'Agregar +'
            }]
        // }, {
        //     xtype: 'toolbar',
        //     docked: 'top',
        //     items: [{
        //         xtype: 'spacer'
        //     },{
        //         xtype: 'segmentedbutton',
        //         items: [{
        //             text: 'Code'
        //         }, {
        //             text: 'Description'
        //         }, {
        //             text: 'UPC Code'
        //         }]
        //     },{
        //         xtype: 'spacer'
        //     }]
         }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    }
});