'use strict';

class Arr {

    constructor(hint = 'array check error') {
        this.hint = hint;
        this.validators = [this.__real()];
    }

    static of(hint) {
        return new Arr(hint);
    }

    get [Symbol.toStringTag]() {
        return 'Aegis';
    }

    __real(hint = this.hint) {
        return (x) => {
            if (Array.isArray(array)) return x;
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

    condition(f) {
        this.validators.unshift(function (x) {
            f.call(this, x);
            return x;
        });
        return this;
    }
}

module.exports = Arr