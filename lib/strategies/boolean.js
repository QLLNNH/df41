'use strict';

exports.Boo = class Boo {

    constructor(hint = 'boolean check error') {
        this.hint = hint;
        this.validators = [this.__real()];
    }

    static of(hint) {
        return new Boo(hint);
    }

    get [Symbol.toStringTag]() {
        return 'Aegis';
    }

    __real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'boolean') return x;
            else throw hint;
        };
    }

    origin() {
        this.validators.unshift((x) => {
            return this.primitive;
        });
        return this;
    }

    condition(f) {
        this.validators.unshift(function (x) {
            return f.call(this, x);
        });
        return this;
    }
};