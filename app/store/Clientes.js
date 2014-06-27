/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('Imobile.store.Clientes', {
    extend: 'Imobile.core.data.Store',
    requires: ['Imobile.model.Cliente'],

    config: {
        model: 'Imobile.model.Cliente',
        proxy: {
            //url: "http://ferman.no-ip.org:88/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile",
            url: "http://25.15.241.121:88/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile",
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