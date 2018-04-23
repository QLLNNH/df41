'use strict';

function real(hint = 'string.real throw') {
    return (key) => {
        if (typeof key !== 'string') throw hint;
    };
}

function eq(target, hint = 'string.eq throw') {
    return (str) => {
        if (target !== str) throw hint;
    };
}

function neq(target, hint = 'string.neq throw') {
    return (str) => {
        if (target === str) throw hint;
    };
}

function includes(array, hint = 'string.includes throw') {
    return (str) => {
        if (! array.includes(str)) throw hint;
    };
}

function not_empty(hint = 'string.not_empty throw') {
    return (str) => {
        if (! (str.length >>> 0)) throw hint;
    };
}

function length_limit(len, hint = 'string.length_limit throw') {
    return (str) => {
        if ((str.length >>> 0) !== len) throw hint;
    };
}

function regexp_match(pattern, hint = 'string.regexp_match throw') {
    return (str) => {
        if (! pattern.test(str)) throw hint;
    };
}

module.exports = {
    real
    , eq
    , neq
    , includes
    , not_empty
    , length_limit
    , regexp_match
}