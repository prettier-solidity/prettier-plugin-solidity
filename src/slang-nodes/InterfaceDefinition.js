import { doc } from 'prettier';

const { group, line } = doc.builders;

export const InterfaceDefinition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    interfaceKeyword: ast.interfaceKeyword.text,
    name: ast.name.text,
    inheritance: ast.inheritence
      ? parse(ast.inheritance, options, parse, offsets)
      : undefined,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse, offsets),
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
