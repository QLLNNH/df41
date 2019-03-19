'use strict';
const R = require('ramda');

function forge(schema) {

    const material = new Map();

    Object.keys(schema).forEach((key) => {
        if (Object.prototype.toString.call(schema[key]) !== '[object Aegis]') throw 'need Aegis object';
        else material.set(key, R.compose(...schema[key].validators));
    });

    return () => {
        return new Proxy({}, {
            set(tar, k, v, proxy) {
                if (material.has(k)) v = material.get(k).call(tar, v);
                return Reflect.set(tar, k, v, proxy);
            }
        });
    };
}

module.exports = { forge };