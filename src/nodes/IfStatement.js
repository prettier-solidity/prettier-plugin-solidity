const {
  doc: {
    builders: { concat, group, hardline, indent, line }
  }
} = require('prettier/standalone');

const printComments = require('./print-comments');
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

const printElse = (node, path, print, commentsBetweenIfAndElse) => {
  if (node.falseBody) {
    const elseOnSameLine =
      node.trueBody.type === 'Block' && commentsBetweenIfAndElse.length === 0;
    return concat([
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node, path, print)
    ]);
  }
  return '';
};

const IfStatement = {
  print: ({ node, options, path, print }) => {
    const comments = node.comments || [];
    const commentsBetweenIfAndElse = comments.filter(
      (comment) => !comment.leading && !comment.trailing
    );

    const parts = [];

    parts.push(
      group(
        concat(['if (', printSeparatedItem(path.call(print, 'condition')), ')'])
      )
    );
    parts.push(printTrueBody(node, path, print));
    if (commentsBetweenIfAndElse.length && node.falseBody) {
      parts.push(hardline);
      parts.push(printComments(node, path, options));
    }
    parts.push(printElse(node, path, print, commentsBetweenIfAndElse));

    return concat(parts);
  }
};

module.exports = IfStatement;
