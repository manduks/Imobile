Ext.define('Imobile.form.cobranza.MontoAPagarForm', {
    extend: 'Ext.form.Panel',
    xtype: 'montoapagarform',
    //requires: ['Ext.form.FieldSet', 'Ext.field.Email', 'Ext.field.Password'],
    config: {
        padding: '15 15 15 15',
/*        defaults: {
            required: true,
            clearIcon: true
        },*/
        //centered: true,
        items: [{
            xtype: 'fieldset',
            title: 'Title',
            items:[{
                xtype: 'numberfield',
                name: 'monto',
                placeHolder: 'Ingrese el monto a pagar',
                label: 'Monto'
            }]
        },{
            xtype:'component',
            height:10
        }, {
            xtype: 'button',
            text: 'Pagar',
            ui: 'action',
            itemId: 'pagar',
        },  {
            xtype:'component',
            height:30
        }/*,  {
            xtype:'component',
            cls:'imobile-version',
            html:'Versión 1.0'
        }, {
            xtype:'component',
            height:20
        },  {
            xtype:'component',
            cls:'imobile-version',
            html:'<i class="icon-help-circled"></i>'
        }*/]
    }
});