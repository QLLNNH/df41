'use strict';
const { convert, Arr, Str, Num, Obj, Boo, Time } = require('../index');

const schema = {
    ts: Time.of()
};

const bank = convert(schema)();
bank.ts = new Date('2015-01');

console.log(bank);