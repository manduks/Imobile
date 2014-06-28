/**
 * @class Imobile.model..Factura
 * @extends Ext.data.Model
 * El modelo de la factura
 */
Ext.define('Imobile.model.Factura', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'Folio',
            type: 'int'
        },{
            name: 'Saldo',
            type: 'float'
        }, {
            name: 'FechaCreacion',
            type: 'string',
            convert: function(fechaCreacion){
                return Ext.Date.format(new Date(fechaCreacion), "d-m-Y");
            }
        },{
            name: 'FechaFin',
            type: 'string',
            convert: function(fechaFin){
                return Ext.Date.format(new Date(fechaFin), "d-m-Y");
            }
        }]
    }
});