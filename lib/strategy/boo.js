'use strict';

exports.Boo = class Boo extends require('./strategy') {

    constructor(hint = 'Boo Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this.__get_catch();
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before, catcher) {
        return new Boo(hint, before, catcher);
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
            if (typeof x === 'boolean') return x;
            else throw hint;
        };
    }

    origin() {
        this.validators.unshift((x) => this.primitive);
        return this;
    }

    extend(fn) {
        this.validators.unshift((x) => fn.call(this, x));
        return this;
    }
}