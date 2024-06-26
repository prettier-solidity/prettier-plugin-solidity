import { printFunction } from '../common/slang-helpers.js';

export const UnnamedFunctionDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    functionKeyword: ast.functionKeyword.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    attributes: parse(ast.attributes, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printFunction(node.functionKeyword, node, path, print)
};
