import { printFunction } from '../common/slang-helpers.js';

export const FallbackFunctionDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    fallbackKeyword: ast.fallbackKeyword.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    attributes: parse(ast.attributes, options, parse, offsets),
    returns: ast.returns
      ? parse(ast.returns, options, parse, offsets)
      : undefined,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printFunction(node.fallbackKeyword, node, path, print)
};
