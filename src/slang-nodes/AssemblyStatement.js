export const AssemblyStatement = {
  parse: ({ ast, options, parse }) => ({
    assemblyKeyword: ast.assemblyKeyword.text,
    label: ast.label ? parse(ast.label, options, parse) : undefined,
    flags: ast.flags ? parse(ast.flags, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.assemblyKeyword,
    node.label ? [' ', path.call(print, 'label')] : '',
    node.flags ? [' ', path.call(print, 'flags')] : '',
    ' ',
    path.call(print, 'body')
  ]
};
