/**
 * @class Imobile.view.ventas.DireccionesList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('Imobile.view.ventas.DireccionesList', {
    extend: 'Ext.dataview.List',
    xtype: 'direccioneslist',
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },        
        itemTpl: '{title}',
        data:[
            {title: 'Dirección de entrega', action: 'entrega'},
            {title: 'Dirección fiscal', action: 'fiscal'}
        ]
    }
});