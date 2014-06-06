Ext.define('Imobile.profile.Phone',{
    extend:'Ext.app.Profile',

    config:{
        name:'phone',
        namespace:'phone',
        controllers:['Main'],
        views:['Main']
    },

    isActive: function () {        
        return Ext.os.is.Phone;
    },

    launch: function(){
        Ext.Viewport.add(Ext.create('Imobile.view.phone.Main'));
    }
});