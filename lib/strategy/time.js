'use strict';
const Strategy = require('./strategy');

exports.Time = class Time extends Strategy {

    constructor(hint = 'date check error') {
        super();
        this.hint = hint;
        this.validators = [this.__real()];
    }

    static of(hint) {
        return new Time(hint);
    }

    __real(hint = this.hint) {
        return (x) => {
            this.primitive = x;
            if (x.toString() !== 'Invalid Date') return x;
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