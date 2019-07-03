const prettier = require('prettier');
const fs = require('fs');
const makeData = require('./makeData');

if (process.env.SCRIPT === 'true') {
  prettier.resolveConfig(`${__dirname}../.prettierrc`).then(options => {
    options.parser = 'babel';
    ['../src/nodes', '../src/binary-operator-printers'].forEach(dir => {
      fs.writeFileSync(
        `${__dirname}/${dir}/index.js`,
        prettier.format(makeData(dir), options)
      );
    });
  });
}
