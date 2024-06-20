import { doc } from 'prettier';
import { isLast, isNextLineEmpty } from './backward-compatibility.js';

const { dedent, group, hardline, indent, line } = doc.builders;

function createKindCheckFunction(kindsArray) {
  const kinds = new Set(kindsArray);
  return (node) => kinds.has(node?.kind);
}

export const isBlockComment = createKindCheckFunction([
  'MultiLineComment',
  'MultiLineNatSpecComment'
]);

export const isLineComment = createKindCheckFunction([
  'SingleLineComment',
  'SingleLineNatSpecComment'
]);

export function isComment(node) {
  return isBlockComment(node) || isLineComment(node);
}

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

export const isBinaryOperation = createKindCheckFunction([
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
]);

const binaryGroupRulesBuilder = (path) => (document) => {
  const grandparentNode = path.getNode(2);
  if (
    isBinaryOperation(grandparentNode) &&
    grandparentNode.kind !== 'ComparisonExpression'
  ) {
    return document;
  }
  return group(document);
};

const binaryIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (grandparentNode.kind === 'ReturnStatement') break;
    if (
      !isBinaryOperation(grandparentNode) ||
      grandparentNode.kind === 'ComparisonExpression'
    ) {
      return indent(document);
    }
    if (node === grandparentNode.rightOperand.variant) break;
    node = grandparentNode;
  }
  return document;
};

const comparisonGroupRulesBuilder = () => (document) => group(document);

const isStatementWithComparisonOperationWithoutIndentation =
  createKindCheckFunction([
    'ReturnStatement',
    'IfStatement',
    'ForStatement',
    'WhileStatement'
  ]);

const comparisonIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (isStatementWithComparisonOperationWithoutIndentation(grandparentNode))
      break;
    if (!isBinaryOperation(grandparentNode)) return indent(document);
    if (node === grandparentNode.rightOperand.variant) break;
    node = grandparentNode;
  }
  return document;
};

const logicalGroupRulesBuilder = (path) => (document) =>
  isBinaryOperation(path.getNode(2)) ? document : group(document);

const isStatementWithLogicalOperationWithoutIndentation =
  createKindCheckFunction(['ReturnStatement', 'IfStatement', 'WhileStatement']);

const logicalIndentRulesBuilder = (path, options) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const parentNode = path.getNode(i);
    if (isStatementWithLogicalOperationWithoutIndentation(parentNode)) break;
    if (
      options.experimentalTernaries &&
      parentNode.kind === 'ConditionalExpression' &&
      parentNode.operand.variant === node
    )
      break;
    if (!isBinaryOperation(parentNode)) return indent(document);
    if (node === parentNode.rightOperand.variant) break;
    node = parentNode;
  }
  return document;
};

export const rightOperandPrint = (node, path, print) => {
  const rightOperand = [line, path.call(print, 'rightOperand')];

  // If it's a single binary operation, avoid having a small right
  // operand like - 1 on its own line
  const shouldGroup =
    !isBinaryOperation(node.leftOperand.variant) &&
    !isBinaryOperation(path.getNode(2));

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

export const tryHug = (node, huggableOperators) => {
  if (
    isBinaryOperation(node.variant) &&
    huggableOperators.has(node.variant.operator)
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
