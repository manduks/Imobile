/**
 * @class Imobile.view.ventas.DireccionFiscalList
 * @extends Ext.dataview.List
 * Description Lista de las direcciones fiscales de los clientes
 */
Ext.define('Imobile.view.ventas.DireccionFiscalList', {
    extend: 'Ext.dataview.List',            
    requires: [],
    xtype: 'direccionfiscallist',
    config: { 
    	itemTpl: '{calle}, {colonia}',
        store: 'DireccionesFiscales',
    	onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
<<<<<<< HEAD
        },
=======
        }
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    }
});