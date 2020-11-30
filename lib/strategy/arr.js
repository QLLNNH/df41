'use strict';

exports.Arr = class Arr extends require('./strategy') {

    constructor(hint = 'Arr Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this.__get_catch();
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before, catcher) {
        return new Arr(hint, before, catcher);
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
        return require('./str').Str.of(hint, this.validators);
    }
}