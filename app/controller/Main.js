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

    onSelectMenu: function(){
        var me = this,
            view = me.getMenu();

        view.push({
            xtype: 'container',
            html: 'hola'
        });

    }

});