/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('APP.store.phone.RutasCalendario', {
    //extend: 'APP.core.data.Store',
    extend: 'Ext.data.Store',

    config: {
        model: 'APP.model.phone.RutaCalendario',
        data: [{
            event: 'Sencha Con',
            location: 'Austin, Texas',
            start: new Date(2014, 7, 26),
            end: new Date(2014, 7, 27)
        }]
    }
});