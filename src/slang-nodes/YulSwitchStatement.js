import { doc } from 'prettier';

const { hardline } = doc.builders;

export const YulSwitchStatement = {
  parse: ({ ast, options, parse }) => ({
    switchKeyword: ast.switchKeyword.text,
    expression: parse(ast.expression, options, parse),
    cases: parse(ast.cases, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.switchKeyword,
    ' ',
    path.call(print, 'expression'),
    hardline,
    path.call(print, 'cases')
  ]
};
