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
            url: 'http://192.168.15.9:88/iMobile/COK1_CL_Catalogos/ObtenerListaMonedasiMobile',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }
        /*data: [
            {CodigoMoneda: '$', NombreMoneda: 'Peso Mexicano'},
            {CodigoMoneda: 'USD', NombreMoneda: 'Dólar Americano'},
            {CodigoMoneda: 'JPN', NombreMoneda: 'Yen Japonés'},
            {CodigoMoneda: '€', NombreMoneda: 'Euro'},
            {CodigoMoneda: 'Q', NombreMoneda: 'Quetzal Guatemalteco'}
        ]*/
    }
});