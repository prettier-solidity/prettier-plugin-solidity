import { doc } from 'prettier';

const { group, line } = doc.builders;

export const InterfaceDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    interfaceKeyword: ast.interfaceKeyword.text,
    name: ast.name.text,
    inheritance: ast.inheritence
      ? parse(ast.inheritance, options, parse)
      : undefined,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    group([
      `${node.interfaceKeyword} ${node.name}`,
      node.inheritance ? path.call(print, 'inheritance') : line,
      node.openBrace
    ]),
    path.call(print, 'members'),
    node.closeBrace
  ]
};
