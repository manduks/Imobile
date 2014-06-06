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
            type: 'double'
        }]
    }
});