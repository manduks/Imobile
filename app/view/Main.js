Ext.define('Imobile.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Imobile.form.login.LoginForm',
        'Imobile.view.menu.Menu',
        'Ext.TitleBar',
        'Imobile.view.clientes.ClientesList',
        'Imobile.view.productos.ProductosList',
        'Imobile.view.configuracion.ConfiguracionList',
        'Imobile.view.configuracion.SincronizarContainer',
        'Imobile.view.configuracion.ServidorContainer',
        'Imobile.view.configuracion.InitializeContainer',
        'Imobile.view.configuracion.ConfiguracionContainer'
    ]
});
