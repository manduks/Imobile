/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Rutas', {
    extend: 'Ext.app.Controller',
    config:{
        refs:{
            menuNav:'menunav',
            mainCard:'maincard',
            navigationOrden:'navigationorden',
            partidaContainer:'partidacontainer',
            opcionesOrden:'opcionesorden',
            ordenContainer:'ordencontainer',
            rutasCalendario:'rutascalendario'

        },
        control:{
            'container[id=rutascont] clienteslist': {
                itemtap:'onSeleccionarCliente'
            },

            'opcionrutaslist': {
                itemtap:'onCalendario'
            },
            'rutascalendario':{
                selectionchange:function(record,e,x,y){
                    console.log(this.getRutasCalendario().getValue());
                    console.log(record.getValue());
                    this.getRutasCalendario().setViewMode("day");
                }
            }
        }
    },
    /**
     * Establece el título y el id del cliente cada uno en una variable.
     * Muestra la vista de ventas.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    onSeleccionarCliente:function(list, index, target, record) {
        var name = record.get('NombreSocio'),
            idCliente = record.get('CodigoSocio'),
            titulo = name,
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: titulo
            });

        this.getMenuNav().push({
            xtype: 'opcionrutaslist',
            title: idCliente,
            idCliente: idCliente
        });
        this.getMenuNav().add(barraTitulo);

    },

    onCalendario:function(list, index, target, record){
        var opcion = record.get('action');

        switch(opcion){
            case 'calendario':
                this.getMenuNav().push({
                    xtype:'rutascalendario'
                });
                break;
            case 'registrar':
                break;
        }

    }
});