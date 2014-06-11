Ext.define('Imobile.core.FormatCurrency', {
    widget: 'currency',
    singleton: true,
    currencyPrecision: 2,
    currencySign: '$',
    currencyAtEnd: false,
    decimalSeparator: '.',
    thousandSeparator: ',',

    currency: function (v, currencySign, decimals, end) {
        var negativeSign = '',
            format = ",0",
            i = 0;
        v = v - 0;
        if (v < 0) {
            v = -v;
            negativeSign = '-';
        }

        decimals = Ext.isDefined(decimals) ? decimals : Imobile.core.FormatCurrency.currencyPrecision;

        format += format + (decimals > 0 ? '.' : '');
        for (; i < decimals; i++) {
            format += '0';
        }

        v = Imobile.core.FormatCurrency.formatValue(v);

        if ((end || Imobile.core.FormatCurrency.currencyAtEnd) === true) {

            return Ext.String.format("{0}{1}{2}", negativeSign, v, currencySign || Imobile.core.FormatCurrency.currencySign);

        } else {

            return Ext.String.format("{0}{1}{2}", negativeSign, currencySign || Imobile.core.FormatCurrency.currencySign, v);

        }
    },

    formatValue: function (nVal) {

        nVal += '';
        x = nVal.split(Imobile.core.FormatCurrency.decimalSeparator);
        x1 = x[0];
        x2 = x.length > 1 ? Imobile.core.FormatCurrency.decimalSeparator + x[1] : '';
        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + Imobile.core.FormatCurrency.thousandSeparator + '$2');
        }
        return x1 + x2;
    },

    formatCurrencytoNumber: function (value){
        return parseFloat(value.replace(/[^0-9-.]/g, ''))
    }
});