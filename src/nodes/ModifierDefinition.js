const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const ModifierDefinition = {
  print: ({ node, path, print }) => {
    let parts = ['modifier ', node.name];

    if (node.parameters && node.parameters.parameters) {
      // if node.paremeters is an object, print parameter list
      parts.push('(');
      parts = parts.concat(path.call(print, 'parameters'));
      parts.push(') ');
    } else if (node.parameters && node.parameters.length === 0) {
      // if node.paremeters is an empty array, don't print parentheses
      parts.push(' ');
    } else {
      // otherwise, throw a not implemented error
      throw new Error('[ModifierDefinition] Scenario not implemented');
    }

    parts.push(path.call(print, 'body'));

    return concat(parts);
  }
};

module.exports = ModifierDefinition;
