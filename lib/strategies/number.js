'use strict';

class Num {

    constructor(hint = 'number check error') {
        this.hint = hint;
        this.validators = [this.__real()];
    }

    static of(hint) {
        return new Num(hint);
    }

    get [Symbol.toStringTag]() {
        return 'Aegis';
    }

    __real(hint = this.hint) {
        return (x) => {
            if (typeof x === 'number') return x;
            else throw hint;
        };
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

    not_nan(hint = this.hint) {
        this.validators.unshift((x) => {
            if (Number.isNaN(x)) throw hint;
            else return x;
        });
        return this;
    }

    not_finite(hint = this.hint) {
        this.validators.unshift((x) => {
            if (Number.isFinite(x)) throw hint;
            else return x;
        });
        return this;
    }

    range_c_c(range, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x < range[0] || range[1] < x) throw hint;
            else return x;
        });
        return this;
    }

    range_o_o(range, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x <= range[0] || range[1] <= x) throw hint;
            else return x;
        });
        return this;
    }

    range_c_o(range, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x < range[0] || range[1] <= x) throw hint;
            else return x;
        });
        return this;
    }

    range_o_c(range, hint = this.hint) {
        this.validators.unshift((x) => {
            if (x <= range[0] || range[1] < x) throw hint;
            else return x;
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

module.exports = Num