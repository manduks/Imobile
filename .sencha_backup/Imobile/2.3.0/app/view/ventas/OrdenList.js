Ext.define('Imobile.view.ventas.OrdenList', {
    extend: 'Ext.dataview.List',
    xtype: 'ordenlist',
    requires: [],
    config: {
        fullscreen: true,
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{code}</p>', '<span><b>{description}</b></span> </br>', '<span style="color: red;">Selected Quantity: <b>0</b></span>', '</div>'].join(''),
        store: 'Ordenes',
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay Productos en el Orden</div>'
    }
});