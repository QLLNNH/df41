'use strict';
const R = require('ramda');

function define(schema) {
    Object.keys(schema).forEach((key) => {
        if (Object.prototype.toString.call(schema[key]) !== '[object DF41]')
            throw 'Schema\'s value must be a Strategy';
    });

    return () => {
        return new Proxy({}, {
            set(tar, k, v, proxy) {
                if (v === null || v === undefined) return true;
                if (schema.hasOwnProperty(k)) v = R.tryCatch(R.pipe(...schema[k].validators), schema[k].catcher).call(tar, v);
                return Reflect.set(tar, k, v, proxy);
            },
            get(tar, k, proxy) {
                return tar[k] ?? schema?.[k]?.['defaut_value'];
            }
        });
    };
}

module.exports = { define };