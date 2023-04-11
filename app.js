/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
}