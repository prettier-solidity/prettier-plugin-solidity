const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const printList = require('./print-list');

const embraceVariables = (doc, embrace) =>
  embrace ? concat(['(', doc, ')']) : doc;

const initialValue = (node, path, print) =>
  node.initialValue ? concat([' = ', path.call(print, 'initialValue')]) : '';

const VariableDeclarationStatement = {
  print: ({ node, path, print }) => {
    const startsWithVar =
      node.variables.filter(x => x && x.typeName).length === 0;

    return concat([
      startsWithVar ? 'var ' : '',
      embraceVariables(
        printList(path.map(print, 'variables')),
        node.variables.length > 1 || startsWithVar
      ),
      initialValue(node, path, print),
      node.omitSemicolon ? '' : ';'
    ]);
  }
};

module.exports = VariableDeclarationStatement;
