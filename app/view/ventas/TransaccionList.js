/**
 * @class Imobile.view.ventas.DireccionesList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('Imobile.view.ventas.TransaccionList', {
    extend: 'Ext.dataview.List',
    xtype: 'transaccionlist',
    config: {
        itemTpl: 'Folio: {Folio} <br> Tipo de transacción: {TipoTransaccion}',
        store: 'Transacciones',
        /*data:[
            {folio: 'F001', transaccion: 'Ordenes de Venta', cliente: 'C091 Oswaldo Lopez'},
            {folio: 'F002', transaccion: 'Ordenes de Venta', cliente: 'C032 Ali Hernandez'}
        ],*/
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout:'fit',
            items: [{
                xtype: 'searchfield',
                itemId: 'busca',
                placeHolder: ' Buscar transaccion...'
            }]
        }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    }
});