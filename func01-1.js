'use strict';

/* Functions as first class citizens */

// As arguments
[1, 2, 3].forEach(alert);

// As result
function splat(fun) {
    return function(array) {
        return fun.apply(null, array);
    }
}

var addArrayElements = splat(function(x, y) { return x + y; });

console.log(addArrayElements([1, 2]));