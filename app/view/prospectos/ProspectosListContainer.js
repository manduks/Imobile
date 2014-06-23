/**
 * @class Imobile.view.prospectos.ProspectosListContainer
 * @extends extendsClass
 * Description
 */
Ext.define('Imobile.view.prospectos.ProspectosListContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'prospectoslistcontainer',
    config: {        
        layout: 'fit',
        items: [{
            xtype: 'prospectoslist'
        }]
    }
});