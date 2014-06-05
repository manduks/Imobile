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
                        itemId:'agregar',
                        text:'Guardar',
                        ui: 'confirm'
                    }
                ]

            },
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
                        xtype:'textfield',
                        name:'CodigoArticulo',
                        label: 'Código',
                        itemId: 'codepro'
                        //value: 12345
                    },{
                        xtype:'textfield',
                        name:'NombreArticulo',
                        label:'Descripción',
                        disabled: false
                    },{
                        xtype:'numberfield',
                        name:'cantidad',
                        label:'Cantidad',
                        disabled: false,
                        minValue: 1,
                        itemId: 'cantidad'
                        //maxValue: 100,
                        //stepValue: .1,
                        //ui: 'spinner'
                    },{
                        xtype:'numberfield',
                        name:'Precio',
                        label:'Precio'
                    },{
                        xtype:'textfield',
                        name:'moneda',
                        label:'Moneda'
                        //itemId: 'moneda'
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
                        name:'NombreAlmacen',
                        label:'Almacen',
                        disabled: false,
                        itemId: 'almacenProducto'
                    },{
                        xtype:'numberfield',
                        name:'Disponible',
                        label:'Existencia'
                    }
                ]
            }
        ]
	}
});