import { doc } from 'prettier';

const { dedent, line } = doc.builders;

export const LabelDefinition = {
  print: ({ node }) => [dedent(line), node.name, ':']
};
