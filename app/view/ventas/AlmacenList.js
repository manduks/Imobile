/**
 * @class Imobile.view.ventas.MonedasList
 * @extends extendsClass
 * Description Lista de las monedas
 */
Ext.define('Imobile.view.ventas.AlmacenList', {
    extend: 'Ext.dataview.List',
    requires: [],
    xtype: 'almacenlist',
    config: {
        itemTpl: ['<div class="imobile-cliente-tpl">', '<span><p><b>{CodigoAlmacen}</b> {NombreAlmacen}</p></span>', '<i style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"></i></div>'].join(''),
        selectedCls: 'direc-selected'
        /*onItemDisclosure: function (record, listItem, index, e) {
         this.fireEvent("tap", record, listItem, index, e);
         },*/
    }
});