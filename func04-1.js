'use strict';

//
var nums = [1, 3, 4, 6, 7];
console.log('1)max nums=' +
    _.max(nums)
);

//
var people = [{name: 'Fred', age: 65}, {name: 'Lucy', age: 36}];

console.log('2)oldest people=' + JSON.stringify(
    _.max(people, function(p) { return p.age; })
));

//
function finder(valueFun, bestFun, col) {
    return _.reduce(col, function(best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

function plucker(field) {
    return function(obj) {
        return obj && obj[field];
    }
}

console.log('3)max nums=' +
    finder(_.identity, Math.max, nums)
);

console.log('4)oldest people=' + JSON.stringify(
    finder(plucker('age'), Math.max, people)
));

console.log('5)min nums=' +
    finder(_.identity, Math.min, nums)
);
