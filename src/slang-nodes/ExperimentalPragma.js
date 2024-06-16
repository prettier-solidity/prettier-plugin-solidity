export const ExperimentalPragma = {
  parse: ({ ast, options, parse }) => ({
    experimentalKeyword: ast.experimentalKeyword.text,
    feature: parse(ast.feature, options, parse)
  }),
  print: ({ node, path, print }) => [
    `${node.experimentalKeyword} `,
    path.call(print, 'feature')
  ]
};
