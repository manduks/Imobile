/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('Imobile.store.Clientes', {
    extend: 'Ext.data.Store',
     requires:['Imobile.model.Cliente'],

    config: {
         model:'Imobile.model.Menu',
         autoLoad:true,
         data:[
 			{id:1,name:'Pedro López López'},
 			{id:2,name:'Pablo López López'},
 			{id:3,name:'Jose López López'},
 			{id:4,name:'Ramiro López López'},
 			{id:5,name:'Roberto López López'},
         ]
    }
});