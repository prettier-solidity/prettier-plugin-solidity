import { doc } from 'prettier';
import { printString } from '../common/util.js';

const { join, hardline } = doc.builders;

export const HexLiteral = {
  print: ({ node, options }) => {
    const list = node.parts.map((part) => `hex${printString(part, options)}`);
    return join(hardline, list);
  }
};
