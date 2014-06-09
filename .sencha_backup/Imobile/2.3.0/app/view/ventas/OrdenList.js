Ext.define('Imobile.view.ventas.OrdenList', {
    extend: 'Ext.dataview.List',
    xtype: 'ordenlist',
    requires: [],
    config: {
<<<<<<< HEAD
        fullscreen: true,
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{code}</p>', '<span><b>{description}</b></span> </br>', '<span style="color: red;">Selected Quantity: <b>0</b></span>', '</div>'].join(''),
        store: 'Ordenes',
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay Productos en el Orden</div>'
=======
        itemCls: 'partida',
        itemTpl: ['<div>',
            '<span style="float: left; padding: 15px 0px 0px 10px;"><i class="fa fa-shopping-cart" style="font-size: 30px;"></i></span><span style="float: left; padding: 0 35px;" class="imobile-cliente-tpl">',
            '<p>{clienteId}</p>',
            '<p><b>{NombreArticulo}</b></p>',
            '<p style="color: red;">Quantity: <b>{cantidad}</b></p>',
            '</span>',
            '<span>',
            '<p>Precio: {precio}</p>',
            '<p>Disc: {descuento}</p>',
            '<p class="total-product"><b>Total: {importe}</b></p>',
            '</span></div>'].join(''),
        store: 'Ordenes',
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay Productos en el Orden</div>'
    },

    onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e); 
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    }
});