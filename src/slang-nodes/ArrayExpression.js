import { doc } from 'prettier';

const { group } = doc.builders;

export const ArrayExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    openBracket: ast.openBracket.text,
    items: parse(ast.items, options, parse, offsets),
    closeBracket: ast.closeBracket.text
  }),
  print: ({ node, path, print }) =>
    group([node.openBracket, path.call(print, 'items'), node.closeBracket])
};
