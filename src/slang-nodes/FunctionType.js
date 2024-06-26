import { printFunction } from '../common/slang-helpers.js';

export const FunctionType = {
  parse: ({ offsets, ast, options, parse }) => ({
    functionKeyword: ast.functionKeyword.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    attributes: parse(ast.attributes, options, parse, offsets),
    returns: ast.returns
      ? parse(ast.returns, options, parse, offsets)
      : undefined
  }),
  print: ({ node, path, print }) =>
    printFunction(`${node.functionKeyword} `, node, path, print)
};
