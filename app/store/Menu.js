Ext.define('Imobile.store.Menu',{
    extend:'Ext.data.Store',
    requires:['Imobile.model.Menu'],
    config:{
        autoload: true,
        model:'Imobile.model.Menu',
        data: [
            {name: 'Ordenes de venta',  icon: 'resources/images/cart.png', action: 'venta'},
            {name: 'Definición de rutas y actividades',   icon: 'resources/images/cart.png', action: 'rutas'},
            {name: 'Cobranza', icon: 'resources/images/cart.png', action: 'cobranza'},
            {name: 'Informes', icon: 'resources/images/cart.png', action: 'informes'},
            {name: 'Información del sistema',   icon: 'resources/images/cart.png', action: 'sistema'},
            {name: 'Prospectos',   icon: 'resources/images/cart.png', action: 'prospectos'},
            {name: 'Salir',   icon: 'resources/images/cart.png', action: 'salir'}
        ]
    }
});
