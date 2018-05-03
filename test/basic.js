'use strict';
const { hephaestus, Arr, Str, Num, Obj, Boo } = require('../index');

const schema = {
    name: Boo.of()
};

const bank = hephaestus.forge(schema)();

bank.name = true;

console.log(bank);