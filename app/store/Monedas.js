/**
 * @class Imobile.store.Monedas
 * @extends Ext.data.Store
 * Este es el store para las monedas
 */
Ext.define('Imobile.store.Monedas', {
    extend: 'Ext.data.Store',
    requires: ['Imobile.model.Moneda'],

    config: {
        model: 'Imobile.model.Moneda',
        autoLoad: true,
        proxy: {
            url: 'http://192.168.15.8:88/iMobile/COK1_CL_Catalogos/ObtenerListaMonedasMobile',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }
    }
});