import { doc } from 'prettier';

const { hardline, join } = doc.builders;

export const AssemblySwitch = {
  print: ({ path, print }) => [
    'switch ',
    path.call(print, 'expression'),
    hardline,
    join(hardline, path.map(print, 'cases'))
  ]
};
