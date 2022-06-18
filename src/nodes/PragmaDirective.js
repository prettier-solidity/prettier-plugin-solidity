const printSeparatedList = require('./print-separated-list');

const nodeValue = (node, path, print) => {
  if (typeof node.value === 'string') return node.value;
  return printSeparatedList(path.map(print, 'value'));
}

const PragmaDirective = {
  print: ({ node, path, print }) => [
    'pragma ',
    node.name,
    (node.value === '') ? '' : ' ',
    nodeValue(node, path, print), ';']
};

module.exports = PragmaDirective;
