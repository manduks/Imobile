Ext.define('Imobile.store.Menu',{
    extend:'Ext.data.Store',
    requires:['Imobile.model.Menu'],
    config:{
        autoload: true,
        model:'Imobile.model.Menu',
        data: [
            {name: 'Ordenes de venta',  icon: 'resources/images/cart.png'},
            {name: 'Definición de rutas y actividades',   icon: 'resources/images/cart.png'},
            {name: 'Cobranza', icon: 'resources/images/cart.png'},
            {name: 'Informes', icon: 'resources/images/cart.png'},
            {name: 'Información del sistema',   icon: 'resources/images/cart.png'},
            {name: 'Prospectos',   icon: 'resources/images/cart.png'},
            {name: 'Salir',   icon: 'resources/images/cart.png'}
        ]
    }
});
