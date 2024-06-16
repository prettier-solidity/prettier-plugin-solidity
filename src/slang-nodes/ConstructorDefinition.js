import { printFunction } from '../common/slang-helpers.js';

export const ConstructorDefinition = {
  parse: ({ ast, options, parse }) => ({
    constructorKeyword: ast.constructorKeyword.text,
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) =>
    printFunction(node.constructorKeyword, node, path, print)
};
