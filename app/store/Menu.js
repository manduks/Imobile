Ext.define('Imobile.store.Menu',{
    extend:'Ext.data.Store',
    requires:['Imobile.model.Menu'],
    config:{
        autoload: true,
        model:'Imobile.model.Menu',
        data: [
            {name: 'Ordenes de venta',  icon: 'package.png', action: 'venta'},
            {name: 'Rutas y Actividades',   icon: 'map.png', action: 'rutas'},
            {name: 'Cobranza', icon: 'briefcase.png', action: 'cobranza'},
            {name: 'Informes', icon: 'graph.png', action: 'informes'},
            {name: 'Configuración',   icon: 'settings.png', action: 'sistema'},
            {name: 'Prospectos',   icon: 'man.png', action: 'prospectos'},
            {name: 'Favoritos',   icon: 'target.png', action: 'favoritos'},
            {name: 'Salir',   icon: 'browser.png', action: 'salir'}
        ]
    }
});
