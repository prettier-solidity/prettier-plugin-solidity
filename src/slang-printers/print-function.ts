import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';

import type { Doc } from 'prettier';
import type { FunctionLike, FunctionWithBody } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { dedent, group, indent, line } = doc.builders;

export function printFunction(
  functionName: Doc,
  node: FunctionLike,
  print: PrintFunction
): Doc {
  const returnsDoc = print('returns');
  return [
    group([
      functionName,
      print('parameters'),
      indent(
        group([
          print('attributes'),
          returnsDoc ? [line, returnsDoc] : returnsDoc,
          (node as FunctionWithBody).body?.kind === NonterminalKind.Block
            ? dedent(line)
            : ''
        ])
      )
    ]),
    print('body')
  ];
}
