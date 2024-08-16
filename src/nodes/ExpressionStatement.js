export const ExpressionStatement = {
  print: ({ node, path, print }) => [
    path.call(print, 'expression'),
    node.omitSemicolon ? '' : ';'
  ]
};
