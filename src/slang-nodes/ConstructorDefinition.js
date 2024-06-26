import { printFunction } from '../common/slang-helpers.js';

export const ConstructorDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    constructorKeyword: ast.constructorKeyword.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    attributes: parse(ast.attributes, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printFunction(node.constructorKeyword, node, path, print)
};
