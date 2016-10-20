define([
    'Handlebars'
], function(Handlebars) {
    Handlebars.registerHelper('formatNumber', function(num, places, times, pre, options){
        if (typeof num == 'undefined') {
            num = '--';
        }
        if (typeof num != 'number') {
            return num;
        }
        num = +(num || 0) * times;
        return (pre && num > 0 ? '+' : '') + num.toFixed(places);
    });

    Handlebars.registerHelper('compare', function(v1, v2, res1, res2, res3, options){
        if (v1 > v2) {
            return res1;
        } else if (v1 = v2) {
            return res2;
        } else {
            return res3;
        }
    });

    Handlebars.registerHelper('safeString', function(text, options){
        return new Handlebars.SafeString(text);
    });

    return Handlebars;
});