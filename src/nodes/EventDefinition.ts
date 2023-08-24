import { printSeparatedList } from '../common/printer-helpers.js';
import type { EventDefinition as IEventDefinition } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const parameters = (
  node: IEventDefinition,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const EventDefinition: NodePrinter<IEventDefinition> = {
  print: ({ node, path, print }) => [
    `event ${node.name}(`,
    parameters(node, path, print),
    `)${node.isAnonymous ? ' anonymous' : ''};`
  ]
};
