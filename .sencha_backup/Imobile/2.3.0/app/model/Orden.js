/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 13:54
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Imobile.model.Orden', {
    extend: 'Ext.data.Model',

     config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'clienteId',
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
        }],

        proxy: {
            type: "sql"
        }
    }
});