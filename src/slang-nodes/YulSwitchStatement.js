import { doc } from 'prettier';

const { hardline } = doc.builders;

export const YulSwitchStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    switchKeyword: ast.switchKeyword.text,
    expression: parse(ast.expression, options, parse, offsets),
    cases: parse(ast.cases, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.switchKeyword,
    ' ',
    path.call(print, 'expression'),
    hardline,
    path.call(print, 'cases')
  ]
};
