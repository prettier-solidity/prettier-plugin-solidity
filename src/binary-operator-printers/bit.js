import { arithmetic } from './arithmetic.js';

export const bit = {
  match: (op) => ['&', '|', '^'].includes(op),
  print: arithmetic.print
};
