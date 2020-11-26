'use strict';
const R = require('ramda');
const { define, Arr, Boo, Num, Obj, Str, Time } = require('../index');


try {
    const bank = define({
        k: Time.of('PDATE invalid').extend((x) => {
            if (x.getFullYear() < 2000) {
                throw 'PDATE < 2000';
            }
            else if (x.getFullYear() > new Date().getFullYear()) {
                throw 'PDATE too big';
            }
            return x;
        })
    })();

    bank.k = new Date();
    console.log(bank);
}
catch (err) {
    console.error(err.message || err);
}

