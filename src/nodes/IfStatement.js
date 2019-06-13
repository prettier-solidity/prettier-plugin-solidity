const {
  doc: {
    builders: { concat, group, hardline, ifBreak, indent, line, softline }
  }
} = require('prettier');

const printTrueBody = (node, path, print) => {
  if (node.trueBody.type === 'Block') {
    return concat([
      ' ',
      path.call(print, 'trueBody'),
      node.falseBody ? ' ' : ''
    ]);
  }

  const ifWithinIf = node.trueBody.type === 'IfStatement';

  const openHug = ' {';
  const closeHug = concat([line, '}', node.falseBody ? ' ' : '']);

  const openNotHug = '';
  const closeNotHug = node.falseBody ? hardline : '';

  return group(
    concat([
      ifBreak(openHug, ifWithinIf ? openHug : openNotHug),
      indent(concat([line, path.call(print, 'trueBody')])),
      ifBreak(closeHug, ifWithinIf ? closeHug : closeNotHug)
    ])
  );
};

const printFalseBody = (node, path, print) => {
  if (
    node.falseBody.type === 'Block' ||
    node.falseBody.type === 'IfStatement'
  ) {
    return concat([' ', path.call(print, 'falseBody')]);
  }

  return group(
    concat([
      ifBreak(' {', ''),
      indent(concat([line, path.call(print, 'falseBody')])),
      ifBreak(concat([line, '}']), '')
    ])
  );
};

const printIf = (node, path, print) =>
  concat([
    group(
      concat([
        'if (',
        indent(concat([softline, path.call(print, 'condition')])),
        softline,
        ')'
      ])
    ),
    printTrueBody(node, path, print)
  ]);

const printElse = (node, path, print) => {
  if (node.falseBody) {
    return concat(['else', printFalseBody(node, path, print)]);
  }
  return '';
};

const IfStatement = {
  print: ({ node, path, print }) =>
    concat([printIf(node, path, print), printElse(node, path, print)])
};

module.exports = IfStatement;
