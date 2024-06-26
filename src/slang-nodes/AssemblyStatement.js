export const AssemblyStatement = {
  parse: ({ offsets, ast, options, parse }) => ({
    assemblyKeyword: ast.assemblyKeyword.text,
    label: ast.label ? parse(ast.label, options, parse, offsets) : undefined,
    flags: ast.flags ? parse(ast.flags, options, parse, offsets) : undefined,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    node.assemblyKeyword,
    node.label ? [' ', path.call(print, 'label')] : '',
    node.flags ? [' ', path.call(print, 'flags')] : '',
    ' ',
    path.call(print, 'body')
  ]
};
