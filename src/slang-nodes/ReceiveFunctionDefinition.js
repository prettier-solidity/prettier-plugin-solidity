import { printFunction } from '../common/slang-helpers.js';

export const ReceiveFunctionDefinition = {
  parse: ({ ast, options, parse }) => ({
    receiveKeyword: ast.receiveKeyword.text,
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) =>
    printFunction(node.receiveKeyword, node, path, print)
};
