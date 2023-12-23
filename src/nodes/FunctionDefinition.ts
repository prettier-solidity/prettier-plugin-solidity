import { doc } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../common/backward-compatibility.js';
import {
  printComments,
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';
import { locEnd, locStart } from '../common/util.js';
import type { FunctionDefinition as IFunctionDefinition } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { NodePrinter } from './types';

const { dedent, group, indent, join, line } = doc.builders;

const keywords = { fallback: 'fallback', function: 'function' };

const functionName = (
  node: IFunctionDefinition,
  options: ParserOptions
): string => {
  if (node.isConstructor && !node.name) return 'constructor';
  if (node.name) return `function ${node.name}`;
  if (node.isReceiveEther) return 'receive';
  // The parser doesn't give us any information about the keyword used for the
  // fallback.
  // Using the originalText is the next best option.
  // A neat idea would be to rely on the pragma and enforce it but for the
  // moment this will do.
  const nodeStart = locStart(node);
  const keyword = options.originalText.slice(
    nodeStart,
    nodeStart + 8
  ) as keyof typeof keywords;
  return keywords[keyword];
};

const parameters = (
  parametersType: 'parameters' | 'returnParameters',
  node: IFunctionDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
): Doc => {
  if (node[parametersType]!.length > 0) {
    return printSeparatedList(path.map(print, parametersType), {
      grouped: false
    });
  }
  // we add a check to see if the comment is inside the parentheses
  const parameterComments = printComments(
    node,
    path,
    options,
    (comment) =>
      getNextNonSpaceNonCommentCharacter(
        options.originalText,
        comment,
        locEnd
      ) === ')'
  );
  return parameterComments.length > 0
    ? printSeparatedItem(parameterComments)
    : '';
};

const visibility = (node: IFunctionDefinition): Doc =>
  node.visibility !== 'default' ? [line, node.visibility] : '';

const virtual = (node: IFunctionDefinition): Doc =>
  node.isVirtual ? [line, 'virtual'] : '';

const override = (
  node: IFunctionDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (!node.override) return '';
  if (node.override.length === 0) return [line, 'override'];
  return [
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ];
};

const stateMutability = (node: IFunctionDefinition): Doc =>
  node.stateMutability ? [line, node.stateMutability] : '';

const modifiers = (
  node: IFunctionDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.modifiers.length > 0
    ? [line, join(line, path.map(print, 'modifiers'))]
    : '';

const returnParameters = (
  node: IFunctionDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
): Doc =>
  node.returnParameters
    ? [
        line,
        'returns (',
        group(parameters('returnParameters', node, path, print, options)),
        ')'
      ]
    : '';

const signatureEnd = (node: IFunctionDefinition): Doc =>
  node.body ? dedent(line) : ';';

export const FunctionDefinition: NodePrinter<IFunctionDefinition> = {
  print: ({ node, path, print, options }) => [
    group([
      `${functionName(node, options)}(`,
      parameters('parameters', node, path, print, options),
      ')',
      group(
        indent([
          // TODO: sort comments for modifiers and return parameters
          printComments(node, path, options),
          visibility(node),
          stateMutability(node),
          virtual(node),
          override(node, path, print),
          modifiers(node, path, print),
          returnParameters(node, path, print, options),
          signatureEnd(node)
        ])
      )
    ]),
    path.call(print, 'body')
  ]
};
