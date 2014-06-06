/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 12:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Imobile.form.clientes.ClienteForm', {
    extend: 'Ext.form.Panel',
    xtype: 'clienteform',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Number'
    ],
    config: {        
        //padding:'0 0 15 0',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'datosCliente',
                title: 'Datos de Cliente',
                defaults: {
                    disabled: true,
                    clearIcon: true,
                    autoCapitalize: true,
<<<<<<< HEAD
                    labelWidth: '45%',                    
=======
                    labelWidth: '45%'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                },
                items: [
                    {
                        xtype: 'textfield',
<<<<<<< HEAD
                        name: 'code',
=======
                        name: 'CodigoSocio',
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                        label: 'Código'
                    },
                    {
                        xtype: 'textfield',
<<<<<<< HEAD
                        name: 'name',
                        label: 'nombre'
                    },
                    {
                        xtype: 'textfield',
                        name: 'idFiscal',
                        label: 'ID Fiscal'
=======
                        name: 'NombreSocio',
                        label: 'Nombre'
                    },
                    {
                        xtype: 'textfield',
                        name: 'RFC',
                        label: 'RFC'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                    },
                    {
                        xtype: 'numberfield',
                        name: 'telefono',
                        label: 'Teléfono'
                    },
                    {
                        xtype: 'emailfield',
                        name: 'mail',
<<<<<<< HEAD
                        label: 'Ciudad'
=======
                        label: 'Correo'
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
                    },
                    {
                        xtype: 'textfield',
                        name: 'precios',
                        label: 'Lista de Precios'                        
                    },
                    {
                        xtype: 'textfield',
                        name: 'condicionCredito',
                        label: 'Crédito'                        
                    },
                    {
                        xtype: 'numberfield',
                        name: 'saldo',
                        label: 'Saldo'
                    }                    
                ]
            }
        ]
    }
});