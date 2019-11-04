'use strict';
const { convert, Arr, Str, Num, Obj, Boo } = require('../index');

const schema = {
    age: Num
        .of('limit mistake').default(10)
        .ceil().gte(1, 'limit gte 1').lte(30, 'limit lte 30')
};

const bank = convert(schema)();
bank.age = 0.1;

console.log(bank);