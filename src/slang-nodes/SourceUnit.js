import { doc } from 'prettier';

const { line } = doc.builders;

export const SourceUnit = {
  parse: ({ ast, options, parse }) => ({
    members: parse(ast.members, options, parse)
  }),
  print: ({ options, path, print }) => [
    path.call(print, 'members'),
    options.parentParser ? '' : line
  ]
};
