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
        autoLoad:true,
        data:[
            {code:100101,description:'Mens Stripe Polo'},
            {code:100102,description:'Mens Solid Polo'},
            {code:100103,description:'Mens Ralp Laurent Suit'},
            {code:100103,description:'Men`s Levis Jean'}
        ]
    }
});