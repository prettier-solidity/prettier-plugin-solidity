import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { joinExisting } from '../slang-utils/join-existing.js';
import { printVariant } from './print-variant.js';

import type { AstPath, Doc } from 'prettier';
import type {
  FunctionLike,
  StrictPolymorphicNode
} from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';
import type { FunctionBody } from '../slang-nodes/FunctionBody.js';

const { dedent, group, indent, line } = doc.builders;

export function printFunction(
  functionName: Doc,
  node: FunctionLike,
  path: AstPath<FunctionLike>,
  print: PrintFunction
): Doc {
  const body = (node as Extract<FunctionLike, { body: FunctionBody }>).body;

  return group([
    functionName,
    path.call(print, 'parameters'),
    indent(
      group([
        joinExisting(line, [
          path.call(print, 'attributes'),
          path.call(print, 'returns')
        ]),
        body && (!body.variant || body.variant.kind === NonterminalKind.Block)
          ? dedent(line)
          : ''
      ])
    )
  ]);
}

export function printFunctionWithBody(
  functionName: Doc,
  node: FunctionLike,
  path: AstPath<Extract<FunctionLike, { body: unknown }>>,
  print: PrintFunction
): Doc {
  return [
    printFunction(functionName, node, path, print),
    node.kind !== NonterminalKind.ConstructorDefinition
      ? (
          path as AstPath<
            Extract<FunctionLike, { body: StrictPolymorphicNode }>
          >
        ).call(printVariant(print), 'body')
      : path.call(print, 'body')
  ];
}
