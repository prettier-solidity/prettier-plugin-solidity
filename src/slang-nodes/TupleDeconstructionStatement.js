import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

export const TupleDeconstructionStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    varKeyword: ast.varKeyword?.text,
    openParen: ast.openParen.text,
    elements: parse(ast.elements, options, parse, offsets),
    closeParen: ast.closeParen.text,
    equal: ast.equal.text,
    expression: parse(ast.expression, options, parse, offsets),
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    node.varKeyword ? node.varKeyword : '',
    node.openParen,
    path.call(print, 'elements'),
    node.expression.variant.kind === 'TupleExpression'
      ? [`${node.closeParen} ${node.equal} `, path.call(print, 'expression')]
      : group([
          `${node.closeParen} ${node.equal}`,
          indent([line, path.call(print, 'expression'), node.semicolon])
        ])
  ]
};
