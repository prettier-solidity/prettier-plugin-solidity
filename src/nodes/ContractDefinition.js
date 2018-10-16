const {
  doc: {
    builders: { concat, indent, join, line }
  }
} = require('prettier');
const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const ContractDefinition = {
  print: ({ node, options, path, print }) => {
    let doc; // info: no need to use the "global doc" ?!?
    doc = concat([node.kind, ' ', node.name]);
    if (node.baseContracts.length > 0) {
      doc = concat([doc, ' is ', join(', ', path.map(print, 'baseContracts'))]);
    }
    return concat([
      doc,
      ' {',
      indent(line),
      indent(printPreservingEmptyLines(path, 'subNodes', options, print)),
      line,
      '}',
      line
    ]);
  }
};

module.exports = ContractDefinition;
