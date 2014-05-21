/**
 * @class Imobile.store.Productos
 * @extends Ext.data.Store
 * Este es el store para los productos
 */
Ext.define('Imobile.store.Productos', {
    extend: 'Ext.data.Store',
    requires:['Imobile.model.Producto'],

    config: {
        model:'Imobile.model.Producto',
        autoLoad: true,
        proxy: {
            url: 'http://192.168.15.8:88//iMobile/COK1_CL_Articulo/ObtenerListaArticulos',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        } // Para que se cargue el store algunos datos
        /*data: [
            {CodigoArticulo: 'C0077', NombreArticulo: 'Producto 1', favorite: true},
            {CodigoArticulo: 'C0069', NombreArticulo: 'Producto 2', favorite: false},
            {CodigoArticulo: 'C0071', NombreArticulo: 'Producto 3', favorite: true},
            {CodigoArticulo: 'C0156', NombreArticulo: 'Product 4', favorite: false},
            {CodigoArticulo: 'C0141', NombreArticulo: 'Producto 5', favorite: true}
        ]*/
    }
});