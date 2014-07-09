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
            type: 'string'
        },{
            name: 'precioConDescuento',
            type: 'double'
        },{
            name: 'totalDeImpuesto',
            type: 'double'
        },{
            name: 'importe',
            type: 'string'
        },{
            name: 'NombreAlmacen',
            type: 'string'
        },{
            name: 'Disponible',
            type: 'float',
            convert: function(Disponible){
                return parseFloat(Disponible).toFixed(2);
            }
        },{
            name: 'DesplegarEnPanel',
            type: 'boolean'            
        },{
            name: 'ListaPrecios',
            type: 'array'
        },{
            name: 'SujetoImpuesto',
            type: 'boolean'
        },{
            name: 'color',
            type: 'string'            
        },{
            name: 'Imagen',
            type: 'string',
            mapping: 'Imagen',
            convert: function(Imagen){                
                return 'http://ferman.ddns.net:88/' + Imagen;
                //return 'http://189.165.107.225:88/' + Imagen;
            }
        }]
    }
});