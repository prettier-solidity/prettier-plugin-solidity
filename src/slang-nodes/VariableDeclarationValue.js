import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

export const VariableDeclarationValue = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    equal: ast.equal.text,
    expression: parse(ast.expression, options, parse)
  }),
  print: ({ node, path, print }) =>
    node.expression.variant.kind === 'ArrayExpression'
      ? [` ${node.equal} `, path.call(print, 'expression')]
      : group([
          ` ${node.equal}`,
          indent([line, path.call(print, 'expression')])
        ])
};
