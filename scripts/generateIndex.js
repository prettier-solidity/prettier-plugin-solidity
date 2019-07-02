const prettier = require('prettier');
const dirToObject = require('dir-to-object');
const fs = require('fs');

function makeData(dir) {
  const nodes = Object.keys(
    dirToObject(`${__dirname}/${dir}`, { canAdd: data => data.print })
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
  ['../src/nodes', '../src/binary-operator-printers'].forEach(dir => {
    prettier.resolveConfig(`${__dirname}../.prettierrc`).then(options => {
      options.parser = 'babel';
      fs.writeFileSync(
        `${__dirname}/${dir}/index.js`,
        prettier.format(makeData(dir), options)
      );
    });
  });
})();
