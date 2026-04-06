import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { joinExisting } from '../slang-utils/join-existing.js';

import type { AstPath, Doc } from 'prettier';
import type { FunctionLike, FunctionWithBody } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { dedent, group, indent, line } = doc.builders;

export function printFunction(
  functionName: Doc,
  node: FunctionLike,
  path: AstPath<FunctionLike>,
  print: PrintFunction
): Doc {
  const body = (node as FunctionWithBody).body;

  return group([
    functionName,
    print('parameters'),
    indent(
      group([
        joinExisting(line, [print('attributes'), print('returns')]),
        body && body.kind === NonterminalKind.Block ? dedent(line) : ''
      ])
    )
  ]);
}

export function printFunctionWithBody(
  functionName: Doc,
  node: FunctionLike,
  path: AstPath<FunctionWithBody>,
  print: PrintFunction
): Doc {
  return [printFunction(functionName, node, path, print), print('body')];
}
