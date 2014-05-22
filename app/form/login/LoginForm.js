Ext.define('Imobile.form.login.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',
    requires: ['Ext.form.FieldSet', 'Ext.field.Email', 'Ext.field.Password'],
    config: {
        padding: '15 15 15 15',
        defaults: {
            required: true,
            clearIcon: true
        },
        items: [{
            xtype: 'emailfield',
            name: 'email',
            placeHolder: 'Email',
            value: 'oswaldo@codetlan.com'
        }, {
            xtype: 'passwordfield',
            name: 'password',
            placeHolder: 'Password',
            value: '12345678'
        },  {
            xtype:'component',
            height:10
        }, {
            xtype: 'button',
            text: 'Login',
            ui: 'btn-login-ui',
            itemId: 'login',
            handler: function(btn) {
                var form = btn.up('formpanel');
                form.fireEvent('logged', form);
            }
        },  {
            xtype:'component',
            height:30
        },  {
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
        }]
    }
});