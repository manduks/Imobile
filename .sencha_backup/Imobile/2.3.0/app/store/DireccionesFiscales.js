/**
 * @class Imobile.store.DireccionesFiscales
 * @extends Ext.data.Store
 * Este es el store para las direcciones
 */
Ext.define('Imobile.store.DireccionesFiscales', {
    extend: 'Ext.data.Store',
    requires:['Imobile.model.Direccion'],

    config: {
        model:'Imobile.model.Direccion',
        autoLoad: true // Para que se cargue el store algunos datos
    }
});