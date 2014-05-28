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
            url: 'http://192.168.15.9:88//iMobile/COK1_CL_Articulo/ObtenerListaArticulosiMobile',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }

/*        data: [
            {CodigoArticulo: 'P0077', NombreArticulo: 'Producto 1 con nombre muy, muy largo', favorite: true, cantidad: 10, precio: 23.5, descuento: 23.5, precioConDescuento: 21, importe: 22, almacen: 22, existencia: 1, moneda: 'pesos', totalDeImpuesto: 100 },
            {CodigoArticulo: 'P0069', NombreArticulo: 'Producto 2', favorite: false, cantidad: 20, precio: 13.5, descuento: 23.5, precioConDescuento: 14, importe: 34, almacen: 22, existencia: 4, moneda: 'pesos', totalDeImpuesto: 140  },
            {CodigoArticulo: 'P0071', NombreArticulo: 'Producto 3', favorite: true, cantidad: 30, precio: 13.5, descuento: 23.5, precioConDescuento: 12, importe: 56, almacen: 22, existencia: 7, moneda: 'pesos', totalDeImpuesto: 12  },
            {CodigoArticulo: 'P0156', NombreArticulo: 'Product 4', favorite: false, cantidad: 40, precio: 11.87, descuento: 23.5, precioConDescuento: 13, importe: 67, almacen: 22, existencia: 8, moneda: 'pesos', totalDeImpuesto: 12  },
            {CodigoArticulo: 'P0141', NombreArticulo: 'Producto 5', favorite: true, cantidad: 50, precio: 17.7, descuento: 23.5, precioConDescuento: 15, importe: 78, almacen: 22, existencia: 10, moneda: 'pesos', totalDeImpuesto: 23  },
            {CodigoArticulo: 'P0128', NombreArticulo: 'Producto 6', favorite: true, cantidad: 60, precio: 16.5, descuento: 8.5, precioConDescuento: 8.5, importe: 78, almacen: 22, existencia: 10, moneda: 'pesos', totalDeImpuesto: 23  }
        ]*/
    }
});