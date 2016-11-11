'use strict';

/* Data as Abstraction */

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

var peopleTable = [
    ["name", "age", "hair"],
    ["Marble", "35", "red"],
    ["Bob", "64", "blonde"]
];

function first(a) {
    return nth(a, 0);
}

function last(a) {
    return nth(a, a.length - 1);
}

function selectNames(table) {
    return _.rest(_.map(table, first));
}

function selectHairColor(table) {
    return _.rest(_.map(table, last));
}

console.log('---selectNames result---');
console.log(selectNames(peopleTable));

console.log('---selectHairColor result---');
console.log(selectHairColor(peopleTable));
