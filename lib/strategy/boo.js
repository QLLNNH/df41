'use strict';

exports.Boo = class Boo extends require('./strategy') {

    constructor(hint = 'Boo Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this._catcher();
        this.validators = before.concat([this._real()]);
    }

    static of(hint, before) {
        return new Boo(hint, before);
    }

    _real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'boolean') return x;
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

    extend(fn) {
        this.validators.push(function (x) {
            return fn.call(this, x);
        });
        return this;
    }
}