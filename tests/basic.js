'use strict';
const R = require('ramda');
const { define, Arr, Boo, Num, Obj, Str, Time } = require('../index');


try {
    const bank = define({
        n: Num.of().default(100)
    })();

    bank.n = undefined;
    console.log(bank.n);
    console.log(bank);
}
catch (err) {
    console.error(err.message || err);
}

