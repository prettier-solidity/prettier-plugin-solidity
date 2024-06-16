import { printFunction } from '../common/slang-helpers.js';

export const FunctionDefinition = {
  parse: ({ ast, options, parse }) => ({
    functionKeyword: ast.functionKeyword.text,
    name: parse(ast.name, options, parse),
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),

  print: ({ node, path, print }) =>
    printFunction(
      [`${node.functionKeyword} `, path.call(print, 'name')],
      node,
      path,
      print
    )
};
