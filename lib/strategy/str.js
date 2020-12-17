'use strict';

exports.Str = class Str extends require('./strategy') {

    constructor(hint = 'Str Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this._catcher();
        this.validators = before.concat([this._real()]);
    }

    static of(hint, before) {
        return new Str(hint, before);
    }

    _real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'string') return x;
            else throw hint;
        };
    }

    _catcher() {
        return (err) => {
            throw err ?? this.hint;
        };
    }

    init(v) {
        this.defaut_value = v;
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
            if (min <= x.length && x.length <= max) return x;
            else throw hint;
        });
        return this;
    }

    eq(target, hint = this.hint) {
        this.validators.push((x) => {
            if (x === target) return x;
            else throw hint;
        });
        return this;
    }

    neq(target, hint = this.hint) {
        this.validators.push((x) => {
            if (x !== target) return x;
            else throw hint;
        });
        return this;
    }

    in(arrar, hint = this.hint) {
        this.validators.push((x) => {
            if (arrar.includes(x)) return x;
            else throw hint;
        });
        return this;
    }

    nin(arrar, hint = this.hint) {
        this.validators.push((x) => {
            if (! arrar.includes(x)) return x;
            else throw hint;
        });
        return this;
    }

    match(pattern, hint = this.hint) {
        this.validators.push((x) => {
            if (pattern.test(x)) return x;
            else throw hint;
        });
        return this;
    }

    mismatch(pattern, hint = this.hint) {
        this.validators.push((x) => {
            if (! pattern.test(x)) return x;
            else throw hint;
        });
        return this;
    }

    trim(hint = this.hint) {
        this.validators.push((x) => x.trim());
        return this;
    }

    to_lower_case(hint = this.hint) {
        this.validators.push((x) => x.toLowerCase());
        return this;
    }

    to_upper_case(hint = this.hint) {
        this.validators.push((x) => x.toUpperCase());
        return this;
    }

    extend(fn) {
        this.validators.push(function (x) {
            return fn.call(this, x);
        });
        return this;
    }

    split(separator, hint = this.hint) {
        this.validators.push((x) => x.split(separator));
        return require('./arr').Arr.of(hint, this.validators);
    }

    to_num(hint = this.hint) {
        this.validators.push((x) => Number(x));
        return require('./num').Num.of(hint, this.validators);
    }
}