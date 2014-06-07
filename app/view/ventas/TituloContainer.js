/**
 * @class Imobile.view.ventas.TituloContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('Imobile.view.ventas.TituloContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'titulocontainer',
    config: {
        layout: 'fit',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [{
            xtype: 'toolbar',
            flex: 1,
            docked:'top',
            title: 'Aquí va el título'                
            },{
            xtype: 'opcionclientelist',
            flex: 7            
        }]
    }
});