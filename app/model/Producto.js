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
            name: 'CodigoArticulo',
            type: 'string'
        }, {
            name: 'NombreArticulo',
            type: 'string'
        },{
            name: 'cantidad',
            type: 'float',
            defaultValue: 0
        },{
            name: 'Precio',
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
            type: 'float'
        },{
            name: 'DesplegarEnPanel',
            type: 'boolean',
            //defaultValue: true
        },{
            name: 'color',
            type: 'string'
            //defaultValue: 'blue'
        }]
    }
});