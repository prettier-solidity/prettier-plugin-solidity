const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier/standalone');

const AssemblyCase = {
  print: ({ node, path, print }) => {
    let doc;

    if (node.default) {
      doc = concat(['default']);
    } else {
      doc = concat(['case ', path.call(print, 'value')]);
    }
    return join(' ', [doc, path.call(print, 'block')]);
  }
};

module.exports = AssemblyCase;
