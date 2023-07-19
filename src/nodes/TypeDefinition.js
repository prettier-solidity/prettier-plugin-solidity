export const TypeDefinition = {
  print: ({ node }) => ['type ', node.name, ' is ', node.definition.name, ';']
};
