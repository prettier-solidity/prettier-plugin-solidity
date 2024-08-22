import { doc } from 'prettier';
import { joinExisting } from '../slang-utils/join-existing.js';

import type { AstPath, Doc } from 'prettier';
import type { FunctionLike } from '../slang-nodes';
import type { PrintFunction } from '../types';
import type { FunctionDefinition } from '../slang-nodes/FunctionDefinition';

const { dedent, group, indent, line } = doc.builders;

export function printFunction(
  functionName: Doc,
  node: FunctionLike,
  path: AstPath<FunctionLike>,
  print: PrintFunction
): Doc {
  return [
    group([
      functionName,
      path.call(print, 'parameters'),
      indent(
        group([
          joinExisting(line, [
            path.call(print, 'attributes'),
            path.call(print, 'returns')
          ]),
          (node as FunctionDefinition).body &&
          (node as FunctionDefinition).body.variant !== ';'
            ? dedent(line)
            : ''
        ])
      )
    ]),
    path.call(print, 'body')
  ];
}
