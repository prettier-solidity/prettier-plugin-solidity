import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

const printBody = (bodyVariantKind, path, print) =>
  bodyVariantKind === 'Block' || bodyVariantKind === 'IfStatement'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export const ElseBranch = {
  parse: ({ ast, options, parse }) => ({
    elseKeyword: ast.elseKeyword.text,
    body: parse(ast.body, options, parse)
  }),
  print: ({ node, path, print }) => [
    node.elseKeyword,
    printBody(node.body.variant.kind, path, print)
  ]
};
