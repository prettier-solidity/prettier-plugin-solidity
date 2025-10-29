import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';

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
    const parent = path.parent as StrictAstNode;
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
  node: StrictAstNode,
  path: AstPath<BinaryOperation>,
  index: number
): boolean =>
  isStatementWithoutIndentedOperation(node) ||
  (node.kind === NonterminalKind.ExpressionStatement &&
    (path.getNode(index + 1) as StrictAstNode).kind ===
      NonterminalKind.ForStatement);

export const binaryIndentRulesBuilder =
  (shouldIndent: (node: BinaryOperation) => boolean) =>
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc => {
    for (let i = 1, node = path.node; ; i++) {
      const parent = path.getNode(i) as StrictAstNode;
      if (shouldNotIndent(parent, path, i)) break;
      if (!isBinaryOperation(parent)) return indent(document);
      if (shouldIndent(parent)) return indent(document);
      if (node === parent.rightOperand) break;
      node = parent;
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
