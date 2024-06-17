import { doc } from 'prettier';
import { isLast, isNextLineEmpty } from './backward-compatibility.js';

const { dedent, group, hardline, indent, line } = doc.builders;

export const printFunction = (functionName, node, path, print) => [
  group([
    functionName,
    path.call(print, 'parameters'),
    indent(
      group([
        path.call(print, 'attributes'),
        node.returns ? [line, path.call(print, 'returns')] : '',
        node.body?.variant !== ';' ? dedent(line) : ''
      ])
    )
  ]),
  node.body ? path.call(print, 'body') : ''
];

export function printPreservingEmptyLines(path, key, options, print) {
  return path.map((childPath, index) => {
    const node = childPath.getNode();

    return [
      // Only attempt to prepend an empty line if `node` is not the first item
      index > 0 &&
      // YulLabel adds a dedented line so we don't have to prepend a hardline.
      (node.kind !== 'YulStatement' || node.variant.kind !== 'YulLabel')
        ? hardline
        : '',
      print(childPath),
      // Only attempt to append an empty line if `node` is not the last item
      !isLast(childPath, key, index) &&
      // Append an empty line if the original text already had an one after the
      // current `node`
      isNextLineEmpty(options.originalText, options.locEnd(node))
        ? hardline
        : ''
    ];
  }, key);
}

export const binaryOperationKinds = [
  'AdditiveExpression',
  'MultiplicativeExpression',
  'ExponentiationExpression',
  'AssignmentExpression',
  'BitwiseAndExpression',
  'BitwiseOrExpression',
  'BitwiseXorExpression',
  'ComparisonExpression',
  'EqualityExpression',
  'AndExpression',
  'OrExpression',
  'ShiftExpression'
];

const binaryOperationKindsWithoutComparison = binaryOperationKinds.filter(
  (kind) => kind !== 'ComparisonExpression'
);

const binaryGroupRulesBuilder = (path) => (document) => {
  const grandparentNode = path.getNode(2);
  if (binaryOperationKindsWithoutComparison.includes(grandparentNode.kind)) {
    return document;
  }
  return group(document);
};

const binaryIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (grandparentNode.kind === 'ReturnStatement') return document;
    if (!binaryOperationKindsWithoutComparison.includes(grandparentNode.kind)) {
      return indent(document);
    }
    if (node === grandparentNode.rightOperand.variant) return document;
    node = grandparentNode;
  }
};

const comparisonGroupRulesBuilder = () => (document) => group(document);

const comparisonStatementsWithoutIndentationKinds = [
  'ReturnStatement',
  'IfStatement',
  'ForStatement',
  'WhileStatement'
];

const comparisonIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (
      comparisonStatementsWithoutIndentationKinds.includes(grandparentNode.kind)
    )
      return document;
    if (!binaryOperationKinds.includes(grandparentNode.kind))
      return indent(document);
    if (node === grandparentNode.rightOperand.variant) return document;
    node = grandparentNode;
  }
};

const logicalGroupRulesBuilder = (path) => (document) =>
  binaryOperationKinds.includes(path.getNode(2).kind)
    ? document
    : group(document);

const logicalStatementsWithoutIndentationKinds =
  comparisonStatementsWithoutIndentationKinds.filter(
    (kind) => kind !== 'ForStatement'
  );

const logicalIndentRulesBuilder = (path, options) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const parentNode = path.getNode(i);
    if (logicalStatementsWithoutIndentationKinds.includes(parentNode.kind))
      return document;
    if (
      options.experimentalTernaries &&
      parentNode.kind === 'ConditionalExpression' &&
      parentNode.operand.variant === node
    )
      return document;
    if (!binaryOperationKinds.includes(parentNode.kind))
      return indent(document);
    if (node === parentNode.rightOperand.variant) return document;
    node = parentNode;
  }
};

export const rightOperandPrint = (node, path, print) => {
  const rightOperand = [line, path.call(print, 'rightOperand')];

  // If it's a single binary operation, avoid having a small right
  // operand like - 1 on its own line
  const shouldGroup =
    !binaryOperationKinds.includes(node.leftOperand.variant.kind) &&
    !binaryOperationKinds.includes(path.getNode(2).kind);

  return shouldGroup ? group(rightOperand) : rightOperand;
};

const binaryOperationPrintBuilder =
  (groupRulesBuilder, indentRulesBuilder) =>
  ({ node, path, print, options }) => {
    const groupRules = groupRulesBuilder(path);
    const indentRules = indentRulesBuilder(path, options);

    return groupRules([
      path.call(print, 'leftOperand'),
      ` ${node.operator}`,
      indentRules(rightOperandPrint(node, path, print))
    ]);
  };

export const binaryOperationPrint = binaryOperationPrintBuilder(
  binaryGroupRulesBuilder,
  binaryIndentRulesBuilder
);

export const comparisonOperationPrint = binaryOperationPrintBuilder(
  comparisonGroupRulesBuilder,
  comparisonIndentRulesBuilder
);

export const logicalOperationPrint = binaryOperationPrintBuilder(
  logicalGroupRulesBuilder,
  logicalIndentRulesBuilder
);

export const tryHug = (node, operators) => {
  if (
    binaryOperationKinds.includes(node.variant.kind) &&
    operators.includes(node.variant.operator)
  )
    return {
      kind: 'Expression',
      loc: { ...node.loc },
      variant: {
        kind: 'TupleExpression',
        loc: { ...node.loc },
        openParen: '(',
        items: {
          kind: 'TupleValues',
          loc: { ...node.loc },
          items: [
            { kind: 'TupleValue', loc: { ...node.loc }, expression: node }
          ],
          separators: []
        },
        closeParen: ')'
      }
    };
  return node;
};
