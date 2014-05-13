/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('Imobile.store.Clientes', {
    extend: 'Ext.data.Store',
    requires: ['Imobile.model.Cliente'],

    config: {
        model: 'Imobile.model.Cliente',
        autoLoad: true,
        proxy: {
            url: 'http://192.168.15.8:88/iMobile/COK1_CL_Socio/ObtenerListaSocios',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }
        //      data:[
        // {code:'C0077',name:'Pedro López López'},
        // {code:'C0069',name:'Pablo López López'},
        // {code:'C0071',name:'Jose López López'},
        // {code:'C0156',name:'Ramiro López López'},
        // {code:'C0141',name:'Roberto López López'},
        //      ]
    }
});