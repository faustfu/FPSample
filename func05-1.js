'use strict';

function existy(x) {
    return x != null;
}

function truthy(x) {
    return (x !== false) && existy(x);
}

function fail(thing) {
    throw new Error(thing);
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

function doWhen(condition, action) {
    if (truthy(condition)) {
        return action();
    } else {
        return undefined;
    }
}

function invoker(name, method) {
    return function(target) {
        if (!existy(target)) fail('Must provide a target');

        var targetMethod = target[name];
        var args = _.rest(arguments);

        return doWhen(existy(targetMethod) && method === targetMethod, function() {
            return targetMethod.apply(target, args);
        });
    }
}

function dispatch() {
    var funs = _.toArray(arguments);
    var size = funs.length;

    return function(target) {
        var ret = undefined; //
        var args = _.rest(arguments);

        for (var funIndex = 0; funIndex < size; funIndex++) {
            var fun = funs[funIndex];
            ret = fun.apply(fun, construct(target, args));

            if (existy(ret)) return ret; //
        }

        return ret;
    }
}

var str = dispatch(
    invoker('toString', Array.prototype.toString),
    invoker('toString', String.prototype.toString)
);

console.log('1)print string=' +
    str('abc')
);
console.log('2)print array=' +
    str(['a', 'b', 'c'])
);

//
console.log('3)print number=' +
    str(50)
);

//
var newStr = dispatch(
    str,
    invoker('toString', Number.prototype.toString)
);
console.log('4)print number=' +
    newStr(50)
);

//
function performCommandHardCoded(command) {
    var result;

    switch (command.type) {
        case 'notify':
            result = notify(command.message);
            break;
        case 'join':
            result = changeView(command.target);
            break;
        default:
            alert(command.type);
    }

    return result;
}

performCommandHardCoded({type: 'notify', message:'Hi!'});
performCommandHardCoded({type: 'join', target:'waiting-room'});
performCommandHardCoded({type: 'wait'});

function isa(type, action) {
    return function(obj) {
        if (type === obj.type) {
            return action(obj);
        }
    }
}

var performCommand = dispatch(
    isa('notify', function(obj) { return notify(obj.message); }),
    isa('join', function(obj) { return changeView(obj.target); }),
    function(obj) { alert(obj.type); }
);
performCommand({type: 'join', target: 'foo'});

//
var performAdminCommand = dispatch(
    isa('kill', function(obj) { return shutdown(obj.hostname); }),
    performCommand
);
