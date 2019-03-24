const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier');

const ParameterList = {
  print: ({ node, path, print }) => {
    // don't insert softlines when there are no parameters
    if (node.parameters.length === 0) {
      return '';
    }
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
};

module.exports = ParameterList;
