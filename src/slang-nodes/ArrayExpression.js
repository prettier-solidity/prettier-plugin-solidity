import { doc } from 'prettier';

const { group } = doc.builders;

export const ArrayExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openBracket: ast.openBracket.text,
    items: parse(ast.items, options, parse),
    closeBracket: ast.closeBracket.text
  }),
  print: ({ node, path, print }) =>
    group([node.openBracket, path.call(print, 'items'), node.closeBracket])
};
