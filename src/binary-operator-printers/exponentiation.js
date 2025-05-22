import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './printers/create-binary-operation-printer.js';
import { createIndentIfNecessaryBuilder } from './printers/create-indent-if-necessary-builder.js';
import { multiplication } from './multiplication.js';
import { addition } from './addition.js';
import { shift } from './shift.js';
import { bit } from './bit.js';
import { inequality } from './inequality.js';
import { equality } from './equality.js';
import { logical } from './logical.js';

const { group } = doc.builders;

export const exponentiation = {
  match: (op) => op === '**',
  print: createBinaryOperationPrinter(
    () => (document) => group(document), // always group
    createIndentIfNecessaryBuilder([
      multiplication,
      addition,
      shift,
      bit,
      inequality,
      equality,
      logical
    ])
  )
};
