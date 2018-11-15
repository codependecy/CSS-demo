function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}


var oBox = document.getElementById('box');
var oBtn = document.getElementById('btn');

function move(obj, json, option) {
    clearInterval(obj.timer);
    var n = 0;
    obj.timer = null;
    option = option || {};
    option.type = option.type || 'linear';
    option.v = option.v || 30;

    var s = {},
        d = {};
    for (var attr in json) {
        s[attr] = parseInt(getStyle(obj, attr));
        d[attr] = json[attr] - s[attr];
    }
    obj.timer = setInterval(function () {
        n++;
        for (var attr in json) {
            switch (option.type) {
                case 'linear':
                    var a = n / option.v;
                    var cur = s[attr] + d[attr] * a;
                    break;
                case 'ease':
                    var a = n / option.v;
                    var cur = s[attr] + d[attr] * (a * a * a);
                    break;
            }

            if (attr == 'opacity') obj.style[attr] = cur;
            else obj.style[attr] = cur + 'px';
        }

        if (n == option.v) {
            clearInterval(obj.timer);
        }
    }, 30)
}