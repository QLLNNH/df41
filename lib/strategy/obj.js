'use strict';

exports.Obj = class Obj extends require('./strategy') {

    constructor(hint = 'Obj Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this._catcher();
        this.validators = before.concat([this._real()]);
    }

    static of(hint, before) {
        return new Obj(hint, before);
    }

    _real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (typeof x === 'object' && x !== null) return x;
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