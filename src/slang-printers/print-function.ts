import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';

import type { Doc } from 'prettier';
import type {
  FunctionLike,
  FunctionWithBody,
  FunctionWithReturns
} from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { dedent, group, indent, line } = doc.builders;

export function printFunction(
  functionName: Doc,
  node: FunctionLike,
  print: PrintFunction
): Doc {
  const body = (node as FunctionWithBody).body;
  return [
    group([
      functionName,
      node.parameters ? print('parameters') : '',
      indent(
        group([
          print('attributes'),
          (node as FunctionWithReturns).returns ? [line, print('returns')] : '',
          body?.kind === NonterminalKind.Block ? dedent(line) : ''
        ])
      )
    ]),
    body ? print('body') : ''
  ];
}
