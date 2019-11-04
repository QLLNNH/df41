'use strict';
const str = require('./str');
const Strategy = require('./strategy');

exports.Arr = class Arr extends Strategy {

    constructor(hint = 'field need array', before = []) {
        super();
        this.hint = hint;
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before) {
        return new Arr(hint, before);
    }

    __real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (Array.isArray(x)) return x;
            else throw hint;
        };
    }

    origin() {
        this.validators.unshift((x) => this.primitive);
        return this;
    }

    eq(length, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length === length) return x;
            else throw hint;
        });
        return this;
    }

    gt(length, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length > length) return x;
            else throw hint;
        });
        return this;
    }

    gte(length, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length >= length) return x;
            else throw hint;
        });
        return this;
    }

    lt(length, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length < length) return x;
            else throw hint;
        });
        return this;
    }

    lte(length, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x.length <= length) return x;
            else throw hint;
        });
        return this;
    }

    extend(fn) {
        this.validators.unshift(function (x) {
            return fn.call(this, x);
        });
        return this;
    }

    join(separator, hint = this.hint) {
        this.validators.unshift((x) => x.join(separator));
        return str.Str.of(hint, this.validators);
    }
};