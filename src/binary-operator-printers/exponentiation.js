const {
  doc: {
    builders: { group, concat, ifBreak, indent, softline }
  }
} = require('prettier/standalone');

module.exports = {
  match: op => op === '**',
  print: (node, path, print) => {
    return group(
      concat([
        path.call(print, 'left'),
        ifBreak(' ', ''),
        indent(concat([node.operator, softline, path.call(print, 'right')]))
      ])
    );
  }
};
