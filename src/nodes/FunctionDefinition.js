const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const FunctionDefinition = {
  print: ({ node, path, print }) => {
    let doc; // info: no need to use the "global doc" ?!?
    if (node.isConstructor) {
      if (node.name) {
        doc = `function ${node.name}`;
      } else {
        doc = 'constructor';
      }
    } else if (node.name === '') {
      doc = 'function';
    } else {
      doc = concat(['function ', node.name]);
    }

    doc = concat([doc, '(', path.call(print, 'parameters'), ')']);
    if (node.visibility && node.visibility !== 'default') {
      doc = join(' ', [doc, node.visibility]);
    }
    // @TODO: check stateMutability null vs default
    if (node.stateMutability && node.stateMutability !== 'default') {
      doc = join(' ', [doc, node.stateMutability]);
    }
    if (node.modifiers.length > 0) {
      doc = join(' ', [doc, join(' ', path.map(print, 'modifiers'))]);
    }
    if (node.returnParameters) {
      doc = join(' ', [
        doc,
        concat(['returns(', path.call(print, 'returnParameters'), ')'])
      ]);
    }
    if (node.body) {
      return concat([join(' ', [doc, path.call(print, 'body')])]);
    }
    return concat([doc, ';']);
  }
};

module.exports = FunctionDefinition;
