/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function makeFileText(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
    generateText(data);
    }
  });
}

async function makeURLText(url) {
  let res;

  try {
    res = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(res.data)
}

let [method, arg] = process.argv.slice(2);

if (method === "file") {
  makeFileText(arg);
} else if (method === "url") {
  makeURLText(arg);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}