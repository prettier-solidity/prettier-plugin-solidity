import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { dedent, group, indent, line } = doc.builders;

const modifierParameters = (node, path, print) => {
  if (node.parameters?.length > 0) {
    return [
      '(',
      printSeparatedList(path.map(print, 'parameters'), {
        separator: [',', line]
      }),
      ')'
    ];
  }

  return '()';
};

const virtual = (node) => (node.isVirtual ? [line, 'virtual'] : '');

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

const body = (node, path, print) => {
  if (!node.body) return ';';
  if (node.isVirtual) return group(path.call(print, 'body'));
  return [path.call(print, 'body')];
};

export const ModifierDefinition = {
  print: ({ node, path, print }) => [
    'modifier ',
    node.name,
    modifierParameters(node, path, print),
    group(
      indent([
        virtual(node),
        override(node, path, print),
        node.body ? dedent(line) : ''
      ])
    ),
    body(node, path, print)
  ]
};
