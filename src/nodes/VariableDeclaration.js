import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { group, indent, line } = doc.builders;

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

const immutable = (node) => (node.isImmutable ? ' immutable' : '');

const transient = (node) => (node.isTransient ? ' transient' : '');

const override = (node, path, print) => {
  if (!node.override) return '';
  if (node.override.length === 0) return [line, 'override'];
  return [
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
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
            transient(node),
            override(node, path, print),
            name(node)
          ])
        ])
      : node.name
};
