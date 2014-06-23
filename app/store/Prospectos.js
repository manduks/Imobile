/**
 * @class Imobile.store.Prospectos
 * @extends Ext.data.Store
 * Este es el store para prospectos
 */
Ext.define('Imobile.store.Prospectos', {
    extend: 'Imobile.core.data.Store',
    requires: ['Imobile.model.Prospecto'],

    config: {
        model: 'Imobile.model.Prospecto',
/*        proxy: {
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
        }*/
    }
});