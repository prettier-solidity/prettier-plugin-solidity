const {
  doc: {
    builders: { concat, group, hardline, indent, line, softline }
  }
} = require('prettier/standalone');

const printTrueBody = (node, path, print) => {
  if (node.trueBody.type === 'Block') {
    return concat([' ', path.call(print, 'trueBody')]);
  }

  const ifWithinIf = node.trueBody.type === 'IfStatement';
  return group(
    indent(concat([ifWithinIf ? hardline : line, path.call(print, 'trueBody')]))
  );
};

const printFalseBody = (node, path, print) => {
  if (
    node.falseBody.type === 'Block' ||
    node.falseBody.type === 'IfStatement'
  ) {
    return concat([' ', path.call(print, 'falseBody')]);
  }

  return group(indent(concat([line, path.call(print, 'falseBody')])));
};

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
        concat([
          'if (',
          indent(concat([softline, path.call(print, 'condition')])),
          softline,
          ')'
        ])
      ),
      printTrueBody(node, path, print),
      printElse(node, path, print)
    ])
};

module.exports = IfStatement;
