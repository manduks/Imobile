Ext.define('Imobile.form.prospectos.ProspectosForm', {
	extend: 'Ext.form.Panel',
	xtype: 'prospectosform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Number'
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
                        //xtype: 'button',
                        itemId:'agregarProspecto',
                        text:'Agregar',
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
                title:'Agregar prospecto',
                instructions: 'Ingrese los datos',
                defaults:{
                    //required:true,
                    //disabled: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%'
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'fecha',
                        label: 'Fecha',                        
                        //value: 12345
                    },{
                        xtype:'textfield',
                        name:'codigo',
                        label:'Código'
                    },{
                        xtype:'textfield',
                        name:'razonSocial',
                        label:'Razón Social'
                    },{
                        xtype:'textfield',
                        name:'tipoPersona',
                        label:'Tipo de persona'
                    },{
                        xtype:'textfield',
                        name:'rfc',
                        label:'RFC'
                    },{
                        xtype:'textfield',
                        name:'direcciones',
                        label:'Dirección'
                    },{
                        xtype:'textfield',
                        name:'CodigoVendedor',
                        label:'Encargado'
                    },{
                        xtype:'numberfield',
                        name:'descuento',
                        label:'Productor'
                    },{
                        xtype:'textfield',
                        name:'CodigoMoneda',
                        label:'Distribuidor',
                        disabled: false,
                        itemId: 'moneda',
                        //tpl: ['<div style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"</div>'].join('')
                        //inputCls: 'fa-check'
                    },{
                        xtype:'textfield',
                        name:'tipoCambio',
                        label:'Productos utilizados'  
                    }
                ]
            }
        ]
	}
});