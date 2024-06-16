import { doc } from 'prettier';

const { group, line } = doc.builders;

export const ContractDefinition = {
  parse: ({ ast, options, parse }) => ({
    abstractKeyword: ast.abstractKeyword?.text,
    contractKeyword: ast.contractKeyword.text,
    name: ast.name.text,
    inheritance: ast.inheritance
      ? parse(ast.inheritance, options, parse)
      : undefined,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    group([
      node.abstractKeyword ? `${node.abstractKeyword} ` : '',
      `${node.contractKeyword} ${node.name}`,
      node.inheritance ? path.call(print, 'inheritance') : line,
      node.openBrace
    ]),
    path.call(print, 'members'),
    node.closeBrace
  ]
};
