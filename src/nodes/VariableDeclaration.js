import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.ts';

const { group, indent, line } = doc.builders;

function isStateVariableDeclarationVariable(node) {
  return node.override !== undefined && node.isImmutable !== undefined;
}

const indexed = (node) => (node.isIndexed ? ' indexed' : '');

const visibility = (node) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const constantKeyword = (node) => (node.isDeclaredConst ? ' constant' : '');

const storageLocation = (node) =>
  node.storageLocation && node.visibility !== 'default'
    ? [line, node.storageLocation]
    : '';

const immutable = (node) =>
  isStateVariableDeclarationVariable(node) && node.isImmutable
    ? ' immutable'
    : '';

const override = (node, path, print) => {
  if (!isStateVariableDeclarationVariable(node) || !node.override) return '';
  return [
    line,
    'override',
    node.override.length === 0
      ? ''
      : ['(', printSeparatedList(path.map(print, 'override')), ')']
  ];
};

const name = (node) => (node.name ? [' ', node.name] : '');

export const VariableDeclaration = {
  print: ({ node, path, print }) =>
    node.typeName
      ? group([
          path.call(print, 'typeName'),
          indent([
            indexed(node),
            visibility(node),
            constantKeyword(node),
            storageLocation(node),
            immutable(node),
            override(node, path, print),
            name(node)
          ])
        ])
      : node.name
};
