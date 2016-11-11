'use strict';

/* Units of Behavior */

var letters = ['a', 'b', 'c'];

// Raw
console.log('---Raw result---');
console.log(letters[1]);

// Cooked
function fail(thing) {
    throw new Error(thing);
}

function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
    if (!_.isNumber(index)) fail('Expected a number as the index');
    if (!isIndexed(a)) fail('Not supported on non-indexed type');
    if ((index < 0) || (index > a.length - 1)) {
        fail('Index value is out of bounds');
    }

    return a[index];
}

function second(a) {
    return nth(a, 1);
}

console.log('---Cooked result---');
console.log(second(letters));

