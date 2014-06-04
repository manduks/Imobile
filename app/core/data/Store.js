/**
 * @class Core.data.Store
 * @extends Ext.data.Store
 * store genereico para aplicacion
 */
Ext.define('Imobile.core.data.Store', {
    extend: 'Ext.data.Store',
    config: {
        autoLoad: false,
        listeners: {
            beforeload: function (store, operation, ops) {
                store.getProxy().setExtraParams({
                    Token: localStorage.getItem("Token"),
                    CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                    CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                    CodigoDispositivo: localStorage.getItem("CodigoDispositivo")
                });
            }
        }
    }
});
