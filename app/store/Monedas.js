/**
 * @class Imobile.store.Monedas
 * @extends Ext.data.Store
 * Este es el store para las monedas
 */
Ext.define('Imobile.store.Monedas', {
    extend: 'Imobile.core.data.Store',
    requires: ['Imobile.model.Moneda'],

    config: {
        model: 'Imobile.model.Moneda',
        proxy: {
            url: 'http://25.15.241.121:88/iMobile/COK1_CL_Catalogos/ObtenerListaMonedasiMobile',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            },
            extraParams: {
                type: 'json'
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