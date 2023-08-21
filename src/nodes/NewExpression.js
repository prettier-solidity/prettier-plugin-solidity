export const NewExpression = {
  print: ({ path, print }) => ['new ', path.call(print, 'typeName')]
};
