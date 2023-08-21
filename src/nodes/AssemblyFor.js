import { doc } from 'prettier';

const { join } = doc.builders;

export const AssemblyFor = {
  print: ({ path, print }) =>
    join(' ', [
      'for',
      path.call(print, 'pre'),
      path.call(print, 'condition'),
      path.call(print, 'post'),
      path.call(print, 'body')
    ])
};
