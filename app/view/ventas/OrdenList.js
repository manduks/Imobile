Ext.define('Imobile.view.ventas.OrdenList', {
    extend: 'Ext.dataview.List',
    xtype: 'ordenlist',
    requires: [],
    config: {
        itemCls: 'partida',
        itemTpl: ['<div>',
            '<span style="float: left; padding: 15px 0px 0px 10px;"><i class="fa fa-shopping-cart" style="font-size: 30px;"></i></span><span style="float: left; padding: 0 35px;" class="imobile-cliente-tpl">',
            '<p>{clienteId}</p>',
            '<p><b>{description}</b></p>',
            '<p style="color: red;">Quantity: <b>{cantidad}</b></p>',
            '</span>',
            '<span>',
            '<p>Precio: {precio}</p>',
            '<p>Disc: {descuento}</p>',
            '<p><b>Total: {importe}</b></p>',
            '</span></div>'].join(''),
        store: 'Ordenes',
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay Productos en el Orden</div>'
    }
});