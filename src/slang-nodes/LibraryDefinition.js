import { doc } from 'prettier';

const { group, line } = doc.builders;

export const LibraryDefinition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    libraryKeyword: ast.libraryKeyword.text,
    name: ast.name.text,
    openBrace: ast.openBrace.text,
    members: parse(ast.members, options, parse, offsets),
    closeBrace: ast.closeBrace.text
  }),
  print: ({ node, path, print }) => [
    group([`${node.libraryKeyword} ${node.name}`, line, node.openBrace]),
    path.call(print, 'members'),
    node.closeBrace
  ]
};
