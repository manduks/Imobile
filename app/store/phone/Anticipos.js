/**
 * @class Imobile.store.Anticipos
 * @extends Ext.data.Store
 * Este es el store para los anticipos.
 */
Ext.define('APP.store.phone.Anticipos', {
    extend: 'APP.core.data.Store',
    //requires: ['APP.core.data.Store'],

    config: {
        model: 'APP.model.phone.Factura',
        proxy: {            
            url: "/iMobile/COK1_CL_Consultas/RegresarOrdenVentaAbiertaiMobile",            
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }
/*        data: [
            {id: '0001', fecha: '23-May-2014', saldo: 10000.00, vencimiento: '12-Dic-2014'},
            {id: '0002', fecha: '12-Abr-2014', saldo: 20000.00, vencimiento: '14-Jun-2014'},
            {id: '0003', fecha: '28-Ene-2014', saldo: 30000.00, vencimiento: '23-Jul-2014'},
            {id: '0004', fecha: '30-Mar-2013', saldo: 40000.00, vencimiento: '13-Ago-2014'},
            {id: '0005', fecha: '23-Oct-2013', saldo: 50000.00, vencimiento: '15-Dic-2014'}
        ]*/
    }
});