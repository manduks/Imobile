Ext.define('Imobile.profile.Tablet',{
    extend:'Ext.app.Profile',

    config:{
        name:'tablet',
        namespace:'tablet',
        controllers:['Main'],
        views:['Main']
    },

    isActive: function () {        
        return !Ext.os.is.Phone;        
    },

    launch: function(){
        Ext.Viewport.add(Ext.create('Imobile.view.tablet.Main'));
    }
});