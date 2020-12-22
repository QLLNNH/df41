'use strict';
const R = require('ramda');
const { define, Arr, Boo, Num, Obj, Str, Time } = require('../index');


try {
    const bank = define({
        n: Time.of().default('-99')
    })();

    bank.n = '2019-10-10T00:00:00.000Z';
    console.log(bank.n);
    console.log(bank);
}
catch (err) {
    console.error(err.message || err);
}

