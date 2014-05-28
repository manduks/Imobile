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
                    labelWidth: '45%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'CodigoSocio',
                        label: 'Código'
                    },
                    {
                        xtype: 'textfield',
                        name: 'NombreSocio',
                        label: 'Nombre'
                    },
                    {
                        xtype: 'textfield',
                        name: 'RFC',
                        label: 'RFC'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'Telefono',
                        label: 'Teléfono'
                    },
                    {
                        xtype: 'emailfield',
                        name: 'Correo',
                        label: 'Correo'
                    },
                    {
                        xtype: 'textfield',
                        name: 'ListaPrecios',
                        label: 'Lista de Precios'                        
                    },
                    {
                        xtype: 'textfield',
                        name: 'LimiteCredito',
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