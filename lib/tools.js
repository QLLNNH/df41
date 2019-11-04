'use strict';
const R = require('ramda');
const checker = Object.prototype.toString;

function convert(schema) {
    const bank = new Map();

    Object.keys(schema).forEach((key) => {
        if (checker.call(schema[key]) !== '[object DF41]') throw 'Schema\'s value must be a Strategy';
        else bank.set(key, R.compose(...schema[key].validators));
    });

    return () => {
        return new Proxy({}, {
            set(tar, k, v, proxy) {
                if (bank.has(k)) v = bank.get(k).call(tar, v);
                return Reflect.set(tar, k, v, proxy);
            }
        });
    };
}

module.exports = { convert };