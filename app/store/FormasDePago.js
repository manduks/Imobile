/**
 * @class Imobile.store.FormasDePago
 * @extends Ext.data.Store
 * Este es el store para las formas de pago
 */
Ext.define('Imobile.store.FormasDePago', {
    extend: 'Imobile.core.data.Store',
    requires: ['Imobile.model.FormaDePago'],

    config: {
        model: 'Imobile.model.FormaDePago',
        autoLoad: true,
        proxy: {
            //url: 'http://192.168.15.8:88/iMobile/COK1_CL_Socio/ObtenerListaSocios',
            url: 'http://25.15.241.121:88/iMobile/COK1_CL_Catalogos/ObtenerFormasPagoiMobile',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'
            }
        }
    }
});