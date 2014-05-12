Ext.define('Imobile.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: {
                selector: 'main'
            }
        },
        control: {
            'loginform': {
                logged: 'onLoginUser'
            }
        },
        storesDefinition: ['Productios', 'Usuarios']
    },
    updateDataFromServer: function() {
        var me = this;
        Ext.each(me.getStoresDefinition(), function(item) {
            me.clearTable(item);
        });
        me.updateInformation(undefined, undefined, undefined, tablesArray, 0);
    },
    /**
     * Metodo para sincronizar la información de las tablas
     * @param  {Number} pagina
     * @param  {Number} paginasTotales
     * @param  {Object} query
     * @param  {Array} tablesArray
     * @param  {Number} tableIndex
     * @return
     */
    updateInformation: function(pagina, paginasTotales, query, tablesArray, tableIndex) {
        var me = this,
            pagina = pagina || 1,
            paginasTotales = paginasTotales || 0,
            query = query || me.makeQuery(tablesArray[tableIndex]),
            db = query.db,
            columns = query.columns,
            proxy = query.proxy;
        me.mask('Sincronizando ' + query.storeName + ' Paso ' + pagina + (paginasTotales ? ' de ' + paginasTotales : ' de ...'));
        Ext.data.JsonP.request({
            url: me.constructURL(query.storeName, pagina),
            callback: function(c, action) {
                action = Ext.decode(action);
                if (action.success === true) {
                    paginasTotales = action.paginas;
                    db.transaction(function(tx) {
                        Ext.each(action.data, function(item, index) {
                            tx.executeSql(query.query, proxy.getColumnValues(columns, item), function() {}, function() {
                                console.log(arguments);
                            });
                        });
                        me.unmask();
                        /**
                         * Recursión para cargar sincronizar todas las tablas
                         */
                        //cargamos recursivamente hasta que se carguen todas las paginas de caad tabla
                        if (pagina < paginasTotales) {
                            me.updateInformation(pagina + 1, paginasTotales, query, tablesArray, tableIndex);
                        } else {
                            //cambiamos de tabla y la cargamos nuevamente 
                            localStorage.setItem(query.storeName + 'TotalPages', paginasTotales);
                            tableIndex++;
                            if (tablesArray.length > tableIndex) {
                                me.updateInformation(undefined, undefined, undefined, tablesArray, tableIndex);
                            } else {
                                //cargamos todos los stores una vez que concluyo la sincronización
                                Ext.each(tablesArray, function(item) {
                                    Ext.getStore(item).load();
                                });
                            }
                        }
                    });
                } else {
                    Ext.Msg.alert('Error', action.error);
                    me.unmask();
                }
            }
        });
    },
    constructURL: function(tabla, pagina) {
        tabla = tabla.toLowerCase();
        return Ext.String.format('{0}/{1}/{2}/{3}', localStorage.getItem('url'), tabla, localStorage.getItem('imobile_token'), pagina);
    },
    makeQuery: function(storeName) {
        var me = this,
            store = Ext.getStore(storeName),
            proxy = store.getModel().getProxy(),
            table = proxy.getTable(),
            columns = proxy.getColumns(),
            tmp = [],
            placeholders,
            query;
        columns.push('id');
        for (i = 0, ln = columns.length; i < ln; i++) {
            tmp.push('?');
        }
        placeholders = tmp.join(', ');
        query = 'INSERT INTO ' + table + ' (' + columns.join(', ') + ') VALUES (' + placeholders + ')';
        return {
            query: query,
            proxy: proxy,
            store: store,
            columns: columns,
            storeName: storeName,
            db: proxy.getDatabaseObject()
        };
    },
    logoutUser: function(btn) {
        var me = this;
        localStorage.removeItem('imobile_token');
         Ext.each(me.getStoresDefinition(), function(item) {
            me.dropTable(item);
        });
        this.getMain().setActiveItem(0);
    },
    clearTable: function(store) {
        var me = this,
            store = Ext.getStore(store),
            proxy = store.getModel().getProxy(),
            table = proxy.getTable();
        proxy.getDatabaseObject().transaction(function(tx) {
            tx.executeSql('DELETE FROM ' + table + ' WHERE id > ?', [0]);
        });
    },
    dropTable: function(store) {
        Ext.getStore(store).getModel().getProxy().dropTable();
    }
});