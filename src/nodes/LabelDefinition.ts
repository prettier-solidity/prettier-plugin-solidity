import { doc } from 'prettier';
import type { LabelDefinition as ILabelDefinition } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { dedent, line } = doc.builders;

export const LabelDefinition: NodePrinter<ILabelDefinition> = {
  print: ({ node }) => [dedent(line), `${node.name}:`]
};
