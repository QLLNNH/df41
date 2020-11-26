'use strict';
const R = require('ramda');

function define(schema) {
    const bank = new Map();

    Object.keys(schema).forEach((key) => {
        if (Object.prototype.toString.call(schema[key]) !== '[object DF41]') throw 'Schema\'s value must be a Strategy';
        else bank.set(key, R.tryCatch(R.compose(...schema[key].validators), schema[key].catcher));
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

module.exports = { define };