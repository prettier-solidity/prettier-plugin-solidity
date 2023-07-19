import { arithmetic } from './arithmetic.js';

export const shift = {
  match: (op) => ['<<', '>>'].includes(op),
  print: arithmetic.print
};
