import { doc } from 'prettier';

const { dedent, line } = doc.builders;

export const YulLabel = {
  parse: ({ node, offsets, ast }) => ({
    ...node,
    label: ast.label.text,
    colon: ast.colon.text
  }),
  print: ({ node }) => [dedent(line), node.label, node.colon]
};
