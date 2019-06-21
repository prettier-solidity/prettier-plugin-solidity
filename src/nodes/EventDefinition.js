const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const parameters = (node, path, print) => {
  if (node.parameters && node.parameters.length > 0) {
    return group(
      concat([
        indent(
          concat([
            softline,
            join(concat([',', line]), path.map(print, 'parameters'))
          ])
        ),
        softline
      ])
    );
  }
  return '';
};

const EventDefinition = {
  print: ({ node, path, print }) =>
    concat(['event ', node.name, '(', parameters(node, path, print), ');'])
};

module.exports = EventDefinition;
