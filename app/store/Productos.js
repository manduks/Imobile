/**
 * @class Imobile.store.Productos
 * @extends Ext.data.Store
 * Este es el store para los productos
 */
Ext.define('Imobile.store.Productos', {
    extend: 'Imobile.core.data.Store',    
    requires:['Imobile.model.Producto'],
    config: {
        model:'Imobile.model.Producto',        
        proxy: {
            url: 'http://ferman.ddns.net:88/iMobile/COK1_CL_Articulo/ObtenerListaArticulosiMobile',
            //url: 'http://25.15.241.121:88/iMobile/COK1_CL_Articulo/ObtenerListaArticulosiMobile',
                 
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'
            },
            extraParams:{
                format:'json'
            }
        }
    }

});