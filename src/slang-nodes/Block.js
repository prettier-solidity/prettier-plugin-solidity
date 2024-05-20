import { doc } from 'prettier';

const { hardline, indent } = doc.builders;

export const Block = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    openBrace: ast.openBrace.text,
    statements: parse(ast.statements, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    node.openBrace,
    indent([hardline, path.call(print, 'statements')]),
    hardline,
    node.closeBrace
  ]
};
