/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Cobranza', {
    extend: 'Ext.app.Controller',

    config: {
    	control:{

            /*'clienteslist': {
                //itemtap: 'alSelecionarCliente'
                itemsingletap: 'alSelecionarCliente'
            },*/
            'opcionclientelist': {
                itemtap: 'onOpcionesCliente'
            },
            'cobranzalist': {
                itemtap: 'onItemTapCobranzaList'
            },
            'totalapagarcontainer #cancelar': {
                tap: 'cancelaPago'
            },
            'totalapagarcontainer #terminar': {
                tap: 'onTerminarCobranza'
            },
            'navigationcobranza #agregarPago': {
                tap: 'onAgregarPago'
            },
            'navigationcobranza': {
                pop: 'onPopNavigationCobranza'
            },
            'facturascontainer #aplicarPago': {
                tap: 'muestraCobranza'
            },
            'formasdepagolist': {
                itemtap: 'agregaPago'
            },
            'montoapagarform #pagar': {
                tap: 'onPagar'
            },
            'totalapagarlist':{
                itemtap: 'editaPago',
                itemswipe: 'eliminaPago'
            }
    	}
    },

    /**
    * Muestra la lista de facturas pendientes asociadas al cliente elegido en clienteslist.
    */
    onItemTapCobranzaList: function (list, index, target, record) {
        var me = this,
            view = me.getMenu();


        switch(record.data.action){
            case 'cobranzaFacturas':            
                var store = Ext.getStore('Facturas');                

                view.push({
                    xtype: 'facturascontainer',
                    title: me.idCliente
                    //opcion: record.data.action
                });

                params = {
                    CardCode: me.idCliente
                };
                
                store.clearFilter();
                store.setParams(params);
                store.load();

                break;

            case 'anticipo':
                var store = Ext.getStore('Anticipos'),
                    anticiposlist;                

                view.push({
                    xtype: 'facturascontainer',
                    title: me.idCliente
                    //opcion: record.data.action
                });

                anticiposlist = view.getActiveItem().down('facturaslist');

                anticiposlist.setStore(store);
                anticiposlist.setMode('SINGLE');

                params = {
                    CardCode: me.idCliente
                };
                
                store.clearFilter();
                store.setParams(params);
                store.load();

                break;

            case 'visualizarCobranza':
                var store = Ext.getStore('Transacciones'),
                    anticiposlist;

                view.push({
                    xtype: 'visualizacioncobranzalist',
                    title: me.idCliente
                    //opcion: record.data.action
                });
        }
    },

    agregaSaldoAMostrar: function (facturas) {
        var me = this,
            moneda,
            saldoMostrado;

        facturas.each(function (item, index, length) {
            moneda = item.get('CodigoMoneda') + ' ';
            //saldoMostrado = Imobile.core.FormatCurrency.currency(item.get('Saldo'), moneda);
            saldoMostrado = Imobile.core.FormatCurrency.currency(item.get('TotalDocumento'), moneda);
            item.set('saldoAMostrar', saldoMostrado);
        });
    },

    /**
     * Muestra la lista de formas de pago.
     */
    aplicaPago: function () {
        view.push({
            xtype: 'formasdepagolist',
            title: me.idCliente
        });
    },

    /**
     * Responde al evento "tap" del botón "cancelar" de "totalapagarcontainer".
     * Establece en el menú principal el item 1 como activo.
     * @param btn Este botón.
     */

    cancelaPago: function (btn) {
        var me = this,
            view = me.getMain(),
            navigationCobranza = view.getActiveItem(),
            titulo = navigationCobranza.down('toolbar'),
            totales = Ext.getStore('Totales'),
            facturas = Ext.getStore('Facturas');

        navigationCobranza.remove(titulo, true); // Remueve el título de la vista, si no, al volver a entrar aparecerá sobre el actual.
        totales.removeAll();
        me.pagado = 0;
        facturas.clearFilter();
        view.setActiveItem(1);
    },

    /**
     * Responde al evento "tap" del botón "Agregar" de "totalapagarcontainer".
     * Muestra la lista de las formas de pago.
     * @param btn Este botón.
     */
    onAgregarPago: function (btn) {
        var me = this,
            view = me.getMain().getActiveItem();
    
        view.push({
            xtype: 'formasdepagolist',
            title: me.idCliente
            //opcion: me.getMenu().getActiveItem().opcion
        });

        view.getNavigationBar().down('#agregarPago').hide();
    },

    /**
     * Valida la vista actual y si es el caso hace visible el botón "Agregar".
     * Setea el título el toolbar.
     * @param navigationview Este navigationview.
     */
    onPopNavigationCobranza: function (navigationview) {
        var me = this,
            barra = navigationview.getNavigationBar(),
            view = navigationview.getActiveItem();

        if (view.isXType('totalapagarcontainer')) {
            barra.down('#agregarPago').show();
        }

        barra.setTitle(me.idCliente);
    },

    /**
     * Responde al evento "itemtap" de "formasdepagolist". Muestra el formulario correspondiente a la forma de pago elegida.
     * Muestra el formulario para agregar un pago a la cobranza actual.
     * @param list Esta lista "formasdepagolist"
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    agregaPago: function (list, index, target, record) {
        var me = this,
            view = list.up('navigationcobranza'); //NavigationCobranza

        view.push({
            xtype: 'montoapagarform',
            //xtype: 'montoapagarformcontainer',
            title: me.idCliente
            //datos: record.data,
            //opcion: list.opcion
        });

        me.determinaVistaMontoAPagar(record.data.TipoFormaPago, view);
        view.down('fieldset').setTitle(record.data.Nombre);
    },

    determinaVistaMontoAPagar: function(opcion, view){

        switch (opcion) {
            case "0":
                view.down('fieldset').add([
                    {
                        xtype: 'numberfield',
                        name: 'NumeroCheque',
                        placeHolder: 'Ingrese el número de cheque',
                        label: 'No. Cheque'
                    },{
                        xtype: 'textfield',
                        name: 'Banco',
                        placeHolder: 'Ingrese el nombre del banco',
                        label: 'Banco'
                    }
                ]);
                break;
            case "2":
                view.down('fieldset').add([
                    {
                        xtype: 'numberfield',
                        name: 'NumeroAutorizacion',
                        placeHolder: 'Ingrese el número de autorización',
                        label: 'No. Autorización'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'NumeroTarjeta',
                        placeHolder: 'Ingrese el número de tarjeta',
                        label: 'No. Tarjeta'
                    }
                ]);
                break;
        }

    },

    /**
     * Responde al evento "tap" del botón "pagar" de "montoapagarform".
     * Valida si todos los campos del formulario vienen llenos.
     * Valida si este tipo de pago permite dar cambio para en su caso permitirlo o no.
     * @param btn Este botón.
     */
    onPagar: function (btn) {        
        var me = this,
            view = btn.up('navigationcobranza'),
            form = view.down('montoapagarform'),
            moneda,
            datos = view.down('formasdepagolist').getSelection()[0].data,
            opcion = me.getMenu().down('cobranzalist').getSelection()[0].data.action,
            pendiente = me.aPagar - me.pagado,
            forma = datos.Nombre,
            entrada = form.getValues().monto,
            codigo = datos.Codigo,
            tipo = datos.TipoFormaPago,
            esVacio = false,
            valores = form.getValues(),
            numeroCheque = valores.numeroCheque,
            //numeroCuenta = valores.numeroCuenta,
            numeroTarjeta = valores.numeroTarjeta,
            banco = valores.banco,
            numeroAutorizacion = valores.numeroAutorizacion,
            nombres = form.getInnerItems(),
            modoEdicion = form.modo === 'edicion' ? true : false,
            permiteCambio = datos.PermiteCambio;

            console.log(opcion);

         if(opcion == 'cobranzaFacturas'){
            moneda = Ext.getStore('Facturas').getAt(0).data.CodigoMoneda + ' '; //Estamos asumiendo que el código de moneda de todas las facturas es la local.            
         } else {
            moneda = Ext.getStore('Anticipos').getAt(0).data.CodigoMoneda + ' '; //Estamos asumiendo que el código de moneda de todas las facturas es la local.            
         }

/*        console.log(moneda);
        console.log(nombres[0].innerItems[0]._label);
        console.log(Ext.getStore('Facturas').getAt(0));*/

        Ext.Object.each(valores, function (key, value, myself) { // Validamos que todos los campos estén llenos.            

            if (value === null) { 
                esVacio = true;
                me.mandaMensaje('Datos incompletos', 'Ingrese todos los datos.');
                return false; // stop the iteration
            }
        });

        if (esVacio) {
            //me.mandaMensaje('Sin cantidad', 'Ingrese la cantidad a pagar.');
        } else {
            if (permiteCambio === 'false') {
                if (entrada > pendiente) {
                    me.mandaMensaje('Sin cambio', 'Esta forma de pago no permite dar cambio, disminuya la cantidad.');
                } else {
                    //me.sumaCobros(forma, entrada, moneda, codigo, tipo, numeroCheque, numeroCuenta, banco, numeroAutorizacion, form);
                    me.sumaCobros(form, datos, moneda);
                    view.pop(2);
                }
            } else {
                //me.sumaCobros(forma, entrada, moneda, codigo, tipo, numeroCheque, numeroCuenta, banco, numeroAutorizacion, form);
                me.sumaCobros(form, datos, moneda);
                view.pop(2);
            }
        }
    },

    /**
     * Muestra la vista "totalapagarcontainer".
     */
    muestraCobranza: function () {
        var me = this,
            view = me.getMain(),
            facturaslist = view.getActiveItem().down('facturaslist'),
            navigationCobranza,
            i,
            total = 0,
            seleccion = facturaslist.getSelection(),            
            moneda,// = seleccion[0].data.CodigoMoneda,
            facturas = Ext.getStore('Facturas'),
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: me.titulo
            });        

        if(seleccion.length > 0){ // Validamos que por lo menos se haya seleccionado una factura.
            moneda = seleccion[0].data.CodigoMoneda + ' ';

            for (i = 0; i < seleccion.length; i++) {
                //total += seleccion[i].data.Saldo;
                total += seleccion[i].data.TotalDocumento;
                seleccion[i].data.aPagar = true;
            }

            facturas.clearFilter();
            facturas.filter('aPagar', true);

            me.aPagar = total;

            view.setActiveItem(3);
            navigationCobranza = view.getActiveItem();

            navigationCobranza.getNavigationBar().setTitle(me.idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
            navigationCobranza.add(barraTitulo);

            me.getTotales().down('#aCobrar').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.aPagar, moneda)});
            me.getTotales().down('#pagado').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.pagado, moneda)});
            me.getTotales().down('#pendiente').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.aPagar - me.pagado, moneda)});
        } else {
            me.mandaMensaje("Sin selección", "Seleccione al menos una factura para continuar.");
        }
    },

    /**
    * Elimina el pago de totalapagarlist. Primero valida preguntándole al usuario si realmente desea elminar el pago.
    * @param list Ésta lista totalapagarlist.
    * @param index El índice del ítem swipeado.
    * @param target El elemento swipeado.
    * @param record El record asociado al ítem.
    */
    eliminaPago: function (list, index, target, record){
        var me = this,
            totales = Ext.getStore('Totales');

        Ext.Msg.confirm("Eliminar pago", "Se va a eliminar el pago, ¿está seguro?", function (e) {

            if (e == 'yes') {
                totales.removeAt(index);
                me.pagado-= Imobile.core.FormatCurrency.formatCurrencytoNumber(record.data.monto);
                me.actualizaCobranza(record.data.moneda);
            }
        });
    },

    editaPago: function(list, index, target, record){
        var me = this
            view = list.up('navigationcobranza'), //NavigationCobranza
            valores = record.data;        

        //me.agregaPago(list, index, target, record);        

        view.push({
            xtype: 'montoapagarform',
            modo: 'edicion',
            ind: record.data.id,
            montoAnterior: record.data.monto,
            //xtype: 'montoapagarformcontainer',
            //title: me.idCliente,
            datos: record.data
        });

        me.determinaVistaMontoAPagar(record.data.tipoFormaPago, view);

        view.down('fieldset').setTitle(record.data.tipo);

        view.getActiveItem().setValues(valores);

        view.getNavigationBar().down('#agregarPago').hide();
    },

    /**
    * Actualiza los campos "pagado" y "pendiente" del totalescontainer
    * @moneda El código de moneda que se tiene que mostrar.
    */
    actualizaCobranza: function (moneda){
        var me = this;

        me.getTotales().down('#pagado').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.pagado, moneda)});
        me.getTotales().down('#pendiente').setItems({xtype: 'container', html: Imobile.core.FormatCurrency.currency(me.aPagar - me.pagado, moneda)});
    },

    /**
     * Agrega el pago ingresado al store "Totales" o lo modifica si el pago es editado.
     * Suma cada uno de los saldos del store "Totales" y los muestra en "totalescontainer".
     * @param form La forma de pago.
     * @param moneda El código de moneda del pago.
     */
//    sumaCobros: function (forma, entrada, moneda, codigo, tipoFormaPago, numeroCheque, numeroCuenta, banco, numeroAutorizacion, modoEdicion) {
    sumaCobros: function (form, datos, moneda) {
        var me = this,
            forma = datos.Nombre,
            entrada = form.getValues().monto,
            codigo = datos.Codigo,
            tipo = datos.TipoFormaPago,
            esVacio = false,
            valores = form.getValues(),
            numeroCheque = valores.NumeroCheque,
            numeroTarjeta = valores.NumeroTarjeta,
            banco = valores.Banco,
            numeroAutorizacion = valores.NumeroAutorizacion,
            nombres = form.getInnerItems(),
            modoEdicion = form.modo === 'edicion' ? true : false,
            permiteCambio = datos.PermiteCambio,
            temp,
            entradaMostrada = Imobile.core.FormatCurrency.currency(entrada, moneda),
            ind = form.ind,
            store = Ext.getStore('Totales');
            
        if(modoEdicion){
            var ind = store.find('id', ind);
            pagoACambiar = store.getAt(ind);

            pagoACambiar.set('monto', entradaMostrada);            
            me.pagado-= Imobile.core.FormatCurrency.formatCurrencytoNumber(form.montoAnterior);
            temp = entrada;

        } else {

            store.add({
                tipo: forma,
                monto: entradaMostrada,
                codigoFormaPago: codigo,
                tipoFormaPago: tipo,
                NumeroCheque: numeroCheque,
                NumeroTarjeta: numeroTarjeta,
                Banco: banco,
                NumeroAutorizacion: numeroAutorizacion,
                moneda: moneda
            });

            temp = Imobile.core.FormatCurrency.formatCurrencytoNumber(store.getAt(store.getCount() - 1).get('monto'));
        }
        
        me.pagado += parseFloat(temp);

        // store.each(function (item) {
        //     temp = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('monto'));
        //     me.pagado += parseFloat(temp);
        // });

        me.actualizaCobranza(moneda);
    },

    /**
     * Termina la cobranza
     */
    onTerminarCobranza: function () {
        var me = this,
            total = 0,
            store = Ext.getStore('Facturas'),
            totales = Ext.getStore('Totales'),
            array = store.getData().items,
            fecha = new Date(Ext.Date.now()),
            hora = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds(),
            fecha = Ext.Date.format(fecha, "d-m-Y"),
            view = me.getMain().getActiveItem(),
            url,
            msg = 'Se realizó el cobro exitosamente con folio '
        
        if (totales.getCount() > 0) {
            //var Folio = parseInt(localStorage.getItem("FolioInterno")) + 100;


            var params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "Cobranza.Fecha": fecha,
                "Cobranza.Hora": hora,
                "Cobranza.CodigoVendedor": localStorage.getItem("CodigoUsuario"),
                "Cobranza.Tipo": 'C',
                "Cobranza.CodigoCliente": me.idCliente
            };

            if(me.getMenu().getActiveItem().opcion == 'anticipo'){
                params["Cobranza.Tipo"] = 'A';
                msg = 'Se realizó el anticipo exitosamente con folio ';
            }

            //console.log(params);
            //localStorage.setItem("FolioInterno", Folio);

            Ext.Array.forEach(array, function (item, index, allItems) {
                //console.log(item, 'terminar cobranza');
                //total += (Imobile.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad')) + item.get('totalDeImpuesto');

                params["Cobranza.CobranzaFacturas[" + index + "].NumeroFactura"] = item.data.NumeroDocumento;//get('NumeroDocumento');
                params["Cobranza.CobranzaFacturas[" + index + "].Monto"] = item.get('TotalDocumento');//item.get('Saldo');
            });

            totales.each(function (item, index) {                
                params["Cobranza.CobranzaDetalles[" + index + "].NumeroLinea"] = index;
                params["Cobranza.CobranzaDetalles[" + index + "].CodigoFormaPago"] = item.data.codigoFormaPago;
                params["Cobranza.CobranzaDetalles[" + index + "].MontoNeto"] = Imobile.core.FormatCurrency.formatCurrencytoNumber(item.data.monto);
                //params["oCobranzaCobranzaDetalles[" + index + "].NoFacturaAplicada"] = 'Sin número'

                switch (item.data.tipoFormaPago) {
                    case "0": //Cheque
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroCheque"] = item.data.NumeroCheque;
                        //params["Cobranza.CobranzaDetalles[" + index + "].NumeroCuenta"] = item.data.NumeroCuenta;
                        params["Cobranza.CobranzaDetalles[" + index + "].Banco"] = item.data.Banco;
                        params["Cobranza.CobranzaDetalles[" + index + "].Fecha"] = fecha;
                        break;

                    case "1": //Transferencia
                        break;
                    case "2": //Tarjeta
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroAutorizacion"] = item.data.NumeroAutorizacion;
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroTarjeta"] = item.data.NumeroTarjeta; 
                        break;
                }
            });
            //params["Orden.TotalDocumento"] = parseFloat(total).toFixed(2);

            /*            if(me.actionOrden == 'crear'){
             url = "http://" + me.dirIP + "/iMobile/COK1_CL_OrdenVenta/AgregarOrdenMobile";
             msg = "Se agrego la orden correctamente con folio: ";
             } else {
             url = "http://" + me.dirIP + "iMobile/COK1_CL_OrdenVenta/ActualizarOrdenVentaiMobile";
             msg = "Se acualizo la orden correctamente con folio: ";
             } */

            url = "http://" + me.dirIP + "/iMobile/COK1_CL_Cobranza/AgregarCobranza";

            Ext.data.JsonP.request({
                url: url,
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    if (response.Procesada) {
                        me.getMain().setActiveItem(1);
                        Ext.Msg.alert("Cobro procesado", msg + response.CodigoUnicoDocumento + ".");
                        store.removeAll();
                        totales.removeAll();                        
                        view.remove(view.down('toolbar'), true);
                        me.pagado = 0;
                        me.getMain().getActiveItem().pop();
                    } else {
                        Ext.Msg.alert("Cobro no procesado", "No se proceso el cobro correctamente: " + response.Descripcion);
                    }
                }
            });

        } else {            
            Ext.Msg.alert("Sin pago", "Agrega por lo menos un pago.");
        }
    },

});