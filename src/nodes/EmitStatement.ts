import type { EmitStatement as IEmitStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

export const EmitStatement: NodePrinter<IEmitStatement> = {
  print: ({ path, print }) => ['emit ', path.call(print, 'eventCall'), ';']
};
