/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat, group, hardline, indent, softline }
  }
} = require('prettier');

const printIf = (node, path, print) =>
  concat([
    group(
      concat([
        'if (',
        indent(concat([softline, path.call(print, 'condition')])),
        softline,
        ') '
      ])
    ),
    path.call(print, 'trueBody')
  ]);

const printElse = (node, path, print) => {
  if (node.falseBody) {
    const elseOnSameLine = node.trueBody.type === 'Block';
    return concat([
      elseOnSameLine ? ' ' : hardline,
      'else ',
      path.call(print, 'falseBody')
    ]);
  }
  return '';
};

const IfStatement = {
  print: ({ node, path, print }) =>
    concat([printIf(node, path, print), printElse(node, path, print)])
};

module.exports = IfStatement;
