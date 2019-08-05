const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier/standalone');

const VariableDeclarationStatement = {
  print: ({ node, path, print }) => {
    const startsWithVar =
      node.variables.filter(x => x && x.typeName).length === 0;

    let doc = join(
      ', ',
      path.map(statementPath => print(statementPath), 'variables')
    );

    if (node.variables.length > 1 || startsWithVar) {
      doc = concat(['(', doc, ')']);
    }

    if (node.initialValue) {
      doc = concat([doc, ' = ', path.call(print, 'initialValue')]);
    }
    return concat([
      startsWithVar ? 'var ' : '',
      doc,
      node.omitSemicolon ? '' : ';'
    ]);
  }
};

module.exports = VariableDeclarationStatement;
