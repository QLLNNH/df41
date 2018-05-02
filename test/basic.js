'use strict';
const { hephaestus, Arr, Str, Num, Obj } = require('../index');

const schema = {
    name: Obj.of()
};

const aegis = hephaestus.forge(schema);

const bank = aegis();
bank.name = {};

console.log(bank);