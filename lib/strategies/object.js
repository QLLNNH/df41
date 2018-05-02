'use strict';

exports.Obj = class Obj {

    constructor(hint = 'object check error') {
        this.hint = hint;
        this.validators = [this.__real()];
    }

    static of(hint) {
        return new Obj(hint);
    }

    get [Symbol.toStringTag]() {
        return 'Aegis';
    }

    __real(hint = this.hint) {
        return (x) => {
            if (typeof x === 'object' && x !== null) return x;
            else throw hint;
        };
    }

    condition(f) {
        this.validators.unshift(function (x) {
            f.call(this, x);
            return x;
        });
        return this;
    }
}