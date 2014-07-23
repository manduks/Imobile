/**
 * @class Imobile.model..Cliente
 * @extends Ext.data.Model
 * El modelo del cliente
 */
Ext.define('APP.model.phone.Cliente', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'CodigoSocio',
                type: 'string'
            },
            {
                name: 'NombreSocio',
                type: 'string'
            },
            {
                name: 'RFC',
                type: 'string'
            },
            {
                name: 'Telefono',
                type: 'string'
            },
            {
                name: 'Correo',
                type: 'string'
            },
            {
                name: 'ListaPrecios',
                type: 'string'
            },
            {
                name: 'LimiteCredito',
                type: 'string'
            },
            {
                name: 'Saldo',
                type: 'double'
            },
            {
                name: 'Direcciones',
                type: 'array'
            },
            {
                name: 'CodigoVendedor',
                type: 'string'
            },
            {
                name: 'CondicionPago',
                type: 'string'
            },
            {
                name: 'NombreListaPrecio',
                type: 'string'
            },
            {
                name: 'CodigoMoneda',
                type: 'string'
            }
        ]
    }
});