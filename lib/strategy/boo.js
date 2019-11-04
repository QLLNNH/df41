'use strict';
const Strategy = require('./strategy');

exports.Boo = class Boo extends Strategy {

    constructor(hint = 'boolean check error') {
        super();
        this.hint = hint;
        this.validators = [this.__real()];
    }

    static of(hint) {
        return new Boo(hint);
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
        this.validators.unshift(function (x) {
            return fn.call(this, x);
        });
        return this;
    }
};