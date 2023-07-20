'use strict';

function myLength(ary) {
    if (_.isEmpty(ary))
        return 0;
    else
        return 1 + myLength(_.rest(ary));
}

myLength(_.range(10));

//
function deepClone(obj) {
    if (!existy(obj)||!_.isObject(obj))
        return obj;
    
    var temp = new obj.constructor();
    for (var key in obj)
        if (obj.hasOwnProperty(key))
            temp[key] = deepClone(obj[key]);

    return temp;
}

//
function tcLength(ary, n) {
    var l = n ? n : 0;

    if (_.isEmpty(ary))
        return l;
    else
        return tcLength(_.rest(ary), l + 1);
}

tcLength(_.range(10));
