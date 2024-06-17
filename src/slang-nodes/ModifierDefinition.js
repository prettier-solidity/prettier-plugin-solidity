import { printFunction } from '../common/slang-helpers.js';

export const ModifierDefinition = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    modifierKeyword: ast.modifierKeyword.text,
    name: ast.name.text,
    parameters: ast.parameters
      ? parse(ast.parameters, options, parse, offsets)
      : undefined,
    attributes: parse(ast.attributes, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printFunction(`${node.modifierKeyword} ${node.name}`, node, path, print)
};
