import { doc } from 'prettier';

const { group } = doc.builders;

export const UncheckedStatement = {
  print: ({ path, print }) => group(['unchecked ', path.call(print, 'block')])
};
