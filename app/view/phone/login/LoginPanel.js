/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.view.phone.login.LoginPanel',{
    extend:'Ext.Panel',
    xtype:'loginpanel',
    config: {
        layout:'fit',
        items: [{
            xtype: 'container',
            baseCls: 'login-background',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [{
                xtype: 'container'
            }, {
                xtype: 'loginform',
                baseCls: '',
                flex: 2
            }, {
                xtype: 'container'
            }]
        }]
    }
});