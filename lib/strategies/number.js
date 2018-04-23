'use strict';

function real(hint = 'number.real throw') {
    return (k) => {
        if (typeof k !== 'number') throw hint;
    };
}

function eq(target, hint = 'number.eq throw') {
    return (num) => {
        if (target !== num) throw hint;
    };
}

function neq(target, hint = 'number.neq throw') {
    return (num) => {
        if (target === num) throw hint;
    };
}

function not_nan(hint = 'number.not_nan throw') {
    return (num) => {
        if (Number.isNaN(num)) throw hint;
    };
}

function not_finite(hint = 'number.not_finite throw') {
    return (num) => {
        if (Number.isFinite(num)) throw hint;
    };
}

function range_c_c(range, hint = 'number.range_c_c throw') {
    return (num) => {
        if (num < range[0] || range[1] < num) throw hint;
    };
}

function range_o_o(range, hint = 'number.range_o_o throw') {
    return (num) => {
        if (num <= range[0] || range[1] <= num) throw hint;
    };
}

function range_c_o(range, hint = 'number.range_c_o throw') {
    return (num) => {
        if (num < range[0] || range[1] <= num) throw hint;
    };
}

function range_o_c(range, hint = 'number.range_o_c throw') {
    return (num) => {
        if (num <= range[0] || range[1] < num) throw hint;
    };
}

module.exports = {
    real
    , eq
    , neq
    , not_nan
    , not_finite
    , range_c_c
    , range_o_o
    , range_c_o
    , range_o_c
}