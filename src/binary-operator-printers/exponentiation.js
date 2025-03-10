import { doc } from 'prettier';
import {
  createBinaryOperationPrinter,
  createIndentIfNecessaryBuilder
} from './printers/create-binary-operation-printer.js';
import { addition } from './addition.js';
import { equality } from './equality.js';
import { inequality } from './inequality.js';
import { multiplication } from './multiplication.js';

const { group } = doc.builders;

const exponentiationPrinter = createBinaryOperationPrinter(
  () => (document) => group(document), // always group
  createIndentIfNecessaryBuilder([
    addition,
    equality,
    inequality,
    multiplication
    // `bit` and `shift` should technically be here but they are properly
    // parenthesised before reaching this point.
  ])
);

export const exponentiation = {
  match: (op) => op === '**',
  print: exponentiationPrinter
};
