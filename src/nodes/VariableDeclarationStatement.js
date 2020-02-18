const {
  doc: {
    builders: { concat, group, indent, join, line, softline }
  }
} = require('prettier/standalone');

const embraceVariables = (doc, embrace) =>
  embrace ? concat(['(', doc, ')']) : doc;

const variables = (node, path, print) =>
  group(
    concat([
      indent(
        concat([
          softline,
          join(
            concat([',', line]),
            path.map(statementPath => print(statementPath), 'variables')
          )
        ])
      ),
      softline
    ])
  );

const initialValue = (node, path, print) =>
  node.initialValue ? concat([' = ', path.call(print, 'initialValue')]) : '';

const VariableDeclarationStatement = {
  print: ({ node, path, print }) => {
    const startsWithVar =
      node.variables.filter(x => x && x.typeName).length === 0;

    return concat([
      startsWithVar ? 'var ' : '',
      embraceVariables(
        variables(node, path, print),
        node.variables.length > 1 || startsWithVar
      ),
      initialValue(node, path, print),
      node.omitSemicolon ? '' : ';'
    ]);
  }
};

module.exports = VariableDeclarationStatement;
