'use strict';
const { hephaestus, Arr, Str, Num, Obj } = require('../index');

const schema = {
    name: Str.of().trim().non_empty().origin()
};

const aegis = hephaestus.forge(schema);

const bank = aegis();
bank.name = ' xushen';

console.log(bank);