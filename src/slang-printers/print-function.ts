import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { joinExisting } from '../slang-utils/join-existing.js';

import type { Doc } from 'prettier';
import type { FunctionLike, FunctionWithBody } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { dedent, group, indent, line } = doc.builders;

export function printFunction(
  functionName: Doc,
  node: FunctionLike,
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
  print: PrintFunction
): Doc {
  return [printFunction(functionName, node, print), print('body')];
}
