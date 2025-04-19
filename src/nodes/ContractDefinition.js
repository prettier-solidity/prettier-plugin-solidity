import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines,
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';

const { group, hardline, ifBreak, line, softline } = doc.builders;

const specifiers = (node, path, print) => {
  const document = [];
  if (node.baseContracts.length > 0) {
    document.push([
      'is',
      printSeparatedList(path.map(print, 'baseContracts'), {
        firstSeparator: line
      })
    ]);
  }
  if (node.storageLayout) {
    document.push([
      'layout at',
      printSeparatedItem(path.call(print, 'storageLayout'), {
        firstSeparator: line
      })
    ]);
  }
  if (document.length === 0) return line;
  if (document.length === 1) return [' ', document];
  const groupId = Symbol('ContractSpecifiers.inheritance');
  return printSeparatedList(
    [group(document[0], { id: groupId }), document[1]],
    {
      firstSeparator: line,
      separator: ifBreak('', softline, { groupId })
    }
  );
};

const body = (node, path, options, print) => {
  const comments = printComments(node, path, options);
  return node.subNodes.length > 0 || comments?.length
    ? printSeparatedItem(
        [printPreservingEmptyLines(path, 'subNodes', options, print), comments],
        { firstSeparator: hardline, grouped: false }
      )
    : '';
};

export const ContractDefinition = {
  print: ({ node, options, path, print }) => [
    group([
      node.kind === 'abstract' ? 'abstract contract' : node.kind,
      ' ',
      node.name,
      specifiers(node, path, print),
      '{'
    ]),
    body(node, path, options, print),
    '}'
  ]
};
