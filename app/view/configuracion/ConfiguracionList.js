/**
 * @class Imobile.view.configuracion.ConfiguracionList
 * @extends Ext.dataview.List
 * Esta es la lista para listar clientes de la cartera
 */
Ext.define('Imobile.view.configuracion.ConfiguracionList', {
    extend: 'Ext.dataview.List',
    xtype: 'configuracionlist',
    //requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.SegmentedButton'],
    config: {
        //indexBar: true,
        //pinHeaders: false,
        // itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{code}</p>', '<span style="color: cadetblue;"><b>{name}</b></span>', '</div>'].join(''),
        // store: 'Clientes',
        //useSimpleItems: true,
        // emptyText: '<div style="margin-top: 20px; text-align: center">No hay clientes con esos datos</div>',
        //disableSelection: true,
        // onItemDisclosure: function (record, listItem, index, e) {
        //     this.fireEvent("tap", record, listItem, index, e);
        // },
        fullscreen: true,        
        itemTpl: '<i class="{icon}"> </i>{title}',
        data: [
            { title: 'Server Settings', action: 'servidor', icon: 'icon-cog-alt'},
            { title: 'Configuration', action: 'configuracion', icon: 'icon-wrench'},
            { title: 'Sync Settings', action: 'sincConfig', icon: 'icon-arrows-cw'},
            { title: 'Synchronize', action: 'sincronizacion', icon: 'icon-doc-text'}
        ]
        // plugins: [{
        //     xclass: 'Ext.plugin.ListPaging',
        //     autoPaging: true
        // }]
    }
});