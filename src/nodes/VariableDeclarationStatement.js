const {
  doc: {
    builders: { group }
  }
} = require('prettier');

const printSeparatedList = require('./print-separated-list');

const embraceVariables = (doc, embrace) => (embrace ? ['(', doc, ')'] : doc);

const initialValue = (node, path, print) =>
  node.initialValue ? [' = ', path.call(print, 'initialValue')] : '';

const VariableDeclarationStatement = {
  print: ({ node, path, print }) => {
    const startsWithVar =
      node.variables.filter((x) => x && x.typeName).length === 0;

    return group([
      startsWithVar ? 'var ' : '',
      embraceVariables(
        printSeparatedList(path.map(print, 'variables')),
        node.variables.length > 1 || startsWithVar
      ),
      initialValue(node, path, print),
      node.omitSemicolon ? '' : ';'
    ]);
  }
};

module.exports = VariableDeclarationStatement;
