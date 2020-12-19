'use strict';

exports.Arr = class Arr extends require('./strategy') {

    constructor(hint = 'Arr Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this._catcher();
        this.validators = before.concat([this._real()]);
    }

    static of(hint, before) {
        return new Arr(hint, before);
    }

    _real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (Array.isArray(x)) return x;
            else throw hint;
        };
    }

    _catcher() {
        return (err) => {
            throw err ?? this.hint;
        };
    }

    default(v, ignore_none = true) {
        this.ignore_none = ignore_none;
        this.default_value = v;
        return this;
    }

    catch(v) {
        this.catcher = () => v;
        return this;
    }

    origin() {
        this.validators.push((x) => this.primitive);
        return this;
    }

    eq(length, hint = this.hint) {
        this.validators.push((x) => {
            if (x.length === length) return x;
            else throw hint;
        });
        return this;
    }

    gt(length, hint = this.hint) {
        this.validators.push((x) => {
            if (x.length > length) return x;
            else throw hint;
        });
        return this;
    }

    gte(length, hint = this.hint) {
        this.validators.push((x) => {
            if (x.length >= length) return x;
            else throw hint;
        });
        return this;
    }

    lt(length, hint = this.hint) {
        this.validators.push((x) => {
            if (x.length < length) return x;
            else throw hint;
        });
        return this;
    }

    lte(length, hint = this.hint) {
        this.validators.push((x) => {
            if (x.length <= length) return x;
            else throw hint;
        });
        return this;
    }

    extend(fn) {
        this.validators.push(function (x) {
            return fn.call(this, x);
        });
        return this;
    }

    join(separator, hint = this.hint) {
        this.validators.push((x) => x.join(separator));
        return require('./str').Str.of(hint, this.validators);
    }
}