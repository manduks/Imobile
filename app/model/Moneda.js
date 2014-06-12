/**
 * @class Imobile.model.Moneda
 * @extends Ext.data.Model
 * El modelo de la moneda
 */
Ext.define('Imobile.model.Moneda', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'CodigoMoneda',
                type: 'string'
            },
            {
                name: 'NombreMoneda',
                type: 'string'
            },
            {
                name: 'Predeterminada',
                type: 'boolean'
            }
        ]
    }
});