'use strict';

console.log('1)print array=' +
    ['11', '11', '11', '11'].map(parseInt)
);

// //
// function curry1(fun) {
//     return function(arg) {
//         return fun(arg);
//     }
// }

// console.log('2)print array=' +
//     ['11', '11', '11', '11'].map(curry1(parseInt))
// );

// //
// function curry2(fun) {
//     return function(secondArg) {
//         return function(firstArg) {
//             return fun(firstArg, secondArg);
//         }
//     }
// }

// function div(n, d) {
//     return n/d;
// }

// var div10 = curry2(div)(10);

// console.log('3)print div result 50/10=' +
//     div10(50)
// );
