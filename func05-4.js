'use strict';

function existy(x) {
    return x != null;
}

function truthy(x) {
    return (x !== false) && existy(x);
}

function cat() {
    var head = _.first(arguments);

    if (existy(head)) {
        return head.concat.apply(head, _.rest(arguments));
    } else {
        return [];
    }
}

function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

function partial1(fun, arg1) {
    return function() {
        var args = construct(arg1, arguments);
        return fun.apply(fun, args);
    }
}

function div(n, d) {
    return n/d;
}

var over10 = partial1(div, 10);

console.log('1)print div result 10/5=' +
    over10(5)
);
