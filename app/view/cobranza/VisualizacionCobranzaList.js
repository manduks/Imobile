/**
 * @class Imobile.view.ventas.VisualizacionCobranzaList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('Imobile.view.cobranza.VisualizacionCobranzaList', {
    extend: 'Ext.dataview.List',
    xtype: 'visualizacioncobranzalist',
    config: {
        itemTpl: 'Folio: {NumeroDocumento} <br> Tipo de transacción: Cobranza de factura <br> Cliente: {CodigoSocio} {NombreCliente}', //{TipoTransaccion}',
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
                placeHolder: ' Buscar cobranza...'
            }]
        }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    }
});