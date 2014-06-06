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
<<<<<<< HEAD
            name: 'code',
            type: 'string'
        }, {
            name: 'name',
            type: 'string'
        },{
            name: 'idFiscal',
=======
            name: 'CodigoSocio',
            type: 'string'
        }, {
            name: 'NombreSocio',
            type: 'string'
        },{
            name: 'RFC',
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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
<<<<<<< HEAD
        }],
        
        proxy: {
            type: "sql"
        }
=======
        },{
            name: 'Direcciones',
            type: 'array'
        }]
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    }
});