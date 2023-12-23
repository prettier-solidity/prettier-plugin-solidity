import { printSeparatedList } from '../common/printer-helpers.ts';

const parameters = (node, path, print) =>
  node.parameters?.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const EventDefinition = {
  print: ({ node, path, print }) => [
    `event ${node.name}(`,
    parameters(node, path, print),
    `)${node.isAnonymous ? ' anonymous' : ''};`
  ]
};
