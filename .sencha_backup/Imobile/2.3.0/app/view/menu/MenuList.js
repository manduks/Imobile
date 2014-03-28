/**
 * @class Imobile.view.menu.MenuList
 * @extends Ext.dataview.DataView
 * El dataview para llevar el control del menu
 */
Ext.define('Imobile.view.menu.MenuList', {
    extend: 'Ext.dataview.DataView',
    xtype:'menulist',
    config: {
        scrollable: true,
        //padding: 20,
        inline: true,
        //cls: 'dataview-inline',
        store: 'Menu',
        itemTpl: [
        	'<div class="menu-list">',
        		'<img src="{icon}"/>',
        		'<span>{name}</span>',
        	'</div>'
        ].join('')
    }
});