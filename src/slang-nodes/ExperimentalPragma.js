export const ExperimentalPragma = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    experimentalKeyword: ast.experimentalKeyword.text,
    feature: parse(ast.feature, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    `${node.experimentalKeyword} `,
    path.call(print, 'feature')
  ]
};
