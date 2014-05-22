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
        /*proxy: {
            url: 'http://192.168.15.8:88/iMobile/COK1_CL_Socio/ObtenerListaSocios',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }*/
        data: [
            {CodigoSocio: 'C0077', NombreSocio: 'Pedro López López'},
            {CodigoSocio: 'C0069', NombreSocio: 'Pablo López López'},
            {CodigoSocio: 'C0071', NombreSocio: 'Jose López López'},
            {CodigoSocio: 'C0156', NombreSocio: 'Ramiro López López'},
            {CodigoSocio: 'C0141', NombreSocio: 'Roberto López López'}
        ]
    }
});