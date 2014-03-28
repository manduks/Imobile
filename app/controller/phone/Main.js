Ext.define('Imobile.controller.phone.Main', {
    extend: 'Imobile.controller.Main',
    config: {
        control: {}
    },
    onSelectMenu: function(view, index, target, record, eOpts) {
        var me = this,
            view = me.getMenu(),
            option = record.get('action');
        switch (option) {
            case 'prospectos':
                view.push({
                    xtype: 'clienteslist'
                });
                break;
            default:
                view.push({
                    xtype: 'container',
                    html: option
                });
                break;
        }
    }
});