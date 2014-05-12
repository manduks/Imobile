/**
 * @class Imobile.view.configuracion.ConfiguracionContainer
 * @extends Ext.Container
 * Este es para las configuraciones de imobile
 */
Ext.define('Imobile.view.configuracion.ConfiguracionContainer', {
    extend: 'Ext.Container',
    requires:['Ext.Img','Ext.field.Select','Ext.field.Toggle'],

    xtype: 'configuracioncontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [ {
            xtype: 'fieldset',
            title: 'Imagen de la empresa',
            padding: 10,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [{xtype:'component'},{
                xtype: 'image',
                src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
                height: 64,
                width: 64
            },{xtype:'component'}]
        }, {
            xtype: 'formpanel',
            height:132,
            autoHeight:true,
            defaults:{
                labelWidth:'55%'
            },
            items: [{
                xtype: 'selectfield',
                name: 'idioma',
                label: 'Idioma',
                options:[{
                    text:'Español',
                    value : 'es'
                },{
                    text:'Inglés',
                    value : 'en'
                },{
                    text:'Portugués',
                    value : 'pes'
                }]
            },{
                xtype:'togglefield',
                label:'Opcion 1'
            },{
                xtype:'togglefield',
                label:'Opcion 2'
            }]
        }, {
            xtype: 'fieldset',
            padding: 10,
            docked:'bottom',
            items: [{
                xtype: 'button',
                itemId: 'guardar',
                iconCls: 'action',
                ui: 'confirm',
                text: 'Guardar Cambios'
            }]
        }]
    }
});