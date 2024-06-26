import { printFunction } from '../common/slang-helpers.js';

export const FunctionDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    functionKeyword: ast.functionKeyword.text,
    name: parse(ast.name, options, parse, offsets),
    parameters: parse(ast.parameters, options, parse, offsets),
    attributes: parse(ast.attributes, options, parse, offsets),
    returns: ast.returns
      ? parse(ast.returns, options, parse, offsets)
      : undefined,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printFunction(
      [`${node.functionKeyword} `, path.call(print, 'name')],
      node,
      path,
      print
    )
};
