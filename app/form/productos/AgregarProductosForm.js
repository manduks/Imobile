Ext.define('Imobile.form.productos.AgregarProductosForm', {
	extend: 'Ext.form.Panel',
	xtype: 'agregarproductosform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Number'
	],
	config:{
		//padding:'15 15 15 15',
		items:[
            {
                xtype:'fieldset',
                itemId:'datos',
                title:'Agregar Productos',
                instructions: 'Ingrese los datos',
                defaults:{
                    required:true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%'
                },
                items:[
                    {
                        xtype:'numberfield',
                        name:'code',
                        label: 'Código',
                        placeHolder:'ingresa el código',
                    },{
                        xtype:'textfield',
                        name:'description',
                        label:'Descripción',
                        placeHolder:'ingresa la descripción',
                    }
                ]
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
                        itemId:'agregar',
                        text:'Agregar',
                        ui: 'confirm'
                        //ui:'btn-login-ui',
                        // handler:function(btn){
                        //     var form = btn.up('formpanel');
                        //     form.fireEvent('logged', form);
                        // }
                    }, {
                       	itemId: 'cancelar',
                    	text: 'Cancelar',
                    	ui: 'decline'
                    }

                ]

            }
        ]
	}
});