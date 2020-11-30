'use strict';
const R = require('ramda');
const { define, Arr, Boo, Num, Obj, Str, Time } = require('../index');


try {
    const bank = define({
        k: Str.of('str err').gt(0, 'gt err')
    })();

    bank.k = '';
    console.log(bank);
}
catch (err) {
    console.error(err.message || err);
}

