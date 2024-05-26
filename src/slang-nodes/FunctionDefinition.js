import { doc } from 'prettier';

const { dedent, group, indent, line } = doc.builders;

export const FunctionDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    functionKeyword: ast.functionKeyword.text,
    name: parse(ast.name, options, parse),
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    returns: ast.returns ? parse(ast.returns, options, parse) : undefined,
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    group([
      node.functionKeyword,
      ' ',
      path.call(print, 'name'),
      path.call(print, 'parameters'),
      indent(
        group([
          path.call(print, 'attributes'),
          node.returns ? [line, path.call(print, 'returns')] : '',
          dedent(line)
        ])
      )
    ]),
    path.call(print, 'body')
  ]
};
