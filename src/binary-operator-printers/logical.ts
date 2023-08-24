import { doc } from 'prettier';
import { getNode } from '../common/backward-compatibility.js';
import type { ASTNode } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { BinaryOperationPrinter } from './types';

const { group, line, indent } = doc.builders;

const groupIfNecessaryBuilder =
  (path: AstPath) =>
  (document: Doc): Doc =>
    path.getParentNode().type === 'BinaryOperation'
      ? document
      : group(document);

const indentIfNecessaryBuilder =
  (path: AstPath, options: ParserOptions) =>
  (document: Doc): Doc => {
    let node = getNode(path) as ASTNode;
    for (let i = 0; ; i += 1) {
      const parentNode: ASTNode = path.getParentNode(i);
      if (parentNode.type === 'ReturnStatement') break;
      if (parentNode.type === 'IfStatement') break;
      if (parentNode.type === 'WhileStatement') break;
      if (
        options.experimentalTernaries &&
        parentNode.type === 'Conditional' &&
        parentNode.condition === node
      )
        break;
      if (parentNode.type !== 'BinaryOperation') return indent(document);
      if (node === parentNode.right) break;
      node = parentNode;
    }
    return document;
  };

export const logical: BinaryOperationPrinter = {
  operators: ['&&', '||'],
  print: ({ node, path, print, options }) => {
    const groupIfNecessary = groupIfNecessaryBuilder(path);
    const indentIfNecessary = indentIfNecessaryBuilder(path, options);

    const right = [node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return groupIfNecessary([
      path.call(print, 'left'),
      ' ',
      indentIfNecessary(shouldGroup ? group(right) : right)
    ]);
  }
};
