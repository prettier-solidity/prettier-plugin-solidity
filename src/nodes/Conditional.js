import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const {
  breakParent,
  group,
  hardline,
  hardlineWithoutBreakParent,
  ifBreak,
  indent,
  line
} = doc.builders;

let groupIndex = 0;
const experimentalTernaries = (node, path, print) => {
  const parent = path.getParentNode();

  // If the current `Conditional` is nested in another `Conditional`'s
  // `trueExpression`, we add a line without propagating the break group.
  // If the `conditionDoc` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  // This can only be done because we are sure that the `condition` must be a
  // single `bool` value.
  const conditionDoc = path.call(print, 'condition');
  const conditionGroup = group(
    [
      parent.type === 'Conditional' && parent.trueExpression === node
        ? hardlineWithoutBreakParent
        : parent.type === 'FunctionCall'
          ? breakParent
          : '',
      node.condition.type === 'TupleExpression'
        ? conditionDoc
        : group(
            ifBreak(['(', printSeparatedItem(conditionDoc), ')'], conditionDoc)
          ),
      ' ?'
    ],
    { id: `Conditional.condition-${groupIndex}` }
  );

  groupIndex += 1;

  // If the `conditionGroup` breaks we force a new line to separate the
  // `trueExpression` and `falseExpression`.
  // In the case of `Conditional`, `VariableDeclarationStatement` and
  // `ReturnStatement` we avoid propagating the group breaking.
  const expressionSeparator = ifBreak(hardlineWithoutBreakParent, line, {
    groupId: conditionGroup.id
  });

  // We avoid prepending a separation if the `trueExpression` is a
  // `Conditional` since it's added by default in the `conditionGroup`.
  const trueIsConditional = node.trueExpression.type === 'Conditional';
  const trueExpressionDoc = printSeparatedItem(
    [
      trueIsConditional ? '' : expressionSeparator,
      path.call(print, 'trueExpression')
    ],
    { firstSeparator: '' }
  );

  // We force a new line if it's a nested `Conditional` or if the
  // `falseExpression` is a `Conditional`. Otherwise we add a normal separator.
  const falseIsConditional = node.falseExpression.type === 'Conditional';
  const falseExpressionDoc = [
    parent.type === 'Conditional' || falseIsConditional
      ? hardlineWithoutBreakParent
      : expressionSeparator,
    ': ',
    path.call(print, 'falseExpression')
  ];

  const document = group([
    parent.type === 'TupleExpression' ? breakParent : '',
    conditionGroup,
    trueExpressionDoc,
    falseExpressionDoc
  ]);

  return parent.type === 'VariableDeclarationStatement'
    ? ifBreak(
        indent([
          trueIsConditional || falseIsConditional ? hardline : line,
          document
        ]),
        document
      )
    : document;
};

const traditionalTernaries = (path, print) =>
  group([
    path.call(print, 'condition'),
    indent([
      // We force line breaks if it's a nested `Conditional`
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
