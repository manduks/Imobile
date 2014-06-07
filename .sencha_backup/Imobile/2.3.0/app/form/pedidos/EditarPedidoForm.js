Ext.define('Imobile.form.pedidos.EditarPedidoForm', {
	extend: 'Ext.form.Panel',
	xtype: 'editarpedidoform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
<<<<<<< HEAD
		'Ext.field.Number',
=======
		'Ext.field.Number'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
        //'Ext.field.Spinner'
	],
	config:{
		//padding:'15 15 15 15',
<<<<<<< HEAD
		items:[
=======
		items:[{        
                xtype:'container',
                padding: '0 0 0 200',              
                defaults:{
                    xtype:'button',
                    style: 'margin: .5em',
                    flex: 1
                },
                layout:{
                    type:'hbox'
                },
                items:[
                    {                        
                        itemId:'guardar',
                        text:'Guardar',
                        ui: 'confirm'
                        //ui:'btn-login-ui',
                        // handler:function(btn){
                        //     var form = btn.up('formpanel');
                        //     form.fireEvent('logged', form);
                        // }
                    }
                ]
            },
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
            {
                xtype:'fieldset',
                itemId:'datos',
                title:'Editar Pedido',
                instructions: 'Ingrese los datos',
                defaults:{
                    //required:true,
                    disabled: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%'
                },
                items:[
                    {
<<<<<<< HEAD
                        xtype:'numberfield',
                        name:'codeClient',
=======
                        xtype:'textfield',
                        name:'CodigoSocio',
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                        label: 'Código de Cliente',
                        itemId: 'codepro'
                        //value: 12345
                    },{
                        xtype:'textfield',
<<<<<<< HEAD
                        name:'nombreCliente',
                        label:'Nombre de Cliente',                        
                    },{
                        xtype:'numberfield',
                        name:'limite',
                        label:'Límite de Crédito',                        
=======
                        name:'NombreSocio',
                        label:'Nombre de Cliente'
                    },{
                        xtype:'numberfield',
                        name:'limite',
                        label:'Límite de Crédito'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                    },{
                        xtype:'textfield',
                        name:'condicion',
                        label:'Condición de Crédito'
                    },{
                        xtype:'numberfield',
                        name:'saldo',
                        label:'Saldo'
                    },{
<<<<<<< HEAD
                        xtype:'numberfield',
                        name:'listaPrecios',
=======
                        xtype:'textfield',
                        name:'precios',
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                        label:'Lista de Precios'
                    },{
                        xtype:'textfield',
                        name:'vendedor',
                        label:'Vendedor'
                    },{
                        xtype:'numberfield',
                        name:'descuento',
                        label:'Descuento'
                    },{
                        xtype:'textfield',
<<<<<<< HEAD
                        name:'moneda',
                        label:'moneda',
                        disabled: false
=======
                        name:'NombreMoneda',
                        label:'Moneda',
                        disabled: false,
                        itemId: 'moneda',
                        //tpl: ['<div style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"</div>'].join('')
                        inputCls: 'fa-check'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                    },{
                        xtype:'textfield',
                        name:'tipoCambio',
                        label:'Tipo de Cambio'  
                    }
                ]
<<<<<<< HEAD
            }, {        
                xtype:'container',                
                defaults:{
                	xtype:'button',
                	style: 'margin: .5em',
                	flex: 1
                },
                layout:{
                	type:'hbox'
                },
                items:[
                    {                        
                        itemId:'guardar',
                        text:'Guardar',
                        ui: 'confirm'
                        //ui:'btn-login-ui',
                        // handler:function(btn){
                        //     var form = btn.up('formpanel');
                        //     form.fireEvent('logged', form);
                        // }
                    }
                ]
=======
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
            }
        ]
	}
});