/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('Imobile.store.Clientes', {
    extend: 'Ext.data.Store',
     requires:['Imobile.model.Cliente'],

    config: {
         model:'Imobile.model.Cliente',
         autoLoad:true,
         data:[
 			{code:'C0077',name:'Pedro López López'},
 			{code:'C0069',name:'Pablo López López'},
 			{code:'C0071',name:'Jose López López'},
 			{code:'C0156',name:'Ramiro López López'},
 			{code:'C0141',name:'Roberto López López'},
         ]
    }
});