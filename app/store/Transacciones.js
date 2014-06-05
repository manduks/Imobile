/**
 * @class Imobile.store.Productos
 * @extends Ext.data.Store
 * Este es el store para los productos
 */
Ext.define('Imobile.store.Transacciones', {
    extend: 'Imobile.core.data.Store',
    requires:['Imobile.model.Transaccion'],

    config: {
        model:'Imobile.model.Transaccion',
        proxy: {
            url: "http://25.15.241.121:88/iMobile/COK1_CL_Consultas/RegresarOrdenVentaAbiertaiMobile",
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'
            },
            extraParams:{
                format:'json'
            }
        }
    }
});