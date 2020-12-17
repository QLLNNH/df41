'use strict';
const R = require('ramda');
const { define, Arr, Boo, Num, Obj, Str, Time } = require('../index');


try {
    const bank = define({
        k: Num.of('k err').gt(3),
        m: Num.of().gt(3).init(1).catch('100')
    })();

    bank.k = 4;
    bank.m = 's';
    console.log(bank.k);
    console.log(bank.m);
    console.log(bank);
}
catch (err) {
    console.error(err.message || err);
}

