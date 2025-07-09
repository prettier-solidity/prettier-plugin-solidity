import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  AstNode,
  BinaryOperation,
  StrictAstNode
} from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, indent } = doc.builders;

export const binaryGroupRulesBuilder =
  (shouldGroup: (node: BinaryOperation) => boolean) =>
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc => {
    const grandparentNode = path.grandparent as StrictAstNode;
    if (!isBinaryOperation(grandparentNode)) return group(document);
    if (shouldGroup(grandparentNode)) return group(document);
    return document;
  };

const isStatementWithoutIndentedOperation = createKindCheckFunction([
  NonterminalKind.ReturnStatement,
  NonterminalKind.IfStatement,
  NonterminalKind.WhileStatement
]);

export const shouldNotIndent = (
  node: StrictAstNode,
  path: AstPath<BinaryOperation>,
  index: number
): boolean =>
  isStatementWithoutIndentedOperation(node) ||
  (node.kind === NonterminalKind.ExpressionStatement &&
    (path.getNode(index + 1) as StrictAstNode).kind ===
      NonterminalKind.ForStatementCondition);

export const binaryIndentRulesBuilder =
  (shouldIndent: (node: BinaryOperation) => boolean) =>
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc => {
    for (let i = 2, node = path.node; ; i += 2) {
      const grandparentNode = path.getNode(i) as StrictAstNode;
      if (shouldNotIndent(grandparentNode, path, i)) break;
      if (!isBinaryOperation(grandparentNode)) return indent(document);
      if (shouldIndent(grandparentNode)) return indent(document);
      if (node === grandparentNode.rightOperand.variant) break;
      node = grandparentNode;
    }
    return document;
  };

export const printBinaryOperation = (
  shouldGroupAndIndent: (node: StrictAstNode) => boolean
): ((
  node: BinaryOperation,
  path: AstPath<BinaryOperation>,
  print: PrintFunction,
  options: ParserOptions<AstNode>
) => Doc) =>
  createBinaryOperationPrinter(
    binaryGroupRulesBuilder(shouldGroupAndIndent),
    binaryIndentRulesBuilder(shouldGroupAndIndent)
  );
