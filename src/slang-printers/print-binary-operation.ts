import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.ts';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.ts';
import { group, indent } from './prettier-builders.ts';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.ts';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { BinaryOperation, PrintableNode } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export const binaryGroupRulesBuilder =
  (shouldGroup: (node: BinaryOperation) => boolean) =>
  (path: AstPath<PrintableNode>) =>
  (document: Doc): Doc => {
    // `path.parent` is only `null` at the document root, and a
    // BinaryOperation can never itself be that root.
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
  // `path.getNode(index + 1)` (one level further up than `node` itself) is
  // only `null` past the document root, and an ExpressionStatement always
  // has an enclosing parent of its own, so it can't be at that root.
  (node.kind === NonterminalKind.ExpressionStatement &&
    path.getNode(index + 1)!.kind === NonterminalKind.ForStatement);

export const binaryIndentRulesBuilder =
  (shouldIndent: (node: BinaryOperation) => boolean) =>
  (node: BinaryOperation, path: AstPath<PrintableNode>) =>
  (document: Doc): Doc => {
    // `path.getNode(i)` is only `null` past the document root. This loop
    // always breaks or returns at or before reaching it, since the root is
    // never a BinaryOperation and never matches `shouldNotIndent`.
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
  path: AstPath<PrintableNode>,
  print: PrintFunction,
  options: ParserOptions<PrintableNode>
) => Doc) =>
  createBinaryOperationPrinter(
    binaryGroupRulesBuilder(shouldGroupAndIndent),
    binaryIndentRulesBuilder(shouldGroupAndIndent)
  );
