'use strict';

exports.Num = class Num extends require('./strategy') {

    constructor(hint = 'Num Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this.__get_catch();
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before) {
        return new Num(hint, before);
    }

    catch(v) {
        this.catcher = () => v;
        return this;
    }

    __get_catch() {
        return (err) => {
            throw err ?? this.hint;
        };
    }

    __real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'number' && ! Number.isNaN(x)) return x;
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

    to_str(hint = this.hint) {
        this.validators.unshift((x) => String(x));
        return require('./str').Str.of(hint, this.validators);
    }
}