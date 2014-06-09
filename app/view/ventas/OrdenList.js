Ext.define('Imobile.view.ventas.OrdenList', {
    extend: 'Ext.dataview.List',
    xtype: 'ordenlist',
    requires: [],
    config: {
        itemCls: 'partida',
        itemTpl: ['<div>',
            '<span style="float: left; padding: 15px 0px 0px 10px;"><i class="fa fa-shopping-cart" style="font-size: 30px;"></i></span>' +
            '<span style="float: left; padding: 0 35px; width: 145px;" class="imobile-cliente-tpl">',
            '<p style="margin: 0px;">{CodigoArticulo}</p>',
            '<p style="margin: 0px;"><b>{NombreArticulo}</b></p>',
            '<p style="margin: 0px; color: red;">Quantity: <b>{cantidad}</b></p>',
            '</span>',
            '<span>',
            '<p style="margin: 0px;">Precio: $ {Precio} </p>',
            '<p style="margin: 0px;">Disc: $ {descuento}</p>',
            '<p style="margin: 0px;" class="total-product"><b>Total: $ {importe}</b></p>',
            '</span></div>'].join(''),
        store: 'Ordenes',
        emptyText: '<div style="display: table; text-align: left; font-size: 10px; z-index: 0;">' +
            '<div style="display: table-row;">' +
            '<div id="cliente_id" style="display: table-cell;  padding-left: 10px; padding-right: 10px;">Transacción: Orden de Venta</div>' +
            '<div style="display: table-cell;  padding-left: 15px; padding-right: 5px;">Fecha: ' + Ext.DateExtras.dateFormat(new Date(), 'd/m/Y') +'</div>' +
            '</div>' +
            '<div style="display: table-row;">' +
            '<div id="codigo_id" style="display: table-cell;  padding-left: 10px; padding-right: 10px;">Código de Dispositivo: '+localStorage.getItem("CodigoDispositivo")+'</div>' +
            '<div style="display: table-cell;  padding-left: 15px; padding-right: 5px;">Código de Usuario: '+localStorage.getItem("CodigoUsuario")+'</div>' +
            '</div>' +
            '<div style="display: table-row;">' +
            '<div id="codigo_dispositivo" style="display: table-cell;  padding-left: 10px; padding-right: 10px;">Nombre de Dispositivo: '+localStorage.getItem("NombreDispositivo")+'</div>' +
            '<div style="display: table-cell;  padding-left: 15px; padding-right: 5px;">Nombre de Usuario: '+localStorage.getItem("NombreUsuario")+'</div>' +
            '</div>' +
            '</div>'
    },

    onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e); 
    }
});