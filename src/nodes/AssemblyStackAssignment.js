import { doc } from 'prettier';

const { hardline } = doc.builders;

export const AssemblyStackAssignment = {
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    hardline,
    '=: ',
    node.name
  ]
};
