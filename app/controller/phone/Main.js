Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    config: {
        control: {}
    },
    onSelectMenu: function(view, index, target, record, eOpts) {
        console.log(record);
        var me = this,
            view = me.getMenu(),
            option = record.get('action');
        switch (option) {
            case 'sistema':
                view.push({
                    xtype:'configuracionlist',
//                    html: 'Configuremos la aplicacion'
                });
                break;

            case 'prospectos':
                view.push({
                    xtype: 'clienteslist'
                });
                break;
            case 'venta':
                view.push({
                    xtype: 'productoslist'
                });
                break;
            case 'salir':
                me.getMain().setActiveItem(0);
                break;
            case 'sincronizacion':
               view.push({
                    xtype:'sincronizarcontainer'
               });
                break;
            case 'servidor':
               view.push({
                    xtype:'servidorcontainer'
               });
                break;
            case 'inicializacion':
               view.push({
                    xtype:'initializecontainer'
               });
                break;
            case 'configuracion':
               view.push({
                    xtype:'configuracioncontainer'
               });
                break;
            default:
                view.push({
                    xtype: 'container',
                    html: 'Voy a modificar esta linea'
                });
                break;
        }
    }
});