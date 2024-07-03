import { doc } from 'prettier';

const { group } = doc.builders;

export const Parameter = {
  parse: ({ offsets, ast, options, parse }) => ({
    typeName: parse(ast.typeName, options, parse, offsets),
    storageLocation: ast.storageLocation
      ? parse(ast.storageLocation, options, parse, offsets)
      : undefined,
    name: ast.name?.text
  }),
  print: ({ node, path, print }) =>
    group([
      path.call(print, 'typeName'),
      node.storageLocation ? ` ${path.call(print, 'storageLocation')}` : '',
      node.name ? ` ${node.name}` : ''
    ])
};
