Ext.define('Imobile.form.pedidos.EditarPedidoForm', {
	extend: 'Ext.form.Panel',
	xtype: 'editarpedidoform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Number',
        //'Ext.field.Spinner'
	],
	config:{
		//padding:'15 15 15 15',
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
                        xtype:'numberfield',
                        name:'codeClient',
                        label: 'Código de Cliente',
                        itemId: 'codepro'
                        //value: 12345
                    },{
                        xtype:'textfield',
                        name:'nombreCliente',
                        label:'Nombre de Cliente',                        
                    },{
                        xtype:'numberfield',
                        name:'limite',
                        label:'Límite de Crédito',                        
                    },{
                        xtype:'textfield',
                        name:'condicion',
                        label:'Condición de Crédito'
                    },{
                        xtype:'numberfield',
                        name:'saldo',
                        label:'Saldo'
                    },{
                        xtype:'numberfield',
                        name:'listaPrecios',
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
                        name:'moneda',
                        label:'moneda',
                        disabled: false,
                        itemId: 'moneda',
                        //tpl: ['<div style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"</div>'].join('')
                        inputCls: 'fa fa-check'
                    },{
                        xtype:'textfield',
                        name:'tipoCambio',
                        label:'Tipo de Cambio'  
                    }
                ]
            }
        ]
	}
});