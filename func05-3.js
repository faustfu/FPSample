'use strict';

function always(val) {
    return function() {
        return val;
    }
}

function existy(x) {
    return x != null;
}

function cat() {
    var head = _.first(arguments);

    if (existy(head)) {
        return head.concat.apply(head, _.rest(arguments));
    } else {
        return [];
    }
}

function checker() {
    var validators = _.toArray(arguments);

    return function(obj) {
        return _.reduce(validators, function(errs, check) {
            if (check(obj)) {
                return errs;
            } else {
                return _.chain(errs).push(check.message).value();
            }
        }, []);
    }
}

function validator(message, fun) {
    var f = function() {
        return fun.apply(fun, arguments);
    }

    f['message'] = message;

    return f;
}

function curry2(fun) {
    return function(secondArg) {
        return function(firstArg) {
            return fun(firstArg, secondArg);
        }
    }
}

var greaterThan = curry2(function(lhs, rhs) { return lhs > rhs; });
var lessThan = curry2(function(lhs, rhs) { return lhs < rhs; });

var withinRange = checker(
    validator('arg must be greater than 10', greaterThan(10)),
    validator('arg must be less than 20', lessThan(20))
);

console.log('1)check result 15=' +
    withinRange(15)
);

console.log('2)check result 1=' +
    withinRange(1)
);

console.log('3)check result 30=' +
    withinRange(30)
);
