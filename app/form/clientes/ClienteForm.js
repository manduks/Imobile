/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 12:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Imobile.form.clientes.ClienteForm', {
    extend: 'Ext.form.Panel',
    xtype: 'clienteForm',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Number'
    ],
    config: {
        //padding:'15 15 15 15',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'datosCliente',
                title: 'Datos de Cliente',
                defaults: {
                    required: true,
                    clearIcon: true,
                    autoCapitalize: true,
                    labelWidth: '45%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'addres1',
                        label: 'Dirección 1',
                        placeHolder: 'Ingresa tu Dirección'
                    },
                    {
                        xtype: 'textfield',
                        name: 'addres2',
                        label: 'Dirección 2',
                        placeHolder: 'Ingresa tu Dirección'
                    },
                    {
                        xtype: 'textfield',
                        name: 'addres3',
                        label: 'Dirección 3',
                        placeHolder: 'Ingresa tu Dirección'
                    },
                    {
                        xtype: 'textfield',
                        name: 'ciudad',
                        label: 'Ciudad',
                        placeHolder: 'Ingresa tu Ciudad'
                    },
                    {
                        xtype: 'textfield',
                        name: 'cp',
                        label: 'C.P.',
                        placeHolder: 'Ingresa tu C.P.'
                    },
                    {
                        xtype: 'textfield',
                        name: 'pais',
                        label: 'Pais',
                        placeHolder: 'Ingresa tu Pais'
                    },
                    {
                        xtype: 'textfield',
                        name: 'estado',
                        label: 'Estado',
                        placeHolder: 'Ingresa tu Estado'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                itemId: 'datosCompra',
                title: 'Datos de Compra',
                instructions: 'Ingrese los datos',
                defaults: {
                    required: true,
                    clearIcon: true,
                    autoCapitalize: true,
                    labelWidth: '45%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'addres1',
                        label: 'Dirección 1',
                        placeHolder: 'Ingresa tu Dirección'
                    },
                    {
                        xtype: 'textfield',
                        name: 'addres2',
                        label: 'Dirección 2',
                        placeHolder: 'Ingresa tu Dirección'
                    }
                ]
            },
            {
                xtype: 'container',
                defaults: {
                    xtype: 'button',
                    margin: 5,
                    flex: 1
                },
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        itemId: 'agregar',
                        text: 'Agregar',
                        ui: 'confirm'
                    },
                    {
                        itemId: 'cancelar',
                        text: 'Cancelar',
                        ui: 'decline'
                    }

                ]

            }
        ]
    }
});