'use strict';
const { hephaestus, strategies: { Arr, Str, Num } } = require('../index');

const schema = {
    name: Str.of().non_empty().split(' ').fixed_length(2)
};

const aegis = hephaestus.forge(schema);

const bank = aegis();
bank.name = 'h w';


console.log(bank);