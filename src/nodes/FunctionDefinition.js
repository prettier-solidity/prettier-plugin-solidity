const {
  doc: {
    builders: { concat, group, indent, join, line }
  }
} = require('prettier');

const FunctionDefinition = {
  print: ({ node, path, print }) => {
    let parts = [];

    if (node.isConstructor) {
      if (node.name) {
        parts.push(`function ${node.name}`);
      } else {
        parts.push('constructor');
      }
    } else if (node.name === '') {
      parts.push('function');
    } else {
      parts = parts.concat(['function ', node.name]);
    }

    parts = parts.concat(['(', path.call(print, 'parameters'), ')']);

    let modifiers = [];
    if (node.visibility && node.visibility !== 'default') {
      modifiers.push(node.visibility);
    }
    // @TODO: check stateMutability null vs default
    if (node.stateMutability && node.stateMutability !== 'default') {
      modifiers.push(node.stateMutability);
    }
    if (node.modifiers.length > 0) {
      modifiers = modifiers.concat(path.map(print, 'modifiers'));
    }
    if (node.returnParameters) {
      modifiers.push(
        concat(['returns (', path.call(print, 'returnParameters'), ')'])
      );
    }

    if (modifiers.length > 0) {
      parts.push(
        group(
          concat(
            [
              indent(line),
              join(indent(line), modifiers),
              node.body ? line : null
            ].filter(x => x)
          )
        )
      );
    } else if (node.body) {
      parts.push(' ');
    }

    if (node.body) {
      parts.push(path.call(print, 'body'));
    } else {
      parts.push(';');
    }

    return concat(parts);
  }
};

module.exports = FunctionDefinition;
