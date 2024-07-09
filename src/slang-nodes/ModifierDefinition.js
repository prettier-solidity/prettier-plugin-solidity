import { printFunction } from '../common/slang-helpers.js';

export const ModifierDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    modifierKeyword: ast.modifierKeyword.text,
    name: ast.name.text,
    parameters: ast.parameters
      ? parse(ast.parameters, options, parse, offsets)
      : {
          kind: 'ParametersDeclaration',
          loc: { start: offsets[0], end: offsets[0] },
          openParen: '(',
          parameters: {
            kind: 'Parameters',
            loc: { start: offsets[0], end: offsets[0] },
            items: [],
            separators: []
          },
          closeParen: ')'
        },
    attributes: parse(ast.attributes, options, parse, offsets),
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    printFunction(`${node.modifierKeyword} ${node.name}`, node, path, print)
};
