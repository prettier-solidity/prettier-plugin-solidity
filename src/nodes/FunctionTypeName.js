import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { group, indent, line } = doc.builders;

const returnTypes = (node, path, print) =>
  node.returnTypes.length > 0
    ? [
        line,
        'returns (',
        printSeparatedList(path.map(print, 'returnTypes')),
        ')'
      ]
    : '';

const visibility = (node) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const stateMutability = (node) =>
  node.stateMutability && node.stateMutability !== 'default'
    ? [line, node.stateMutability]
    : '';

export const FunctionTypeName = {
  print: ({ node, path, print }) =>
    group([
      'function(',
      printSeparatedList(path.map(print, 'parameterTypes'), {
        grouped: false
      }),
      ')',
      indent(
        group([
          visibility(node),
          stateMutability(node),
          returnTypes(node, path, print)
        ])
      )
    ])
};
