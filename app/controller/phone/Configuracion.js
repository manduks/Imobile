/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Configuracion', {
    extend: 'Ext.app.Controller',

    config: {
        refs:{
            fileUpload:'configuracionpanel fileupload',
            imagenCmp:'configuracionpanel component[id=imagencmp]'
        },
        control:{
            'configuracionpanel fileupload': {
                loadsuccess: function(data,reader){
                    var imagecmp = this.getImagenCmp(),
                        imagesize = this.sizeString(data) / 1024 / 1024;

                    console.log(imagesize);

                    if(data.indexOf("data:image/") >= 0){
                        if(imagesize < 10){
                            localStorage.setItem("imagenorden",data);
                            imagecmp.setHtml("<img src='" + data + "' style='width:100%; height:auto;'>");
                        }
                        else{
                            Ext.Msg.alert("Error","La imagen debe de ser menor de 4 megas");
                        }
                    }
                    else{
                        Ext.Msg.alert("Error","No es una imagen válida");
                        return false;
                    }

                }
            },
            'configuracionpanel':{
                activate:function(){
                    var imagen = localStorage.getItem("imagenorden");
                    if(imagen){
                        var imagecmp = this.getImagenCmp();
                        imagecmp.setHtml("<img src='" + imagen + "' style='width:100%; height:auto;'>");

                    }

                }
            }
        }
    },
    sizeString:function(str){
        var s = str.length;
        for (var i=str.length-1; i>=0; i--) {
            var code = str.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff) s++;
            else if (code > 0x7ff && code <= 0xffff) s+=2;
            if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
        }
        return s;
    }
});