/**
 * @class Triton.form.cotizador.CotizadorForm
 * @extends Ext.form.panel
 * Este es el formulario para hacer la cotización
 */
Ext.define('Imobile.form.CotizadorForm', {
    extend: 'Ext.form.Panel',
    xtype: 'cotizadorform',
    //requires: ['Ext.form.FieldSet', 'Ext.SegmentedButton', 'Ext.field.Radio', 'Triton.form.cotizador.PaquetesSelectField', 'Triton.form.cotizador.GeneroSelectField', 'Triton.form.cotizador.FumaSelectField', 'Triton.form.cotizador.PlanSelecField', 'Triton.form.cotizador.PagoSelectField', 'Triton.form.cotizador.OcupacionSelectField', 'Triton.form.EdadField', 'Triton.view.cotizador.ResumeTpl', 'Triton.view.cotizador.ResumeContainer', 'Triton.model.Cotizacion'],
    initialize: function() {
        var me = this;
        me.callParent();
        me.add(me.buildItems());
    },
    buildItems: function() {
        var me = this;
        return [{
                xtype: Ext.os.is.Phone ? 'component': 'toolbar',
                title: 'Cotizador',
                cls: 'x-toolbar-light',
                height:10,
                docked: 'top',
                hiddenn: Ext.os.is.Phone
            },{
            xtype: 'toolbar',
            ui: 'light',
            docked: 'top',
            layout: {
                pack: 'center',
                align: 'center'
            },
            items: [{
                xtype: 'segmentedbutton',
                cardContainerId: 'cardContainer',
                items: [{
                    text: 'Generales',
                    activateTab: 0,
                    pressed: true
                }, {
                    text: 'Coberturas',
                    activateTab: 1
                }, {
                    text: 'Resumen',
                    activateTab: 2,
                    itemId: 'resumeBtn'
                }],
                listeners: {
                    scope: this,
                    toggle: me.changeTabsForOptions
                }
            }]
        }, {
            xtype: 'container',
            layout: 'fit',
            itemId: 'cardContainer',
            items: [me.buildItemPersonalInfo(), me.buildCoberturas(), {
                xtype: 'resumecontainer',
                hidden: true
            }]
        }];
    },
    buildCoberturas: function() {
        var me = this;
        return {
            xtype: 'container',
            itemId: 'contenedorCoberturas',
            tabNumber: 1,
            hidden: true,
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%'
                },
                items: [{
                    xtype: 'numberfield',
                    name: 'suma',
                    maxValue: 9999999,
                    minValue: 1,
                    label: 'Suma Asegurada',
                    listeners: {
                        keyup: function(field) {
                            var maxValue = field.getMaxValue(),
                                value = field.getValue(),
                                minValue = field.getMinValue();
                            if (value > maxValue) {
                                field.setValue(maxValue);
                            }
                            if (value < minValue) {
                                field.setValue(minValue);
                            }
                        }
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'excedente',
                    maxValue: 9999999,
                    minValue: 1,
                    label: 'Prima Excedente',
                    listeners: {
                        keyup: function(field) {
                            var maxValue = field.getMaxValue(),
                                value = field.getValue(),
                                minValue = field.getMinValue();
                            if (value > maxValue) {
                                field.setValue(maxValue);
                            }
                            if (value < minValue) {
                                field.setValue(minValue);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'container',
                items: [{
                    xtype: 'toolbar',
                    ui: 'neutral',
                    docked: 'top',
                    defaults: {
                        ui: 'plain'
                    },
                    layout: {
                        pack: 'center',
                        align: 'center'
                    },
                    items: [{
                        xtype: 'segmentedbutton',
                        cardContainerId: 'cardContainerCoberturas',
                        items: [{
                            text: 'Titular',
                            activateTab: 0,
                            pressed: true
                        }, {
                            text: 'Adicionales',
                            activateTab: 1
                        }],
                        listeners: {
                            scope: this,
                            toggle: me.changeTabsForOptions
                        }
                    }]
                }, {
                    xtype: 'container',
                    layout: 'fit',
                    itemId: 'cardContainerCoberturas',
                    items: [me.buildCoberturaTitular(), me.buildCoberturasAdicionales()]
                }]
            }]
        };
    },
    buildCoberturaTitular: function() {
        return {
            xtype: 'container',
            padding: 5,
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%',
                    hidden: true
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'tiba',
                    label: 'TIBA',
                    hidden: false,
                    listeners: {
                        change: this.toggleFieldSetItems
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'sumaTIBA',
                    placeHolder: 'Suma'
                }]
            }, {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%',
                    hidden: true
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'cii',
                    label: 'CII',
                    hidden: false,
                    listeners: {
                        change: this.toggleFieldSetItems
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'sumaCII',
                    placeHolder: 'Suma'
                }]
            }, {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%',
                    hidden: true
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'bit',
                    label: 'BIT',
                    hidden: false,
                    listeners: {
                        change: this.toggleFieldSetItems
                    }
                }]
            }, {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%',
                    hidden: true
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'cat',
                    label: 'CAT',
                    hidden: false,
                    listeners: {
                        change: this.toggleFieldSetItems
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'sumaCAT',
                    placeHolder: 'Suma'
                }]
            }, {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%',
                    hidden: true
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'cma',
                    label: 'CMA',
                    hidden: false,
                    listeners: {
                        change: this.toggleFieldSetItems
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'sumaCMA',
                    placeHolder: 'Suma'
                }]
            }, {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%',
                    hidden: true
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'ge',
                    label: 'GE',
                    hidden: false,
                    listeners: {
                        change: this.toggleFieldSetItems
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'sumaGE',
                    placeHolder: 'Suma'
                }]
            }, {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%',
                    hidden: true
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'gfa',
                    label: 'GFA',
                    hidden: false,
                    listeners: {
                        change: this.toggleFieldSetItems
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'sumaGFA',
                    placeHolder: 'Suma'
                }]
            }, {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '50%',
                    hidden: true
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'ptt',
                    label: 'PTT',
                    hidden: false,
                    listeners: {
                        change: this.toggleFieldSetItems
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'tipoPTT',
                    label: 'Básico',
                    value: 'basico'
                }, {
                    xtype: 'radiofield',
                    name: 'tipoPTT',
                    label: 'Extra',
                    value: 'extra',
                    checked: true
                }]
            }]
        };
    },
    buildCoberturasAdicionales: function() {
        return {
            xtype: 'container',
            hidden: true,
            padding: 5,
            items: [{
                xtype: 'fieldset',
                title: 'Cónyuge y complementarios',
                style: {
                    'margin-top': '-5px'
                },                
                items: [{
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'bac',
                        label: 'BAC',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaBAC',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadBAC',
                        placeHolder: 'Edad'
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'bacy',
                        label: 'BACY',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaBACY',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadBACY',
                        placeHolder: 'Edad'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Cancer',
                style: {
                    'margin-top': '-20px'
                },
                items: [{
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'cac1',
                        label: 'CAC1',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaCAC1',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'generoselectfield',
                        label: '',
                        name: 'sexoCAC1'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadCAC1',
                        placeHolder: 'Edad'
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'cac2',
                        label: 'CAC2',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaCAC2',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'generoselectfield',
                        label: '',
                        name: 'sexoCAC2'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadCAC2',
                        placeHolder: 'Edad'
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'cac3',
                        label: 'CAC3',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaCAC3',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'generoselectfield',
                        label: '',
                        name: 'sexoCAC3'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadCAC3',
                        placeHolder: 'Edad'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Gastos Funerarios',
                style: {
                    'margin-top': '-20px'
                },
                items: [{
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'gfc',
                        label: 'GFC',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaGFC',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadGFC',
                        placeHolder: 'Edad'
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'gfh',
                        label: 'GFH',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaGFH',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'numberfield',
                        name: 'hijosGFH',
                        placeHolder: 'Numero de hijos'
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'gfc1',
                        label: 'GFC1',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaGFC1',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadGFC1',
                        placeHolder: 'Edad'
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'gfc2',
                        label: 'GFC2',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaGFC2',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadGFC2',
                        placeHolder: 'Edad'
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'gfc3',
                        label: 'GFC3',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'sumaGF3',
                        placeHolder: 'Suma Asegurada'
                    }, {
                        xtype: 'numberfield',
                        name: 'edadGF3',
                        placeHolder: 'Edad'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Accidentes Personales',
                style:{
                    'margin-top':'-20px'
                },
                items: [{
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'p01',
                        label: 'P01',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'edadP01',
                        label: 'Edad'
                    }, {
                        xtype: 'radiofield',
                        name: 'tipoP01',
                        label: 'Básico',
                        value: 'basico'
                    }, {
                        xtype: 'radiofield',
                        name: 'tipoP01',
                        label: 'Extra',
                        value: 'extra',
                        checked: true
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'p02',
                        label: 'P02',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'edadP02',
                        label: 'Edad'
                    }, {
                        xtype: 'radiofield',
                        name: 'tipoP02',
                        label: 'Básico',
                        value: 'basico'
                    }, {
                        xtype: 'radiofield',
                        name: 'tipoP02',
                        label: 'Extra',
                        value: 'extra',
                        checked: true
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'p03',
                        label: 'P03',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'edadP03',
                        label: 'Edad'
                    }, {
                        xtype: 'radiofield',
                        name: 'tipoP03',
                        label: 'Básico',
                        value: 'basico'
                    }, {
                        xtype: 'radiofield',
                        name: 'tipoP03',
                        label: 'Extra',
                        value: 'extra',
                        checked: true
                    }]
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '50%',
                        hidden: true
                    },
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'p04',
                        label: 'P04',
                        hidden: false,
                        listeners: {
                            change: this.toggleFieldSetItems
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'edadP04',
                        label: 'Edad'
                    }, {
                        xtype: 'radiofield',
                        name: 'tipoP04',
                        label: 'Básico',
                        value: 'basico'
                    }, {
                        xtype: 'radiofield',
                        name: 'tipoP04',
                        label: 'Extra',
                        value: 'extra',
                        checked: true
                    }]
                }]
            }]
        }
    },
    buildItemPersonalInfo: function() {
        var me = this;
        return {
            xtype: 'container',
            itemId: 'contenedorPersonalInfo',
            tabNumber: 0,
            items: [{
                xtype: 'fieldset',
                instructions: 'Información del asegurado',
                defaults: {
                    labelWidth: '45%'
                },
                items: [{
                    xtype: 'edadfield',
                    name: 'edad',
                    listeners: {
                        scope: this,
                        change: me.edadDelTitularCambio
                    }
                }, {
                    xtype: 'generoselectfield'
                }, {
                    xtype: 'fumaselectfield'
                }, {
                    xtype: 'planselectfield'
                }, {
                    xtype: 'pagoselectfield'
                }, {
                    xtype: 'ocupacionselectfield'
                }]
            }, {
                xtype: 'fieldset',
                itemId: 'ocupacionDetails',
                data: {
                    clave: '----',
                    tipo: '----'
                },
                tpl: ['<div style="margin:5px;">', '<span>Clave : {clave}</span></br>', '<span>Tipo  : {tipo}</span></br>', '</div>'].join('')
            }]
        };
    },
    edadDelTitularCambio: function(field, newValue, oldValue, eOpts) {
        var me = this;
        //me.reset();
        //
        me.down('field[name=gfa]').enable();
        me.down('field[name=gfc]').enable();
        me.down('field[name=bac]').enable();
        me.down('field[name=ge]').enable();
        me.down('field[name=bit]').enable();
        me.down('field[name=cii]').enable();
        me.down('field[name=cma]').enable();
        me.down('field[name=tiba]').enable();
        me.down('field[name=cat]').enable();
        if (newValue > 70) {
            me.down('field[name=gfa]').disable();
            me.down('field[name=gfc]').disable();
            me.down('field[name=bac]').disable();
            me.down('field[name=ge]').disable();
        }
        if (newValue > 55) {
            me.down('field[name=bit]').disable();
            me.down('field[name=cii]').disable();
            me.down('field[name=cma]').disable();
            me.down('field[name=tiba]').disable();
            me.down('field[name=cat]').disable();
        }
    },
    changeTabsForOptions: function(container, button, pressed) {
        if (container.initialConfig.cardContainerId === 'cardContainer' && button.initialConfig.activateTab === 2) {
            var isValid = pressed ? container.up('cotizadorform').validarForm() : false;
            if (pressed && !isValid) {
                //container.setPressedButtons([1]);
                return isValid;
            }
        }
        var items = button.up('cotizadorform').down('#' + container.initialConfig.cardContainerId).getItems().items;
        if (pressed) {
            Ext.each(items, function(item, index) {
                if (index === button.initialConfig.activateTab) {
                    item.show();
                } else {
                    item.hide();
                }
            });
        }
    },
    toggleFieldSetItems: function(chk, value) {
        var items = chk.up('fieldset').getItems().items,
            numberfield, fieldToFocus = undefined;
        if (!chk.up('cotizadorform').excluirCoberturas(chk, value)) {
            chk.uncheck();
            return false;
        }
        Ext.each(items, function(item, index) {
            if (!value && index) {
                item.disable();
                item.hide();
            } else {
                item.enable();
                item.show();
                if (item.isXType('numberfield')) {
                    //si se trata del primer numberfield dentros del fieldset,se debe de enfocar!!!               
                    fieldToFocus = fieldToFocus || index;
                    if (fieldToFocus === index) {
                        numberfield = item;
                        setTimeout(function() {
                            numberfield.focus();
                        }, 200);
                    }
                }
            }
        });
    },
    validarForm: function() {
        var me = this,
            form = me,
            resumeContainer = form.down('resumecontainer'),
            data = form.getValues(),
            model = Ext.create('Triton.model.Cotizacion'),
            errors, errorMessage = '',
            count = 0;
        form.updateRecord(model);
        errors = model.validate();
        if (!errors.isValid()) {
            errors.each(function(err) {
                //activamos el tab que contiene el error
                var contenedorPrincipal = form.down('field[name=' + err.getField() + ']').up('#contenedorPersonalInfo') || form.down('field[name=' + err.getField() + ']').up('#contenedorCoberturas');
                if (contenedorPrincipal) {
                    form.down('segmentedbutton').setPressedButtons([contenedorPrincipal.initialConfig.tabNumber]);
                }
                errorMessage += err.getMessage() + '<br/>';
                return false;
            });
            Ext.Msg.alert('Aviso!', errorMessage);
            return false;
        } else {
            me.fireEvent('validdata', me, data);
            return true;
        }
    },
    setEnable: function(field, enable) {
        if (enable) {
            field.enable();
        } else {
            field.disable();
        }
    },
    excluirCoberturas: function(chk, value) {
        var form = chk.up('cotizadorform'),
            data = form.getValues();
        switch (chk.getName()) {
            case 'tiba':
                chk = chk.up('cotizadorform').down('field[name=cma]');
                if (value && !data.suma) {
                    Ext.Msg.alert('Aviso!', "Favor de llenar la suma asegurada");
                    return false;
                }
                else{
                    chk.up('cotizadorform').down('field[name=sumaTIBA]').setValue(data.suma)
                }
                break;
            case 'cii':
                if (value && !data.suma) {
                    Ext.Msg.alert('Aviso!', "Favor de llenar la suma asegurada");
                    return false;
                }
                else{
                    chk.up('cotizadorform').down('field[name=sumaCII]').setValue(data.suma)
                }
                return true;
                break;
            case 'cma':
                if (value && !data.suma) {
                    Ext.Msg.alert('Aviso!', "Favor de llenar la suma asegurada");
                    return false;
                }
                else{
                    chk.up('cotizadorform').down('field[name=sumaCMA]').setValue(data.suma)
                }
                chk = chk.up('cotizadorform').down('field[name=tiba]');
                break;
        }
        if (chk && value) {
            chk.disable();
        } else {
            chk.enable();
        }
        return true;
    }
});