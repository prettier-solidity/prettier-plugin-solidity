import { doc } from 'prettier';

const { join } = doc.builders;

export const AssemblyAssignment = {
  print: ({ path, print }) => [
    join(', ', path.map(print, 'names')),
    ' := ',
    path.call(print, 'expression')
  ]
};
