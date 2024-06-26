export const ExperimentalPragma = {
  parse: ({ offsets, ast, options, parse }) => ({
    experimentalKeyword: ast.experimentalKeyword.text,
    feature: parse(ast.feature, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.experimentalKeyword} `,
    path.call(print, 'feature')
  ]
};
