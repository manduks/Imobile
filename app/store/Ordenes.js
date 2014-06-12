Ext.define('Imobile.store.Ordenes', {
    extend: 'Ext.data.Store',
    requires: ['Imobile.model.Orden'],
    config: {
        model: 'Imobile.model.Orden'
    }
});