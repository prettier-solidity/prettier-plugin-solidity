export const EventDefinition = {
  parse: ({ offsets, ast, options, parse }) => ({
    eventKeyword: ast.eventKeyword.text,
    name: ast.name.text,
    parameters: parse(ast.parameters, options, parse, offsets),
    anonymousKeyword: ast.anonymousKeyword?.text,
    semicolon: ast.semicolon.text
  }),
  print: ({ node, path, print }) => [
    `${node.eventKeyword} ${node.name}`,
    path.call(print, 'parameters'),
    node.anonymousKeyword ? ` ${node.anonymousKeyword}` : '',
    node.semicolon
  ]
};
