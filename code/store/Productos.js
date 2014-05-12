/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('Imobile.store.Productos', {
    extend: 'Ext.data.Store',
    requires:['Imobile.model.Producto'],

    config: {
        model:'Imobile.model.Producto',
        autoLoad: true // Para que se cargue el store algunos datos
    }
});