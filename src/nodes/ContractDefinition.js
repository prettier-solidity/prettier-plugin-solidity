const {
  doc: {
    builders: { concat, group, indent, join, line }
  }
} = require('prettier/standalone');
const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const inheritance = (node, path, print) => {
  if (node.baseContracts.length > 0) {
    return concat([
      ' is',
      indent(
        concat([
          line,
          join(concat([',', line]), path.map(print, 'baseContracts'))
        ])
      )
    ]);
  }
  return '';
};

const body = (node, path, options, print) => {
  if (node.subNodes.length > 0) {
    return concat([
      indent(line),
      indent(printPreservingEmptyLines(path, 'subNodes', options, print)),
      line
    ]);
  }
  return '';
};

const ContractDefinition = {
  print: ({ node, options, path, print }) =>
    concat([
      group(
        concat([
          node.kind,
          ' ',
          node.name,
          inheritance(node, path, print),
          line,
          '{'
        ])
      ),
      body(node, path, options, print),
      '}'
    ])
};

module.exports = ContractDefinition;
