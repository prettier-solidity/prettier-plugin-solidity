const {
  doc: {
    builders: { group, concat, indent, line, softline }
  }
} = require('prettier');

module.exports = {
  match: op => op === '**',
  print: (node, path, print, options) => {
    return group(
      indent(
        concat([
          path.call(print, 'left'),
          options.spacedExp ? ' ' : '',
          node.operator,
          options.spacedExp ? line : softline,
          path.call(print, 'right')
        ])
      )
    );
  }
};
