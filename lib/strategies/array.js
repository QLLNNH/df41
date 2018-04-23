'use strict';

function real(hint = 'array.real throw') {
    return (array) => {
        if (! Array.isArray(array)) throw hint;
    };
}

function length_limit(len, hint = 'array.length_limit throw') {
    return (array) => {
        if ((array.length >>> 0) !== len) throw hint;
    };
}

module.exports = {
    real
    , length_limit
}