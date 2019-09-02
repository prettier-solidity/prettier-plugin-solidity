const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const modifierParameters = (node, path, print) => {
  if (node.parameters) {
    if (node.parameters.length > 0) {
      return group(
        concat([
          '(',
          indent(
            concat([
              softline,
              join(concat([',', line]), path.map(print, 'parameters'))
            ])
          ),
          softline,
          ')'
        ])
      );
    }

    return '()';
  }

  return '';
};

const ModifierDefinition = {
  print: ({ node, path, print }) =>
    concat([
      'modifier ',
      node.name,
      modifierParameters(node, path, print),
      ' ',
      path.call(print, 'body')
    ])
};

module.exports = ModifierDefinition;
