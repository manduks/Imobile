/**
 * @class Imobile.view.ventas.DireccionesContainer
 * @extends extendsClass
 * Description
 */
Ext.define('Imobile.view.ventas.DireccionesContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'direccionescontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'vbox',
        items: [{
            xtype: 'button',
            margin: '10 10 5 200',
            text: 'Agregar',
            itemId: 'agregar',
            handler: function(btn) {
                        btn.up('menu').push({
                    xtype: 'clienteForm'                    
                });
            },
            flex: .5
        }, {
            xtype: 'checkboxfield',
            itemId: 'entrega',
            name: 'entrega',
            label: 'Dirección de entrega',
            labelWidth:'85%',
            margin: '5 25 0 0',
            flex: 1
        }, {            
            xtype: 'direccionentregacontainer',
            flex: 3
            //layout: 'fit'
        }, {
            xtype: 'checkboxfield',
            itemId: 'fiscal',
            name: 'fiscal',
            label: 'Dirección fiscal',
            labelWidth:'85%',
            margin: '5 25 0 0',
            flex: 1
        },{
            xtype: 'direccionfiscalcontainer',            
            flex: 4
        }]
    }
});