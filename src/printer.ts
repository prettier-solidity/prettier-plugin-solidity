import * as nodes from './nodes/index.js';
import { getNode } from './common/backward-compatibility.js';
import {
  hasNodeIgnoreComment,
  locEnd,
  locStart,
  prettierVersionSatisfies
} from './common/util.js';
import ignoreComments from './comments/ignore.js';
import type { ASTNode } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';

let checked = false;

function prettierVersionCheck(): void {
  if (checked) return;
  if (!prettierVersionSatisfies('>=2.3.0')) {
    throw new Error(
      'The version of prettier in your node-modules does not satisfy the required ">=2.3.0" constraint. Please update the version of Prettier.'
    );
  }
  checked = true;
}

export default function genericPrint(
  path: AstPath,
  options: ParserOptions,
  print: (path: AstPath) => Doc
): Doc {
  prettierVersionCheck();

  // TODO: remove undefined once we stop supporting prettier 2
  const node = getNode(path) as ASTNode | null | undefined;
  if (node === null || node === undefined) {
    return '';
  }

  if (!(node.type in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(locStart(node), locEnd(node) + 1);
  }

  // Since `node` is mutable and each printer has a specific type for it, the
  // typescript compiler determines `node` to be of type never.
  return nodes[node.type].print({ node: node as never, options, path, print });
}
