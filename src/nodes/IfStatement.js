const {
  doc: {
    builders: { concat, group, hardline, indent, line }
  }
} = require('prettier/standalone');

const printSeparatedItem = require('./print-separated-item');

const printTrueBody = (node, path, print) => {
  if (node.trueBody.type === 'Block') {
    return concat([' ', path.call(print, 'trueBody')]);
  }

  const ifWithinIf = node.trueBody.type === 'IfStatement';
  return group(
    indent(concat([ifWithinIf ? hardline : line, path.call(print, 'trueBody')]))
  );
};

const printFalseBody = (node, path, print) =>
  node.falseBody.type === 'Block' || node.falseBody.type === 'IfStatement'
    ? concat([' ', path.call(print, 'falseBody')])
    : group(indent(concat([line, path.call(print, 'falseBody')])));

const printElse = (node, path, print) => {
  if (node.falseBody) {
    const elseOnSameLine = node.trueBody.type === 'Block';
    return concat([
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node, path, print)
    ]);
  }
  return '';
};

const IfStatement = {
  print: ({ node, path, print }) =>
    concat([
      group(
        concat(['if (', printSeparatedItem(path.call(print, 'condition')), ')'])
      ),
      printTrueBody(node, path, print),
      printElse(node, path, print)
    ])
};

module.exports = IfStatement;
