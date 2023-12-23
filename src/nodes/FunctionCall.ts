import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { isLabel } from '../common/util.js';
import type { FunctionCall as IFunctionCall } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { NodePrinter } from './types';

const { group, indentIfBreak, label, line, softline } = doc.builders;

const printObject = (
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
): Doc => {
  const identifiers = path.map(print, 'identifiers');
  return [
    '{',
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((arg, index) => [identifiers[index], ': ', arg]),
      {
        firstSeparator: options.bracketSpacing ? line : softline,
        lastSeparator: [options.bracketSpacing ? line : softline, '})']
      }
    )
  ];
};

const printArguments = (path: AstPath, print: (path: AstPath) => Doc): Doc =>
  printSeparatedList(path.map(print, 'arguments'), {
    lastSeparator: [softline, ')']
  });

let groupIndex = 0;
export const FunctionCall: NodePrinter<IFunctionCall> = {
  print: ({ node, path, print, options }) => {
    let expressionDoc = path.call(print, 'expression');
    let argumentsDoc: Doc = ')';

    if (node.arguments.length > 0) {
      if (node.identifiers.length > 0) {
        argumentsDoc = printObject(path, print, options);
      } else {
        argumentsDoc = printArguments(path, print);
      }
    }

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(expressionDoc) && expressionDoc.label === 'MemberAccessChain') {
      expressionDoc = group(expressionDoc.contents, {
        id: Symbol(`FunctionCall.expression-${groupIndex}`)
      });

      groupIndex += 1;

      argumentsDoc = indentIfBreak(argumentsDoc, {
        groupId: expressionDoc.id!
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [expressionDoc, '(', argumentsDoc]);
    }

    return [expressionDoc, '(', argumentsDoc];
  }
};
