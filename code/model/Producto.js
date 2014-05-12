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
            name: 'cantidad',
            type: 'int'
        },{
            name: 'precio',
            type: 'double'
        },{
            name: 'moneda',
            type: 'string'
        },{
            name: 'descuento',
            type: 'double'
        },{
            name: 'precioConDescuento',
            type: 'double'
        },{
            name: 'totalDeImpuesto',
            type: 'double'
        },{
            name: 'importe',
            type: 'double'
        },{
            name: 'almacen',
            type: 'string'
        },{
            name: 'existencia',
            type: 'int'
        },{
            name: 'favorite',
            type: 'boolean',
            defaultValue: false
        },{
            name: 'color',
            type: 'string'
        }]
    }
});