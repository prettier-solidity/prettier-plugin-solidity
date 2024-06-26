import { printFunction } from '../common/slang-helpers.js';

export const ReceiveFunctionDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    receiveKeyword: ast.receiveKeyword.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    attributes: parse(ast.attributes, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printFunction(node.receiveKeyword, node, path, print)
};
