/**
 * @class Imobile.view.cobranzas.FormaDePagosList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente al seleccionar las facturas a cobrar
 */
Ext.define('Imobile.view.cobranza.FormasDePagoList', {
    extend: 'Ext.dataview.List',
    xtype: 'formasdepagolist',
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        itemTpl: '{title}',
        data:[
            {title: 'Efectivo', action: 'efectivo'},
            {title: 'Tarjeta de Crédito', action: 'credito'},
            {title: 'Tarjeta de Regalo', action: 'regalo'}
        ]
    }
});