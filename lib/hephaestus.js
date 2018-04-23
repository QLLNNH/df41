'use strict';

function forge(schema) {
    const validators = new Map();

    Object.keys(schema).forEach((k) => {
        if (! Array.isArray(schema[k])) throw 'strategies must be a array';

        const middlewares = schema[k].filter((strategy) => {
            if (typeof strategy === 'function') return true;
        });

        if (middlewares.length) validators.set(k, middlewares);
    });

    return () => {
        return new Proxy({}, {
            set(...tetrad) {
                const [, k, v] = tetrad;

                if (validators.has(k)) {
                    const middlewares = validators.get(k);
                    middlewares.forEach((middleware) => middleware(v));
                }

                return Reflect.set(...tetrad);
            }
        });
    }
}

module.exports = { forge: forge }