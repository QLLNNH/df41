'use strict';
const array = require('./array');

exports.Str = class Str {

    constructor(hint = 'string check error', before = []) {
        this.hint = hint;
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before) {
        return new Str(hint, before);
    }

    get [Symbol.toStringTag]() {
        return 'Aegis';
    }

    __real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'string') return x;
            else throw hint;
        };
    }

    origin() {
        this.validators.unshift((x) => {
            return this.primitive;
        });
        return this;
    }

    eq(target, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x === target) return x;
            else throw hint;
        });
        return this;
    }

    non_eq(target, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x === target) throw hint;
            else return x;
        });
        return this;
    }

    includes(arrar, hint = this.hint) {
        this.validators.unshift((x) => {
            if (arrar.includes(x)) return x;
            else throw hint;
        });
        return this;
    }

    non_includes(arrar, hint = this.hint) {
        this.validators.unshift((x) => {
            if (arrar.includes(x)) throw hint;
            else return x;
        });
        return this;
    }

    empty(hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length) throw hint;
            else return x;
        });
        return this;
    }

    non_empty(hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length) return x;
            else throw hint;
        });
        return this;
    }

    match(pattern, hint = this.hint) {
        this.validators.unshift((x) => {
            if (pattern.test(x)) return x;
            else throw hint;
        });
        return this;
    }

    non_match(pattern, hint = this.hint) {
        this.validators.unshift((x) => {
            if (pattern.test(x)) throw hint;
            else return x;
        });
        return this;
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
            return f.call(this, x);
        });
        return this;
    }

    trim(hint = this.hint) {
        this.validators.unshift((x) => {
            return x.trim();
        });
        return this;
    }

    to_lower_case(hint = this.hint) {
        this.validators.unshift((x) => {
            return x.toLowerCase();
        });
        return this;
    }

    to_upper_case(hint = this.hint) {
        this.validators.unshift((x) => {
            return x.toUpperCase();
        });
        return this;
    }

    split(separator, hint = this.hint) {
        this.validators.unshift((x) => {
            return x.split(separator);
        });
        return array.Arr.of(hint, this.validators);
    }
};