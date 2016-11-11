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

//
var alwaysPasses = checker(always(true), always(true));

console.log('1)always pass=' + JSON.stringify(
    alwaysPasses({})
));

var fails = always(false);
fails.message = 'a failure in life';
var alwaysFails = checker(fails);

console.log('2)always fail=' + JSON.stringify(
    alwaysFails({})
));

//
function validator(message, fun) {
    var f = function() {
        return fun.apply(fun, arguments);
    }

    f['message'] = message;

    return f;
}

var gonnaFail = checker(validator('WRONG!', always(false)));

console.log('3)gonna fail=' + JSON.stringify(
    gonnaFail(100)
));

var aMap = validator('Must be a map', _.isObject);
var checkCmd1 = checker(aMap);

console.log('4)check if {} is a map=' + JSON.stringify(
    checkCmd1({})
));

console.log('5)check if 42 is a map=' + JSON.stringify(
    checkCmd1(42)
));

//
function hasKeys() {
    var keys = _.toArray(arguments);

    var fun = function(obj) {
        return _.every(keys, function(k) {
            return _.has(obj, k);
        });
    };

    return validator(cat(['Must have values for keys:'], keys).join(' '), fun);
}

var checkCmd2 = checker(aMap, hasKeys('msg', 'type'));

console.log('6)check properties=' + JSON.stringify(
    checkCmd2({msg:'blah', type:'display'})
));

console.log('7)check properties=' + JSON.stringify(
    checkCmd2(42)
));

console.log('8)check properties=' + JSON.stringify(
    checkCmd2({})
));
