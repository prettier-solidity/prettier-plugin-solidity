const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const PragmaDirective = {
  print: ({ node }) => concat(['pragma ', node.name, ' ', node.value, ';'])
};

module.exports = PragmaDirective;
