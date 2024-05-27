import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

export const ConditionalExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    questionMark: ast.questionMark.text,
    trueExpression: parse(ast.trueExpression, options, parse),
    colon: ast.colon.text,
    falseExpression: parse(ast.falseExpression, options, parse)
  }),
  print: ({ node, path, print }) =>
    group([
      path.call(print, 'operand'),
      indent([
        line,
        `${node.questionMark} `,
        path.call(print, 'trueExpression'),
        line,
        `${node.colon} `,
        path.call(print, 'falseExpression')
      ])
    ])
};
