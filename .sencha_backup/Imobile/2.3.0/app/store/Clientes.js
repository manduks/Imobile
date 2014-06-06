/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
 */
Ext.define('Imobile.store.Clientes', {
    extend: 'Ext.data.Store',
<<<<<<< HEAD
     requires:['Imobile.model.Cliente'],

    config: {
         model:'Imobile.model.Cliente',
         autoLoad: true
    //      data:[
 			// {code:'C0077',name:'Pedro López López'},
 			// {code:'C0069',name:'Pablo López López'},
 			// {code:'C0071',name:'Jose López López'},
 			// {code:'C0156',name:'Ramiro López López'},
 			// {code:'C0141',name:'Roberto López López'},
    //      ]
=======
    requires: ['Imobile.model.Cliente'],

    config: {
        model: 'Imobile.model.Cliente',
        autoLoad: true,
        /*proxy: {
            url: 'http://192.168.15.8:88/iMobile/COK1_CL_Socio/ObtenerListaSocios',
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }*/
        data: [
            {CodigoSocio: 'C0077', NombreSocio: 'Pedro López López', RFC: 'RFC-DE-PEDRO', telefono: '56581111', mail: 'mail@pedro.com', precios: 'Precios para Pedro', condicionCredito: 'Crédito para Pedro', saldo: '1000.00', Direcciones: [{Calle: 'Av. Siempreviva', NoExterior: '100', NoInterior: '28', Colonia: 'Emiliano Zapata', Municipio: 'Álvaro Obregón', CodigoPostal: '01234', Ciudad: 'México', Estado: 'DF', Pais: 'México', TipoDireccion: 'B'}, {Calle: 'Av. Siempreviva', NoExterior: '100', NoInterior: '28', Colonia: 'Emiliano Zapata', Municipio: 'Álvaro Obregón', CodigoPostal: '01234', Ciudad: 'México', Estado: 'DF', Pais: 'México', TipoDireccion: 'S'}]},
            {CodigoSocio: 'C0069', NombreSocio: 'Pablo López López', RFC: 'RFC-DE-PABLO', telefono: '56581112', mail: 'mail@pablo.com', precios: 'Precios para Pablo', condicionCredito: 'Crédito para Pablo', saldo: '2000.00', Direcciones: [{Calle: 'Av. Tempestad', NoExterior: '28', NoInterior: '3', Colonia: 'Cuatro Vientos', Municipio: 'Ixtapaluca', CodigoPostal: '52687', Ciudad: 'México', Estado: 'México', Pais: 'México', TipoDireccion: 'B'}, {Calle: 'Av. Niños Héroes', NoExterior: '3280', NoInterior: '2', Colonia: 'Héroes de Nacozari', Municipio: 'Azcapotzalco', CodigoPostal: '02145', Ciudad: 'México', Estado: 'DF', Pais: 'México', TipoDireccion: 'S'}]},
            {CodigoSocio: 'C0071', NombreSocio: 'Jose López López', RFC: 'RFC-DE-JOSE', telefono: '56581113', mail: 'mail@jose.com', precios: 'Precios para José', condicionCredito: 'Crédito para José', saldo: '3000.00', Direcciones: [{Calle: 'Pilares', NoExterior: '64', NoInterior: '8', Colonia: 'Del Valle', Municipio: 'Benito Juárez', CodigoPostal: '03100', Ciudad: 'México', Estado: 'DF', Pais: 'México', TipoDireccion: 'B'}, {Calle: 'Lisboa', NoExterior: '304', NoInterior: '5', Colonia: 'Portales', Municipio: 'Benito Juárez', CodigoPostal: '03500', Ciudad: 'México', Estado: 'DF', Pais: 'México', TipoDireccion: 'S'}]},
            {CodigoSocio: 'C0156', NombreSocio: 'Ramiro López López', RFC: 'RFC-DE-RAMIRO', telefono: '56581114', mail: 'mail@ramiro.com', precios: 'Precios para Ramiro', condicionCredito: 'Crédito para Ramiro', saldo: '5000.00', Direcciones: [{Calle: 'Monera', NoExterior: '35', NoInterior: '', Colonia: 'San Miguel', Municipio: 'Coyoacán', CodigoPostal: '04235', Ciudad: 'México', Estado: 'DF', Pais: 'México', TipoDireccion: 'B'}, {Calle: 'Av. Siempreviva', NoExterior: '100', NoInterior: '28', Colonia: 'Emiliano Zapata', Municipio: 'Álvaro Obregón', CodigoPostal: '01234', Ciudad: 'México', Estado: 'DF', Pais: 'México', TipoDireccion: 'S'}]},
            {CodigoSocio: 'C0141', NombreSocio: 'Roberto López López', RFC: 'RFC-DE-ROBERTO', telefono: '56581115', mail: 'mail@roberto.com', precios: 'Precios para Roberto', condicionCredito: 'Crédito para Roberto', saldo: '6000.00', Direcciones: [{Calle: 'Oriente 33', NoExterior: '36', NoInterior: '12', Colonia: 'Unión de Guadalupe', Municipio: 'Valle de Chalco', CodigoPostal: '52487', Ciudad: 'México', Estado: 'México', Pais: 'México', TipoDireccion: 'B'}, {Calle: 'Agustín Yáñez', NoExterior: '548', NoInterior: '28', Colonia: 'Acatitla', Municipio: 'Iztapalapa', CodigoPostal: '09654', Ciudad: 'México', Estado: 'DF', Pais: 'México', TipoDireccion: 'S'}]}
        ]
>>>>>>> b1ea61258045ce9d476a33aad607e3fec63052e3
    }
});