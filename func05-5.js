'use strict';

var myName = 5;

function isntString(str) {
    return !_.isString(str);
}

console.log('1)print check if the name type is not string=' +
    isntString(myName)
);

function not(x) {
    return !x;
}

// f(g(x)) => _.compose(f, g)
var isntStringC = _.compose(not, _.isString);

console.log('2)print check if the name type is not string=' +
    isntStringC(myName)
);
