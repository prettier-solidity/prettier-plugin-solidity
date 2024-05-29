import { printFunction } from '../common/slang-helpers.js';

export const FallbackFunctionDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    fallbackKeyword: ast.fallbackKeyword.text,
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) =>
    printFunction(node.fallbackKeyword, node, path, print)
};
