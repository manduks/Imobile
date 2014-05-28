/**
 * @class Imobile.model..Factura
 * @extends Ext.data.Model
 * El modelo de la factura
 */
Ext.define('Imobile.model.Factura', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'saldo',
            type: 'string'
        }, {
            name: 'fecha',
            type: 'string'
        },{
            name: 'vencimiento',
            type: 'string'
        }]
    }
});