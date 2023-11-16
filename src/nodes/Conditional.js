import { doc } from 'prettier';

const { group, indent, line, ifBreak, hardline, hardlineWithoutBreakParent } =
  doc.builders;

const experimentalTernaries = (node, path, print) => {
  const { parent } = path;
  let style = 'case-style';

  if (parent.type === 'Conditional') {
    if (parent.condition === node) style = 'case-style';
    if (parent.trueExpression === node) style = 'case-style';
    if (parent.falseExpression === node) style = 'case-style';
  }

  const hasConditionalAtBeginning = [
    node.condition.type,
    node.trueExpression.type
  ].includes('Conditional');

  const hasConditional =
    hasConditionalAtBeginning || node.falseExpression.type === 'Conditional';

  const document = group([
    group([
      path.call(print, 'condition'),
      ' ?',
      group(
        indent([
          style === 'curious' ? hardline : line,
          path.call(print, 'trueExpression')
        ])
      )
    ]),
    group([
      parent.type === 'Conditional' || hasConditionalAtBeginning ?
        hardlineWithoutBreakParent
      : line,
      ': ',
      path.call(print, 'falseExpression')
    ])
  ]);

  return path.parent.type === 'VariableDeclarationStatement' ?
      ifBreak(indent([hasConditional ? hardline : line, document]), document)
    : document;
};

export const Conditional = {
  print: ({ node, path, print, options }) =>
    options.experimentalTernaries ?
      experimentalTernaries(node, path, print)
    : group([
        path.call(print, 'condition'),
        indent([
          line,
          '? ',
          path.call(print, 'trueExpression'),
          line,
          ': ',
          path.call(print, 'falseExpression')
        ])
      ])
};
