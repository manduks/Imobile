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
        layout: 'fit',
        items: [{
            xtype: 'direccioneslist'
        }]
    }
});