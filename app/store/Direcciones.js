/**
 * @class Imobile.store.Direcciones
 * @extends Ext.data.Store
 * Este es el store para las direcciones
 */
Ext.define('Imobile.store.Direcciones', {
    extend: 'Ext.data.Store',
    requires:['Imobile.model.Direccion'],

    config: {
        model:'Imobile.model.Direccion',
        //autoLoad: true, // Para que se cargue el store algunos datos
        /*proxy: {
            url: 'http://192.168.15.8:88/iMobile/COK1_CL_UsuarioiMobile/Login',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'data'

            }
        }*/
    }
});