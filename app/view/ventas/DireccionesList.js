/**
 * @class Imobile.view.ventas.DireccionEnvioList
 * @extends extendsClass
 * Description Lista de las direcciones para los envíos de los clientes
 */
Ext.define('Imobile.view.ventas.DireccionEnvioList', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'direccionenviolist',
    config: { 
    	onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        itemTpl: '{title}'
    }