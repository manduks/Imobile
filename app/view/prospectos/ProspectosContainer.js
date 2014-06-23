/**
 * @class Imobile.view.prospectos.ProspectosContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('Imobile.view.prospectos.ProspectosContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'prospectoscontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'vbox',
        items: [{
            xtype: 'container',
            flex: 1,
            padding: '0 0 20 200',
                defaults: {
                    xtype: 'button',                    
                    flex: .5
                },
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'spacer',
                        docked: 'top',
                        padding: 5
                    },
                    {
                        itemId: 'agregar',
                        text: 'Agregar',
                        ui: 'confirm'
                    }
                ]
            },{
            xtype: 'prospectoslistcontainer',
            flex: 9
        }/*,{
            xtype: 'direccionescontainer',
            flex: 1.5
        }*/]
    }
});