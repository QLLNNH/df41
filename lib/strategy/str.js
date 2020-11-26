'use strict';

exports.Str = class Str extends require('./strategy') {

    constructor(hint = 'Str Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this.__get_catch();
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before, catcher) {
        return new Str(hint, before, catcher);
    }

    catch(v) {
        this.catcher = () => v;
        return this;
    }

    __get_catch() {
        return () => {
            throw this.hint;
        };
    }

    __real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'string') return x;
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

    in(arrar, hint = this.hint) {
        this.validators.unshift((x) => {
            if (arrar.includes(x)) return x;
            else throw hint;
        });
        return this;
    }

    nin(arrar, hint = this.hint) {
        this.validators.unshift((x) => {
            if (! arrar.includes(x)) return x;
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

    match(pattern, hint = this.hint) {
        this.validators.unshift((x) => {
            if (pattern.test(x)) return x;
            else throw hint;
        });
        return this;
    }

    mismatch(pattern, hint = this.hint) {
        this.validators.unshift((x) => {
            if (! pattern.test(x)) return x;
            else throw hint;
        });
        return this;
    }

    trim(hint = this.hint) {
        this.validators.unshift((x) => x.trim());
        return this;
    }

    to_lower_case(hint = this.hint) {
        this.validators.unshift((x) => x.toLowerCase());
        return this;
    }

    to_upper_case(hint = this.hint) {
        this.validators.unshift((x) => x.toUpperCase());
        return this;
    }

    extend(fn) {
        this.validators.unshift((x) => fn.call(this, x));
        return this;
    }

    split(separator, hint = this.hint) {
        this.validators.unshift((x) => x.split(separator));
        return require('./arr').Arr.of(hint, this.validators);
    }

    to_num(hint = this.hint) {
        this.validators.unshift((x) => Number(x));
        return require('./num').Num.of(hint, this.validators);
    }
}