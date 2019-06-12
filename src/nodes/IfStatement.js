const {
  doc: {
    builders: { concat, group, hardline, ifBreak, indent, line, softline }
  }
} = require('prettier');

const printBody = (body, followingElse, node, path, print) => {
  if (node[body].type === 'Block' || node[body].type === 'IfStatement') {
    return concat([' ', path.call(print, body), followingElse ? ' ' : '']);
  }

  return group(
    concat([
      ifBreak(concat([' {']), ''),
      indent(concat([line, path.call(print, body)])),
      ifBreak(
        concat([line, '}', followingElse ? ' ' : '']),
        followingElse ? hardline : ''
      )
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
    printBody('trueBody', node.falseBody, node, path, print)
  ]);

const printElse = (node, path, print) => {
  if (node.falseBody) {
    return concat(['else', printBody('falseBody', false, node, path, print)]);
  }
  return '';
};

const IfStatement = {
  print: ({ node, path, print }) =>
    concat([printIf(node, path, print), printElse(node, path, print)])
};

module.exports = IfStatement;
