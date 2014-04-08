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
 			// {code:'C0077',name:'Pedro López López'},
 			// {code:'C0069',name:'Pablo López López'},
 			// {code:'C0071',name:'Jose López López'},
 			// {code:'C0156',name:'Ramiro López López'},
 			// {code:'C0141',name:'Roberto López López'},
    //      ]
    }
    
    Ext.getStore('Favorites').sync();

});