'use strict';
const Strategy = require('./strategy');

exports.Num = class Num extends Strategy {

    constructor(hint = 'number check error', before = []) {
        super();
        this.hint = hint;
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before) {
        return new Num(hint, before);
    }

    default(v) {
        this.has_default = true;
        this.default_value = v;
        return this;
    }

    __real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'number' && ! Number.isNaN(x)) return x;
            else if (this.has_default) return this.default_value;
            else throw hint;
        };
    }

    origin() {
        this.validators.unshift((x) => this.primitive);
        return this;
    }

    ceil() {
        this.validators.unshift((x) => Math.ceil(x));
        return this;
    }

    floor() {
        this.validators.unshift((x) => Math.floor(x));
        return this;
    }

    eq(target, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x === target) return x;
            else throw hint;
        });
        return this;
    }

    neq(target, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x !== target) return x;
            else throw hint;
        });
        return this;
    }

    gt(target, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x > target) return x;
            else throw hint;
        });
        return this;
    }

    gte(target, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x >= target) return x;
            else throw hint;
        });
        return this;
    }

    lt(target, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x < target) return x;
            else throw hint;
        });
        return this;
    }

    lte(target, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x <= target) return x;
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
};