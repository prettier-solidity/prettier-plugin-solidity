export const RevertStatement = {
  print: ({ path, print }) => ['revert ', path.call(print, 'revertCall'), ';']
};
