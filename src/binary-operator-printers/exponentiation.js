const {
  doc: {
    builders: { group, concat, ifBreak, indent, softline }
  }
} = require('prettier');

module.exports = {
  match: op => op === '**',
  print: (node, path, print) => {
    return group(
      indent(
        concat([
          path.call(print, 'left'),
          ifBreak(' ', ''),
          node.operator,
          softline,
          path.call(print, 'right')
        ])
      )
    );
  }
};
