/**
 * @class Imobile.model.Total
 * @extends Ext.data.Model
 * El modelo del total para realizar el pago
 */
Ext.define('Imobile.model.Total', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'tipo',
            type: 'string'
        }, {
            name: 'monto',
            type: 'string'
        },{
            name: 'codigoFormaPago',
            type: 'string'
        },{
            name: 'NumeroCheque',
            type: 'string'
        },{
            name: 'NumeroCuenta',
            type: 'string'
        },{
            name: 'Banco',
            type: 'string'
        },{
            name: 'Fecha',
            type: 'string',
            convert: function(fechaPago){
                return Ext.Date.format(new Date(fechaPago), "d-m-Y");
            }
        },{
            name: 'NumeroAutorizacion',
            type: 'string'
        },{
            name: 'moneda',
            type: 'string'
        },{
            name: 'tipoFormaPago',
            type: 'string'
        }]
    }
});