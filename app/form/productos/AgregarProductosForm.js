Ext.define('Imobile.form.productos.AgregarProductosForm', {
	extend: 'Ext.form.Panel',
	xtype: 'agregarproductosform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Number',
        'Ext.field.Spinner'
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
                    //required:true,
                    disabled: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%'
                },
                items:[
                    {
                        xtype:'numberfield',
                        name:'code',
                        label: 'Código',
                        itemId: 'codepro'
                        //value: 12345
                    },{
                        xtype:'textfield',
                        name:'description',
                        label:'Descripción',
                        disabled: false
                    },{
                        xtype:'numberfield',
                        name:'cantidad',
                        label:'Cantidad',
                        //disabled: false,
                        minValue: 1
                        //maxValue: 100,
                        //stepValue: .1
                    },{
                        xtype:'numberfield',
                        name:'precio',
                        label:'Precio'
                    },{
                        xtype:'textfield',
                        name:'moneda',
                        label:'Moneda'
                    },{
                        xtype:'numberfield',
                        name:'descuento',
                        label:'Descuento'
                    },{
                        xtype:'numberfield',
                        name:'precioConDescuento',
                        label:'Precio con Descuento'
                    },{
                        xtype:'numberfield',
                        name:'totalDeImpuesto',
                        label:'Total de impuesto'
                    },{
                        xtype:'numberfield',
                        name:'importe',
                        label:'Importe' 
                    },{
                        xtype:'textfield',
                        name:'almacen',
                        label:'Almacen'  
                    },{
                        xtype:'numberfield',
                        name:'existencia',
                        label:'Existencia' 
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