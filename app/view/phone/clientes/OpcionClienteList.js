/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.clientes.OpcionClienteList', {
    extend: 'Ext.dataview.List',
    xtype: 'opcionclientelist',    
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        itemTpl: '{title}',
        data:[
            {title: 'Orden de venta', action: 'orden'},
            {title: 'Visualizar transacciones', action: 'visualizar'}
        ]
    }
});