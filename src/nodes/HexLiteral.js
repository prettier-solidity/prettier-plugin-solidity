import { doc } from 'prettier';
import { printString } from '../common/util.ts';

const { join, line } = doc.builders;

export const HexLiteral = {
  print: ({ node, options }) =>
    join(
      line,
      node.parts.map((part) => ['hex', printString(part, options)])
    )
};
