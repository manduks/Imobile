/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('APP.store.phone.Clientes', {
    extend: 'APP.core.data.Store',
    //requires: ['Imobile.model.Cliente'],

    config: {
        model: 'APP.model.phone.Cliente',
        proxy: {
            url: "http://ferman.ddns.net:88/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile",
            //url: "http://25.15.241.121:88/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile",
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