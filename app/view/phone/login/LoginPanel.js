/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.view.phone.login.LoginPanel',{
    extend:'Ext.Panel',
    xtype:'loginpanel',
    config: {
        layout:'card',
        activeItem:0,
        items: [{
            xtype:'container',
            baseCls: 'login-background',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[{
                xtype:'image',
                id:'configloginbutton',
                src:'resources/images/engine.png',
                margin:'10 10 0 0',
                height:30
            },{
                xtype:'container',
                flex:1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: 'container'
                },{
                    xtype: 'loginform',
                    baseCls: '',
                    flex: 3
                },{
                    xtype: 'container'
                }]
            }]

        },{
            xtype:'panel',
            html:'1111'
        }]
    }
});