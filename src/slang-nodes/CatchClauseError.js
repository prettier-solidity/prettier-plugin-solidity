import { doc } from 'prettier';

const { group } = doc.builders;

export const CatchClauseError = {
  parse: ({ offsets, ast, options, parse }) => ({
    name: ast.name?.text,
    parameters: parse(ast.parameters, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.name ? node.name : '',
    group(path.call(print, 'parameters')),
    ' '
  ]
};
