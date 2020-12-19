'use strict';

exports.Num = class Num extends require('./strategy') {

    constructor(hint = 'Num Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this._catcher();
        this.validators = before.concat([this._real()]);
    }

    static of(hint, before) {
        return new Num(hint, before);
    }

    _real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'number' && ! Number.isNaN(x)) return x;
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

    range(range, hint = this.hint) {
        if (! Array.isArray(range)) throw 'range need [min, max]';
        const [min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER] = range;
        this.validators.push((x) => {
            if (min <= x && x <= max) return x;
            else throw hint;
        });
        return this;
    }

    ceil() {
        this.validators.push((x) => Math.ceil(x));
        return this;
    }

    floor() {
        this.validators.push((x) => Math.floor(x));
        return this;
    }

    neq(target, hint = this.hint) {
        this.validators.push((x) => {
            if (x !== target) return x;
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

    to_str(hint = this.hint) {
        this.validators.push((x) => String(x));
        return require('./str').Str.of(hint, this.validators);
    }
}