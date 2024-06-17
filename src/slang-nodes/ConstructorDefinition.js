import { printFunction } from '../common/slang-helpers.js';

export const ConstructorDefinition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    constructorKeyword: ast.constructorKeyword.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    attributes: parse(ast.attributes, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printFunction(node.constructorKeyword, node, path, print)
};
