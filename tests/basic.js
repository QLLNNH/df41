'use strict';
const R = require('ramda');
const { define, Arr, Boo, Num, Obj, Str, Time } = require('../index');


try {
    const bank = define({
        n: Num.of().range([1.1, 33], 'n length error'),
    })();

    bank.n = 1.1;
    console.log(bank.n);
    console.log(bank);
}
catch (err) {
    console.error(err.message || err);
}

