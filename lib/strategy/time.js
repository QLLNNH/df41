'use strict';

exports.Time = class Time extends require('./strategy') {

    constructor(hint = 'Time Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this._catcher();
        this.validators = before.concat([this._real()]);
    }

    static of(hint, before) {
        return new Time(hint, before);
    }

    _real(hint = this.hint) {
        return (x) => {
            x = new Date(x);
            this.primitive = x;
            if (x instanceof Date && x.toString() !== 'Invalid Date') return x;
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

    extend(fn) {
        this.validators.push(function (x) {
            return fn.call(this, x);
        });
        return this;
    }
}