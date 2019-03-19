const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const AssemblyFor = (node, path, options, print) => {
  return join(' ', [
    'for',
    path.call(print, 'pre'),
    path.call(print, 'condition'),
    path.call(print, 'post'),
    path.call(print, 'body')
  ]);
};

module.exports = AssemblyFor;
