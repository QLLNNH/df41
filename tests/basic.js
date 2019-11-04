'use strict';
const { convert, Arr, Str, Num, Obj, Boo } = require('../index');
const fn = function (x) {
    if (x !== this.age) return x;
    else throw `${x} === ${this.age}`;
};
const schema = {
    test: Str
        .of()
        .to_num().gte(10)
};

const bank = convert(schema)();
bank.name = 'hello';
bank.test = false;

console.log(bank);