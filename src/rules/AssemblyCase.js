const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier');

const AssemblyCase = (node, path, options, print) => {
  let doc;

  if (node.default) {
    doc = concat(['default']);
  } else {
    doc = concat(['case ', path.call(print, 'value')]);
  }
  return join(' ', [doc, path.call(print, 'block')]);
};

module.exports = AssemblyCase;
