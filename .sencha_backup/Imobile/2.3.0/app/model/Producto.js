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
<<<<<<< HEAD
            name: 'code',
            type: 'int'
        }, {
            name: 'description',
=======
            name: 'CodigoArticulo',
            type: 'string'
        }, {
            name: 'NombreArticulo',
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
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
<<<<<<< HEAD
            type: 'int'
        },{
            name: 'favorite',
            type: 'boolean',
            defaultValue: false
        }],

        proxy: {
            type: "sql"
        }
=======
            type: 'float'
        },{
            name: 'favorite',
            type: 'boolean',
            defaultValue: true
        },{
            name: 'color',
            type: 'string'
            //defaultValue: 'blue'
        }]
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    }
});