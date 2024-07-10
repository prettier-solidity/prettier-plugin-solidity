import { doc } from 'prettier';

const { group, indent, indentIfBreak, line } = doc.builders;

let groupIndex = 0;
export const VariableDeclarationStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    variableType: parse(ast.variableType, options, parse, offsets),
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse, offsets)
      : undefined,
    name: ast.name.text,
    value: ast.value ? parse(ast.value, options, parse, offsets) : undefined,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => {
    const declarationDoc = group(
      [
        path.call(print, 'variableType'),
        indent([
          node.storageLocation
            ? [line, path.call(print, 'storageLocation')]
            : '',
          ` ${node.name}`
        ])
      ],
      { id: `VariableDeclarationStatement.variables-${groupIndex}` }
    );
    groupIndex += 1;

    return [
      declarationDoc,
      indentIfBreak(node.value ? path.call(print, 'value') : '', {
        groupId: declarationDoc.id
      }),
      node.semicolon
    ];
  }
};
