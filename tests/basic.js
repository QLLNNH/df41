'use strict';
const { convert, Arr, Str, Num, Obj, Boo } = require('../index');
const fn = function (x) {
    if (x !== this.age) return x;
    else throw `${x} === ${this.age}`;
};
const schema = {
    age: Num.of(),
    name: Str.of('name').lt(5).extend(fn).to_upper_case()
};

const bank = convert(schema)();

bank.age = 100;
bank.name = 'edad';

console.log(bank);