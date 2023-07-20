'use strict';

function even(n) {
    if (n === 0)
        return true;
    else
        return odd(Math.abs(n) - 1);
}

function odd(n) {
    if (n === 0)
        return false;
    else
        return even(Math.abs(n) - 1);
}

odd(1);
odd(2);
even(3);
even(4);
