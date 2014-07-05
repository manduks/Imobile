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
                var me = this,
                    extraParams = store.getProxy().getExtraParams();
                me.params.auth_token = localStorage.getItem("Token");
                if (me.resetParams) {
                    store.getProxy().setExtraParams(me.params);
                    me.resetParams = false;
                } else {
                    store.getProxy().setExtraParams(me.mergePropertiesObject(extraParams, me.params));
                }
            }
        }
    },

    setParams: function (params, resetParams) {
        var me = this;

        params.Token = localStorage.getItem("Token");
        params.CodigoUsuario = localStorage.getItem("CodigoUsuario");
        params.CodigoSociedad = localStorage.getItem("CodigoSociedad");
        params.CodigoDispositivo = localStorage.getItem("CodigoDispositivo");
        params.Elementos = 50;

        me.params = params;
        me.resetParams = resetParams;
    },

    mergePropertiesObject: function (obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    },

    resetCurrentPage: function() {
        var me = this;
        me.currentPage = 1;
    }
});
