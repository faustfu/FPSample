'use strict';

var nums = [1, 2, 3, null, 5];
var mult = function(total, n) {
    return total * n;
}

//
console.log('1)mult nums=' +
    _.reduce(nums, mult)
);

//
function existy(x) {
    return x != null;
}

function fnull(fun) {
    var defaults = _.rest(arguments);

    return function() {
        var args = _.map(arguments, function(e, i) {
            return existy(e) ? e : defaults[i];
        });

        return fun.apply(null, args);
    }
}

var safeMult = fnull(mult, 1, 1);

console.log('2)mult nums=' +
    _.reduce(nums, safeMult)
);

//
function defaults(d) {
    return function(o, k) {
        var val = fnull(_.identity, d[k]);

        return o && val(o[k]);
    }
}

function doSomething(config) {
    var lookup = defaults({critical: 108});

    return lookup(config, 'critical');
}

console.log('3)critical value=' +
    doSomething({critical: 9})
);

console.log('4)critical value=' +
    doSomething({})
);
