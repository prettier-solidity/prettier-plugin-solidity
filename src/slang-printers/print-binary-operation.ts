import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { BinaryOperation, PrintableNode } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent } = doc.builders;

export const binaryGroupRulesBuilder =
  (shouldGroup: (node: BinaryOperation) => boolean) =>
  (path: AstPath<PrintableNode>) =>
  (document: Doc): Doc => {
    const parent = path.parent!;
    if (!isBinaryOperation(parent)) return group(document);
    if (shouldGroup(parent)) return group(document);
    return document;
  };

const isStatementWithoutIndentedOperation = createKindCheckFunction([
  NonterminalKind.ReturnStatement,
  NonterminalKind.IfStatement,
  NonterminalKind.WhileStatement
]);

export const shouldNotIndent = (
  node: PrintableNode,
  path: AstPath<PrintableNode>,
  index: number
): boolean =>
  isStatementWithoutIndentedOperation(node) ||
  (node.kind === NonterminalKind.ExpressionStatement &&
    path.getNode(index + 1)!.kind === NonterminalKind.ForStatement);

export const binaryIndentRulesBuilder =
  (shouldIndent: (node: BinaryOperation) => boolean) =>
  (node: BinaryOperation, path: AstPath<PrintableNode>) =>
  (document: Doc): Doc => {
    for (let i = 1, current = node, parent; ; i++, current = parent) {
      parent = path.getNode(i)!;
      if (shouldNotIndent(parent, path, i)) break;
      if (!isBinaryOperation(parent)) return indent(document);
      if (shouldIndent(parent)) return indent(document);
      if (current === parent.rightOperand) break;
    }
    return document;
  };

export const printBinaryOperation = (
  shouldGroupAndIndent: (node: BinaryOperation) => boolean
): ((
  node: BinaryOperation,
  print: PrintFunction,
  path: AstPath<PrintableNode>,
  options: ParserOptions<PrintableNode>
) => Doc) =>
  createBinaryOperationPrinter(
    binaryGroupRulesBuilder(shouldGroupAndIndent),
    binaryIndentRulesBuilder(shouldGroupAndIndent)
  );
