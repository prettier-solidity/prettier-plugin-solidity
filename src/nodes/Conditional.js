import { doc } from 'prettier';

const { group, indent, line, ifBreak, hardline, hardlineWithoutBreakParent } =
  doc.builders;

let groupIndex = 0;
const experimentalTernaries = (node, path, print) => {
  const parent = path.getParentNode();

  const hasConditionalAtEnd = node.falseExpression.type === 'Conditional';
  const hasConditional =
    [node.condition.type, node.trueExpression.type].includes('Conditional') ||
    hasConditionalAtEnd;

  const conditionalGroup = group([path.call(print, 'condition'), ' ?'], {
    id: `Conditional.condition-${groupIndex}`
  });

  groupIndex += 1;
  const expressionSeparator = ifBreak(hardlineWithoutBreakParent, line, {
    groupId: conditionalGroup.id
  });

  const document = group([
    group([
      conditionalGroup,
      group(indent([expressionSeparator, path.call(print, 'trueExpression')]))
    ]),
    group([
      parent.type === 'Conditional' || hasConditionalAtEnd ?
        hardlineWithoutBreakParent
      : expressionSeparator,
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
