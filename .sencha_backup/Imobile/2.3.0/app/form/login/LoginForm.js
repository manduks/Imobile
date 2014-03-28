Ext.define('Imobile.form.login.LoginForm',{
    extend: 'Ext.form.Panel',
    xtype: 'loginform',
    requires:[
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password'
    ],
    config:{
        padding:'15 15 15 15',
        items:[
            {
                xtype:'fieldset',
                defaults:{
                    required:true,
                    clearIcon:true
                },
                items:[
                    {
                        xtype:'emailfield',
                        name:'email',
                        placeHolder:'Email',
                        value:'oswaldo@codetlan.com'
                    },{
                        xtype:'passwordfield',
                        name:'password',
                        placeHolder:'Password',
                        value:'12345678'
                    }
                ]
            },{
                xtype:'fieldset',
                items:[
                    {
                        xtype:'button',
                        text:'Login',
                        ui:'btn-login-ui',
                        handler:function(btn){
                            var form = btn.up('formpanel');
                            form.fireEvent('logged', form);
                        }
                    }

                ]

            }
        ]
    }

});