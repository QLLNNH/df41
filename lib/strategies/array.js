'use strict';
const string = require('./string');

exports.Arr = class Arr {

    constructor(hint = 'array check error', before = []) {
        this.hint = hint;
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before) {
        return new Arr(hint, before);
    }

    get [Symbol.toStringTag]() {
        return 'Aegis';
    }

    __real(hint = this.hint) {
        return (x) => {
            if (Array.isArray(x)) return x;
            else throw hint;
        };
    }

    fixed_length(length, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length === length) return x;
            else throw hint;
        });
        return this;
    }

    limited_length(length, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length <= length) return x;
            else throw hint;
        });
        return this;
    }

    condition(f) {
        this.validators.unshift(function (x) {
            f.call(this, x);
            return x;
        });
        return this;
    }

    join(separator, hint = this.hint) {
        this.validators.unshift((x) => {
            return x.join(separator);
        });
        return string.Str.of(hint, this.validators);
    }
}