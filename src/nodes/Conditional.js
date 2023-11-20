import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, indent, line, ifBreak, hardline, hardlineWithoutBreakParent } =
  doc.builders;

let groupIndex = 0;
const experimentalTernaries = (node, path, print) => {
  const parent = path.getParentNode();

  const falseExpressionIsConditional =
    node.falseExpression.type === 'Conditional';
  const hasConditional =
    node.trueExpression.type === 'Conditional' || falseExpressionIsConditional;

  const conditionalGroup = group(
    [
      parent.type === 'Conditional' && parent.trueExpression === node
        ? hardlineWithoutBreakParent
        : '',
      ifBreak(
        ['(', printSeparatedItem(path.call(print, 'condition')), ')'],
        path.call(print, 'condition')
      ),
      ' ?'
    ],
    { id: `Conditional.condition-${groupIndex}` }
  );

  groupIndex += 1;

  const expressionSeparator = ifBreak(
    ['Conditional', 'VariableDeclarationStatement'].includes(parent.type)
      ? hardlineWithoutBreakParent
      : line,
    line,
    { groupId: conditionalGroup.id }
  );

  const document = group([
    conditionalGroup,
    group(indent([expressionSeparator, path.call(print, 'trueExpression')])),
    parent.type === 'Conditional' || falseExpressionIsConditional
      ? hardlineWithoutBreakParent
      : expressionSeparator,
    ': ',
    path.call(print, 'falseExpression')
  ]);

  return parent.type === 'VariableDeclarationStatement'
    ? ifBreak(indent([hasConditional ? hardline : line, document]), document)
    : document;
};

const traditionalTernaries = (path, print) =>
  group([
    path.call(print, 'condition'),
    indent([
      path.getParentNode().type === 'Conditional' ? hardline : line,
      '? ',
      path.call(print, 'trueExpression'),
      line,
      ': ',
      path.call(print, 'falseExpression')
    ])
  ]);

export const Conditional = {
  print: ({ node, path, print, options }) =>
    options.experimentalTernaries
      ? experimentalTernaries(node, path, print)
      : traditionalTernaries(path, print)
};
