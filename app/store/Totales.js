/**
 * @class Imobile.store.Totales
 * @extends Ext.data.Store
 * Este es el store para los totales
 */
Ext.define('Imobile.store.Totales', {
    extend: 'Ext.data.Store',
    requires: ['Imobile.model.Total'],

    config: {
        model: 'Imobile.model.Total',
        autoLoad: true,
        /*proxy: {
            url: 'http://192.168.15.8:88/iMobile/COK1_CL_Catalogos/ObtenerListaMonedasMobile',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }*/       
    }
});