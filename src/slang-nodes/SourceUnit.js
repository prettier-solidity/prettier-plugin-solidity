import { doc } from 'prettier';

const { line } = doc.builders;

export const SourceUnit = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    members: parse(ast.members, options, parse, offsets)
  }),
  print: ({ options, path, print }) => [
    path.call(print, 'members'),
    options.parentParser ? '' : line
  ]
};
