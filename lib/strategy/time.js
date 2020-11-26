'use strict';

exports.Time = class Time extends require('./strategy') {

    constructor(hint = 'Time Error', before = []) {
        super();
        this.hint = hint;
        this.catcher = this.__get_catch();
        this.validators = [this.__real()].concat(before);
    }

    static of(hint, before, catcher) {
        return new Time(hint, before, catcher);
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
            if (x instanceof Date && x.toString() !== 'Invalid Date') return x;
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