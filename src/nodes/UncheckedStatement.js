export const UncheckedStatement = {
  print: ({ path, print }) => ['unchecked ', path.call(print, 'block')]
};
