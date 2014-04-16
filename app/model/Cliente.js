/**
 * @class Imobile.model..Cliente
 * @extends Ext.data.Model
 * El modelo del cliente
 */
Ext.define('Imobile.model.Cliente', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'code',
            type: 'string'
        }, {
            name: 'name',
            type: 'string'
        }],
        
        proxy: {
            type: "sql"
        }
    }
});