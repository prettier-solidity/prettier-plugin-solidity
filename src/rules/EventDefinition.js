const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const EventDefinition = (node, path, options, print) => {
  return concat([
    'event ',
    node.name,
    '(',
    path.call(print, 'parameters'),
    ');'
  ]);
};

module.exports = EventDefinition;
