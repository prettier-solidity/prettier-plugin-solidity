export const PragmaDirective = {
  print: ({ node }) => ['pragma ', node.name, ' ', node.value, ';']
};
