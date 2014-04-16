/**
 * @class Imobile.model..Cliente
 * @extends Ext.data.Model
 * El modelo del cliente
 */
Ext.define('Imobile.model.Producto', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'code',
            type: 'int'
        }, {
            name: 'description',
            type: 'string'
        },{
            name: 'favorite',
            type: 'boolean',
            defaultValue: false            
        }],

        proxy: {
            type: "sql"
        }
    }
});