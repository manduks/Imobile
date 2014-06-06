/**
 * @class Imobile.view.ventas.MonedasList
 * @extends extendsClass
 * Description Lista de las monedas
 */
Ext.define('Imobile.view.ventas.MonedasList', {
    extend: 'Ext.dataview.List',            
    requires: [],
    xtype: 'monedaslist',
    config: {     	
         itemTpl: ['<div class="imobile-cliente-tpl">', '<span><p><b>{CodigoMoneda}</b> {NombreMoneda}</p></span>', '<i style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"></i></div>'].join(''),
        store: 'Monedas',
        selectedCls: 'direc-selected'
    	/*onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },*/
    }
});