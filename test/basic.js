'use strict';
const { hephaestus, Arr, Str, Num, Obj, Boo } = require('../index');

const schema = {
    name: Boo.of()
};

const aegis = hephaestus.forge(schema);

const bank = aegis();
bank.name = true;

console.log(bank);