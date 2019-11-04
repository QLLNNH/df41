'use strict';
const Strategy = require('./strategy');

exports.Num = class Num extends Strategy {

    constructor(hint = 'number check error') {
        super();
        this.hint = hint;
        this.validators = [this.__real()];
    }

    static of(hint) {
        return new Num(hint);
    }

    __real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'number' && Number.isSafeInteger(x)) return x;
            else throw hint;
        };
    }

    origin() {
        this.validators.unshift((x) => this.primitive);
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