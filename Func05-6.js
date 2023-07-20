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

function mapcat(fun, coll) {
    return cat.apply(null, _.map(coll, fun));
}

function validator(message, fun) {
    var f = function() {
        return fun.apply(fun, arguments);
    }

    f['message'] = message;

    return f;
}

function partial1(fun, arg1) {
    return function() {
        var args = construct(arg1, arguments);
        return fun.apply(fun, args);
    }
}

function curry2(fun) {
    return function(secondArg) {
        return function(firstArg) {
            return fun(firstArg, secondArg);
        }
    }
}

function condition1() {
    var validators = _.toArray(arguments);

    return function(fun, arg) {
        var errors = mapcat(function(isValid) { //validating
            return isValid(arg) ? [] : [isValid.message];
        }, validators);

        if (!_.isEmpty(errors)) {
            throw new Error(errors.join(', '));
        }

        return fun(arg); //executing
    }
}

function notZero(x) {
    return x !== 0;
}

var greaterThan = curry2(function(lhs, rhs) { return lhs > rhs; });

var preSquareCheck = condition1(
    validator('arg must not be zero', notZero),
    validator('arg must be a number', _.isNumber)
);

console.log('1)print check if 10 is valid=' +
    preSquareCheck(_.identity, 10)
);

console.log('2)print check if empty string is valid=' +
    preSquareCheck(_.identity, '')
);

console.log('3)print check if 0 is valid=' +
    preSquareCheck(_.identity, 0)
);

//
function uncheckedSquare(n) {
    return n * n;
}

var checkedSquare = partial1(preSquareCheck, uncheckedSquare);

console.log('4)print calculate square of 10=' +
    checkedSquare(10)
);

var postSquareCheck = condition1(
    validator('result should be a number', _.isNumber),
    validator('result should not be zero', notZero),
    validator('result should be positive', greaterThan(0))
);

console.log('5)print check result 0=' +
    postSquareCheck(_.identity, 0)
);

console.log('6)print check result -1=' +
    postSquareCheck(_.identity, -1)
);

console.log('7)print check result ""=' +
    postSquareCheck(_.identity, '')
);

console.log('7)print check result 100=' +
    postSquareCheck(_.identity, 100)
);

//
var megaCheckedSquare = _.compose(partial1(postSquareCheck, _.identity), checkedSquare);

console.log('8)print mega check 10=' +
    megaCheckedSquare(10)
);

console.log('9)print mega check 0=' +
    megaCheckedSquare(0)
);


