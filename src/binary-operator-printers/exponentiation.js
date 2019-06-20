const {
  doc: {
    builders: { group, concat, indent, softline }
  }
} = require('prettier');

module.exports = {
  match: op => op === '**',
  print: (node, path, print) => {
    return group(
      indent(
        concat([
          path.call(print, 'left'),
          node.operator,
          softline,
          path.call(print, 'right')
        ])
      )
    );
  }
};
