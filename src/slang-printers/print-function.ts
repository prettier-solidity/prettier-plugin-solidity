import { doc } from 'prettier';

import type { AstPath, Doc } from 'prettier';
import type { FunctionLike, PrintFunction } from '../types';
import type { FunctionDefinition } from '../slang-nodes';

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
          path.call(print, 'attributes'),
          (node as FunctionDefinition).returns
            ? [line, path.call(print, 'returns')]
            : '',
          (node as FunctionDefinition).body &&
          (node as FunctionDefinition).body.variant !== ';'
            ? dedent(line)
            : ''
        ])
      )
    ]),
    (node as FunctionDefinition).body ? path.call(print, 'body') : ''
  ];
}
