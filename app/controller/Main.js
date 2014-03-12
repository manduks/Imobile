Ext.define('Imobile.controller.Main',{
    extend:'Ext.app.Controller',

    config:{
        refs:{
            main:{
                selector:'main'
            },
            menu: 'menu'
        },
        control:{
            'loginform':{
                logged: 'onLoginUser'
            },
            'menu dataview':{
                select: 'onSelectMenu'
            }
        }
    },

    onLoginUser:function(form,token){
        this.getMain().setActiveItem(1);
    },

    onSelectMenu: function(t, record, eOpts){
        var me = this,
            view = me.getMenu(),
            option = record.get('action');

        view.push({
            xtype: 'container',
            html: option
        });

    }

});