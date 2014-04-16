/**
 * @class Imobile.view.clientes.ClientesList
 * @extends Ext.dataview.List
 * Esta es la lista para listar clientes de la cartera
 */
Ext.define('Imobile.view.clientes.ClientesList', {
    extend: 'Ext.dataview.List',
    xtype: 'clienteslist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.SegmentedButton'],
    config: {
        indexBar: true,
        pinHeaders: false,
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{code}</p>', '<span style="color: cadetblue;"><b>{name}</b></span>', '</div>'].join(''),
        store: 'Clientes',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay clientes con esos datos</div>',
        disableSelection: true,
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout:'fit',
            items: [{
                xtype: 'searchfield',
                placeHolder: ' Buscar cliente...'
            }]
        }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    }
});