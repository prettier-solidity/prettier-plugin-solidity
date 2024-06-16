import { printFunction } from '../common/slang-helpers.js';

export const ModifierDefinition = {
  parse: ({ ast, options, parse }) => ({
    modifierKeyword: ast.modifierKeyword.text,
    name: ast.name.text,
    parameters: ast.parameters
      ? parse(ast.parameters, options, parse)
      : undefined,
    attributes: parse(ast.attributes, options, parse),
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) =>
    printFunction(`${node.modifierKeyword} ${node.name}`, node, path, print)
};
