const {
  doc: {
    builders: { hardline }
  }
} = require('prettier');

const { printSeparatedList } = require('../common/printer-helpers');

const StructDefinition = {
  print: ({ node, path, print }) => {
    const parts = ['struct ', node.name, ' {'];

    if (node.members.length > 0) {
      parts.push(
        printSeparatedList(path.map(print, 'members'), {
          firstSeparator: hardline,
          separator: [';', hardline],
          lastSeparator: [';', hardline]
        })
      );
    }

    parts.push('}');

    return parts;
  }
};

module.exports = StructDefinition;
