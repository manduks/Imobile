/**
 * @class Imobile.model..Cliente
 * @extends Ext.data.Model
 * El modelo del cliente
 */
Ext.define('Imobile.model.Cliente', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'code',
            type: 'string'
        }, {
            name: 'name',
            type: 'string'
        },{
            name: 'idFiscal',
            type: 'string'
        },{
            name: 'telefono',
            type: 'string'
        },{
            name: 'mail',
            type: 'string'
        },{
            name: 'precios',
            type: 'string'
        },{
            name: 'condicionCredito',
            type: 'string'
        },{
            name: 'saldo',
            type: 'double'
        }],
        
        proxy: {
            type: "sql"
        }
    }
});