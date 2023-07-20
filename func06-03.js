'use strict';

function partial1(fun, arg1) {
    return function() {
        var args = construct(arg1, arguments);
        return fun.apply(fun, args);
    }
}

function even(n) {
    if (n === 0)
        return true;
    else
        return partial1(odd, Math.abs(n) - 1);
}

function odd(n) {
    if (n === 0)
        return false;
    else
        return partial1(even, Math.abs(n) - 1);
}

odd(0);
odd(1)();
odd(2)()();

//
function trampoline(fun) {
    var result = fun.apply(fun, _.rest(arguments));

    while (_.isFunction(result)) {
        result = result();
    }

    return result;
}

trampoline(odd, 2);
