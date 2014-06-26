/**
 * @class Imobile.store.Prospectos
 * @extends Ext.data.Store
 * Este es el store para prospectos
 */
Ext.define('Imobile.store.Prospectos', {
    extend: 'Ext.data.Store',
    requires: ['Imobile.model.Prospecto'],

    config: {
        model: 'Imobile.model.Prospecto',
        autoLoad: true,
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

/*         data: [
            {fecha: 'hoy',  codigo: '1234', razonSocial: 'FMS'},
            {fecha: 'ayer',  codigo: '4321', razonSocial: 'ASDF'},
            {fecha: 'mañana',  codigo: '2467', razonSocial: 'TYE'}
        ]*/
    }
});