/**
 * @class Imobile.view.ventas.TplDirecciones
 * @extends Ext.dataview.List
 * Esta es la lista para listar las direcciones
 */
Ext.define('Imobile.view.ventas.TplDirecciones', {
    extend: 'Ext.dataview.List',
    xtype: 'tpldirecciones',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.MessageBox'],
    config: {
        //indexBar: true,
        pinHeaders: false,
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{calle} {colonia} {municipio}</p>', '<span><b>{cp} {ciudad} {estado}</b></span> </br>', '<span style="color: red;">{pais} </span>', '</div>'].join(''),
        store: 'Direcciones',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay direcciones con esos datos</div>',
        disableSelection: true,
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    }
});