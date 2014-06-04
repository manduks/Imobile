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
/*        proxy: {
            url: 'http://192.168.15.9:88//iMobile/COK1_CL_Articulo/ObtenerListaArticulosiMobile',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }*/
            data: [
            {CodigoArticulo: 'A010', NombreArticulo: 'Producto 1 con nombre muy, muy largo', DesplegarEnPanel: true, Precio: 3.5, descuento: 1, importe: 22, almacen: 22, existencia: 1, moneda: '$', totalDeImpuesto: 100 },
            {CodigoArticulo: 'P03', NombreArticulo: 'Producto 2', DesplegarEnPanel: false, Precio: 13.5, descuento: 4, importe: 34, almacen: 22, existencia: 4, moneda: '$', totalDeImpuesto: 140  },
            {CodigoArticulo: 'P02', NombreArticulo: 'Producto 3', DesplegarEnPanel: true, Precio: 13.5, descuento: 2, importe: 56, almacen: 22, existencia: 7, moneda: '$', totalDeImpuesto: 12  },
            {CodigoArticulo: 'P0156', NombreArticulo: 'Product 4', DesplegarEnPanel: false, Precio: 11.87, descuento: 3, importe: 67, almacen: 22, existencia: 8, moneda: '$', totalDeImpuesto: 12  },
            {CodigoArticulo: 'P0141', NombreArticulo: 'Producto 5', DesplegarEnPanel: true, Precio: 17.7, descuento: 5,  importe: 78, almacen: 22, existencia: 10, moneda: '$', totalDeImpuesto: 23  },
            {CodigoArticulo: 'P0128', NombreArticulo: 'Producto 6', DesplegarEnPanel: true, Precio: 16.5, descuento: .5,  importe: 78, almacen: 22, existencia: 10, moneda: '$', totalDeImpuesto: 23  }
            ]
        }
    //}
});