/**
 * @class Imobile.store.Favoritos
 * @extends Ext.data.Store
 * Este es el store para los favoritos
 */
Ext.define('Imobile.store.Favoritos', {
    extend: 'Ext.data.Store',
     requires:['Imobile.model.Producto', 'Ext.data.proxy.SQL'],

    config: {
         model:'Imobile.model.Producto',
         storeId: 'Favorites',
         //autoLoad:true,
         proxy: {
         	type: 'sql'
         },
    //      data:[
			{code:100101,description:'Mens Stripe Polo'},
            {code:100102,description:'Mens Solid Polo'},
            {code:100103,description:'Mens Ralp Laurent Suit'},
            {code:100103,description:'Men`s Levis Jean'}
    //      ]
    }
    
    Ext.getStore('Favorites').sync();

});