import { doc } from 'prettier';

const { dedent, group, indent, line } = doc.builders;

export const ConstructorDefinition = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    constructorKeyword: ast.constructorKeyword.text,
    parameters: parse(ast.parameters, options, parse),
    attributes: parse(ast.attributes, options, parse),
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    group([
      node.constructorKeyword,
      path.call(print, 'parameters'),
      indent(group([path.call(print, 'attributes'), dedent(line)]))
    ]),
    path.call(print, 'body')
  ]
};
