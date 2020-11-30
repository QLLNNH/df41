'use strict';
const R = require('ramda');
const { define, Arr, Boo, Num, Obj, Str, Time } = require('../index');


try {
    const bank = define({
        k: Str.of('str err').trim().eq(2, 'eq err')
    })();

    bank.k = '222';
    console.log(bank);
}
catch (err) {
    console.error(err.message || err);
}

