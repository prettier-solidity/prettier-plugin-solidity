const {
  doc: {
    builders: { concat, hardline, indent, join }
  }
} = require('prettier/standalone');

const AssemblySwitch = {
  print: ({ path, print }) => {
    const doc = join(hardline, path.map(print, 'cases'));
    return concat([
      'switch ',
      path.call(print, 'expression'),
      indent(hardline),
      indent(doc)
    ]);
  }
};

module.exports = AssemblySwitch;
