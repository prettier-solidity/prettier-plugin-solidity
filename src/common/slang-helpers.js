import { doc } from 'prettier';
import {
  isLast,
  isNextLineEmpty,
  isPrettier2
} from './backward-compatibility.js';

const { dedent, group, hardline, indent, join, line } = doc.builders;

export function createKindCheckFunction(kindsArray) {
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
      isNextLineEmpty(options.originalText, options.locEnd(node) - 1)
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
        node.body && node.body.variant !== ';' ? dedent(line) : ''
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
      grandparentNode.kind === 'ComparisonExpression' ||
      grandparentNode.kind === 'EqualityExpression'
    ) {
      return indent(document);
    }
    if (node === grandparentNode.rightOperand.variant) break;
    node = grandparentNode;
  }
  return document;
};

const isStatementWithComparisonOperationWithoutIndentation =
  createKindCheckFunction(['ReturnStatement', 'IfStatement', 'WhileStatement']);

const comparisonIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (grandparentNode.kind === 'ExpressionStatement') {
      if (path.getNode(i + 1).kind === 'ForStatementCondition') break;
      else return indent(document);
    }
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

export const binaryOperationPrintBuilder =
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
  () => (document) => group(document), // always group
  comparisonIndentRulesBuilder
);

export const logicalOperationPrint = binaryOperationPrintBuilder(
  logicalGroupRulesBuilder,
  logicalIndentRulesBuilder
);

export function createHugFunction(huggableOperators) {
  const operators = new Set(huggableOperators);
  return (node) => {
    if (isBinaryOperation(node.variant) && operators.has(node.variant.operator))
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
}

export const locStart = (node) => node.loc.start;
export const locEnd = (node) => node.loc.end;

export const printComments = (node, path, options, filter = () => true) => {
  if (!node.comments) return [];
  const document = join(
    line,
    path
      .map((commentPath) => {
        const comment = commentPath.getValue();
        if (comment.trailing || comment.leading || comment.printed) {
          return null;
        }
        if (!filter(comment)) {
          return null;
        }
        comment.printed = true;
        // TODO: prettier Prints leading and trailing comments anyway.
        comment.leading = false;
        comment.trailing = false;
        return options.printer.printComment(commentPath, options);
      }, 'comments')
      .filter(Boolean)
  );

  // The following if statement will never be 100% covered in a single run
  // since it depends on the version of Prettier being used.
  // Mocking the behaviour will introduce a lot of maintenance in the tests.
  /* c8 ignore start */
  return isPrettier2
    ? document.parts // Prettier V2
    : document; // Prettier V3
  /* c8 ignore stop */
};
