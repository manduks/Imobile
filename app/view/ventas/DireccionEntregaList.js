/**
 * @class Imobile.view.ventas.DireccionEntregaList
 * @extends extendsClass
 * Description Lista de las direcciones para los envíos de los clientes
 */
Ext.define('Imobile.view.ventas.DireccionEntregaList', {
    extend: 'Ext.dataview.List',            
    requires: [],
    xtype: 'direccionentregalist',
    config: { 
    	itemTpl: '{calle}, {colonia}',
        store: 'Direcciones',        
    	/*onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },*/
    }
});