/**
 * @class Imobile.view.ventas.PartidaContainer
 * @extends extendsClass
 * Description
 */
Ext.define('Imobile.view.ventas.PartidaContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'partidacontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'fit',
        items: [{
            style:{
                background: 'gray'
            },
            xtype: 'ordenlist',
            flex: 7
        },{
            xtype: 'ordencontainer',
            flex: 1
        }]
    }
});