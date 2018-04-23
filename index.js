'use strict';
const { STRING, NUMBER } = require('./lib/strategies');
const hephaistos = require('./lib/hephaistos');

const schema = {
    name: [STRING.real(), STRING.not_empty()]
    , age: [NUMBER.real(), NUMBER.range_c_c([3, 9])]
};

const aegis = hephaistos.forge(schema);

const bank = aegis();

bank.name = 'xushen';
bank.age = 3;

console.log(bank);