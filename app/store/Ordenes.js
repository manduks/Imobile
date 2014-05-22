Ext.define('Imobile.store.Ordenes', {
    extend: 'Ext.data.Store',
    requires: ['Imobile.model.Orden'],
    config: {
        model: 'Imobile.model.Orden',
        autoload: true
        /*data: [
            {clienteId: 'C0077', code: 'Producto 1', description:'prueba1', precio: 100},
            {clienteId: 'C0069', code: 'Producto 2', description: 'prueba2', precio: 130},
            {clienteId: 'C0071', code: 'Producto 3', description: 'prueba3', precio: 110},
            {clienteId: 'C0156', code: 'Product 4', description: 'prueba4', precio: 90},
            {clienteId: 'C0141', code: 'Producto 5', description: 'prueba5', precio: 80}
        ]*/
    }
});