/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('APP.store.phone.ActividadesCalendario', {
    extend: 'APP.core.data.Store',
    //extend: 'Ext.data.Store',

    config: {
        model: 'APP.model.phone.ActividadCalendario',
        proxy: {
            url: "/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile",
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
        data: [{
            title: 'Senca Con Title',
            location: 'Austin, Texas',
            start: new Date(2014, 6, 23,11,0),
            end: new Date(2014, 6, 27,12,0)
        },{
            title: 'Senca Con Title 2',
            location: 'Austin, Texas',
            start: new Date(2014, 6, 23,12,0),
            end: new Date(2014, 6, 27,12,0)
        }]
    }
});