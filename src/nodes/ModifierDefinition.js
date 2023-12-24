import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.ts';

const { group, hardline, indent, line } = doc.builders;

const modifierParameters = (node, path, print) => {
  if (node.parameters && node.parameters.length > 0) {
    // To keep consistency any list of parameters will split if it's longer than 2.
    // For more information see:
    // https://github.com/prettier-solidity/prettier-plugin-solidity/issues/256
    const shouldBreak = node.parameters.length > 2;
    return [
      '(',
      printSeparatedList(path.map(print, 'parameters'), {
        separator: [',', shouldBreak ? hardline : line],
        grouped: !shouldBreak
      }),
      ')'
    ];
  }

  return '()';
};

const virtual = (node) => (node.isVirtual ? [line, 'virtual'] : '');

const override = (node, path, print) => {
  if (!node.override) return '';
  return [
    line,
    'override',
    node.override.length === 0
      ? ''
      : ['(', printSeparatedList(path.map(print, 'override')), ')']
  ];
};

const body = (node, path, print) =>
  node.body ? [' ', path.call(print, 'body')] : ';';

export const ModifierDefinition = {
  print: ({ node, path, print }) => [
    `modifier ${node.name}`,
    modifierParameters(node, path, print),
    group(indent([virtual(node), override(node, path, print)])),
    body(node, path, print)
  ]
};
