const {
  doc: {
    builders: { concat, hardline, indent, join }
  }
} = require('prettier');

const AssemblySwitch = (node, path, options, print) => {
  let doc = join(hardline, path.map(print, 'cases'));
  return concat([
    'switch ',
    path.call(print, 'expression'),
    indent(hardline),
    indent(doc)
  ]);
};

module.exports = AssemblySwitch;
