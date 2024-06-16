import { printFunction } from '../common/slang-helpers.js';

export const FunctionType = {
  parse: ({ ast, options, parse }) => ({
    functionKeyword: ast.functionKeyword.text,
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined
  }),
  print: ({ node, path, print }) =>
    printFunction(`${node.functionKeyword} `, node, path, print)
};
