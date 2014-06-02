/**
 * @class Imobile.store.Productos
 * @extends Ext.data.Store
 * Este es el store para los productos
 */
Ext.define('Imobile.store.Transacciones', {
    extend: 'Ext.data.Store',
    requires:['Imobile.model.Transaccion'],

    config: {
        model:'Imobile.model.Transaccion',
        proxy: {
            //url: 'http://192.168.15.9:88//iMobile/COK1_CL_Articulo/ObtenerListaArticulosiMobile',
            url: "http://25.15.241.121:88/iMobile/COK1_CL_Consultas/RegresarOrdenVentaAbiertaiMobile",
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }
    }
});