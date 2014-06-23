/**
 * @class Imobile.view.prospectos.ClientesList
 * @extends Ext.dataview.List
 * Esta es la lista para listar prospectos.
 */
Ext.define('Imobile.view.prospectos.ProspectosList', {
    extend: 'Ext.dataview.List',
    xtype: 'prospectoslist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.SegmentedButton'],
    config: {
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{CodigoSocio}</p>', '<span style="color: cadetblue;"><b>{NombreSocio}</b></span>', '</div>'].join(''),
        store: 'Prospectos',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay prospectos con esos datos</div>',
        disableSelection: true,
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'searchfield',
                itemId: 'buscarProspectos',
                placeHolder: ' Buscar prospecto...',
                flex: 8
            },{
                xtype: 'button',
                iconCls: 'search',
                itemId: 'btnBuscarProspectos',
                flex: 0.5
            }]
        }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true,
            loadMoreText: 'Ver Más...'
        }]
    }
});