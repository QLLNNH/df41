'use strict';
const { hephaestus, strategies: { Arr, Str, Num } } = require('../index');

const schema = {
    name: Str.of().non_empty()
    , age: Num.of().condition(f).eq('17', 'eq error')
};

const aegis = hephaestus.forge(schema);

const bank = aegis();

bank.name = 'xd';
bank.age = '17';

console.log(bank);

function f(x) {
    if (this.name === 'xushen') {
        if (x === '18') throw 'f error';
    }
}