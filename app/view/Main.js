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
        'Imobile.view.configuracion.ConfiguracionContainer',
        'Imobile.view.favoritos.SeleccionadorProFav',
        'Imobile.form.productos.AgregarProductosForm',
        'Imobile.view.ventas.PartidaContainer',
        'Imobile.view.ventas.OpcionesOrdenPanel',
        'Imobile.form.clientes.ClienteForm',
        'Imobile.view.clientes.OpcionClienteList',
        'Imobile.view.ventas.OrdenList',
        'Imobile.view.productos.ProductosView',
        'Imobile.view.ventas.DireccionEntregaList',
        'Imobile.view.ventas.DireccionFiscalList',
        'Imobile.view.ventas.DireccionesContainer',
        'Imobile.view.ventas.DireccionEntregaContainer',
        'Imobile.view.ventas.DireccionFiscalContainer'
    ]
});
