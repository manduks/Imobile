/**
 * @class Imobile.view.ventas.DireccionEntregaList
 * @extends extendsClass
 * Description Lista de las direcciones para los envíos de los clientes
 */
Ext.define('Imobile.view.ventas.DireccionEntregaList', {
    extend: 'Ext.dataView.List',
    requires: [],
    xtype: 'direccionentregalist',
    config: { 
    	itemTpl: '{title}',
    	onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        items:[{
        	xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'button',
                iconCls: 'add',
                itemId: 'agregar',
                flex: 1
                //text: 'Agregar +'
            }
        }]

    }