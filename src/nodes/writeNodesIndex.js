const dirToObject = require('dir-to-object');
const fs = require('fs');

function makeData() {
  const nodes = Object.keys(
    dirToObject(__dirname, { canAdd: data => data.print })
  ).reduce((accumulator, current) => {
    accumulator[current] = `require('./${current}.js')`;
    return accumulator;
  }, {});

  const data = `/* This file was automatically generated on ${new Date().toString()} */

  /* eslint-disable global-require */
  
  module.exports = ${JSON.stringify(nodes)};`;

  return data.replace(/["]+/g, '');
}

(() => {
  fs.writeFileSync(`${__dirname}/index.js`, makeData());
})();
