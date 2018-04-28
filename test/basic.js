'use strict';
const { hephaestus, Arr, Str, Num } = require('../index');

const schema = {
    name: Str.of().split(' ').limited_length(2).join('').eq('hw')
};

const aegis = hephaestus.forge(schema);

const bank = aegis();
bank.name = 'h w';

console.log(bank);