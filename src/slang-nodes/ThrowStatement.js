export const ThrowStatement = {
  parse: ({ node, ast }) => ({
    ...node,
    throwKeyword: ast.throwKeyword.text,
    semicolon: ast.semicolon.text
  }),
  // TODO: implement print
  print: ({ node, path, print, options }) => ['TODO: ThrowStatement']
};
