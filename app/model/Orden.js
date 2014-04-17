/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 13:54
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Imobile.model.Orden', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'code',
                type: 'int'
            }, {
                name: 'description',
                type: 'string'
            }
        ],
        proxy: {
            type: "sql"
        }
    }
});