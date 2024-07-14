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
      isNextLineEmpty(options.originalText, options.locEnd(node))
        ? hardline
        : ''
    ];
  }, key);
}

export function printFunction(functionName, node, path, print) {
  return [
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
}

const visibilityKeyWords = ['external', 'internal', 'public', 'private'];
const mutabilityKeyWords = ['pure', 'constant', 'payable', 'view'];

export function sortFunctionAttributes(a, b) {
  const aIsString = typeof a.variant === 'string';
  const bIsString = typeof b.variant === 'string';

  if (aIsString && !bIsString) return -1;
  if (bIsString && !aIsString) return 1;

  // Both are strings
  if (aIsString && bIsString) {
    // Visibility First
    if (visibilityKeyWords.includes(a.variant)) return -1;
    if (visibilityKeyWords.includes(b.variant)) return 1;
    // State Mutability Second
    if (mutabilityKeyWords.includes(a.variant)) return -1;
    if (mutabilityKeyWords.includes(b.variant)) return 1;
    // Virtual keyword last
  } else {
    // Both are nodes
    if (
      a.variant.kind === 'OverrideSpecifier' &&
      b.variant.kind === 'ModifierInvocation'
    )
      return -1;
    if (
      b.variant.kind === 'OverrideSpecifier' &&
      a.variant.kind === 'ModifierInvocation'
    )
      return 1;
  }
  return 0;
}

export function hasNodeIgnoreComment(node) {
  return (
    node?.comments &&
    node.comments.some(
      (comment) =>
        comment.value
          .slice(2, isBlockComment(comment) ? -2 : undefined)
          .trim() === 'prettier-ignore'
    )
  );
}

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

export const isBinaryOperationWithoutComparison = createKindCheckFunction([
  'AdditiveExpression',
  'MultiplicativeExpression',
  'ExponentiationExpression',
  'AssignmentExpression',
  'BitwiseAndExpression',
  'BitwiseOrExpression',
  'BitwiseXorExpression',
  'AndExpression',
  'OrExpression',
  'ShiftExpression'
]);

const binaryGroupRulesBuilder = (path) => (document) => {
  const grandparentNode = path.getNode(2);
  if (isBinaryOperationWithoutComparison(grandparentNode)) {
    return document;
  }
  return group(document);
};

const binaryIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (grandparentNode.kind === 'ReturnStatement') break;
    if (!isBinaryOperationWithoutComparison(grandparentNode)) {
      return indent(document);
    }
    if (node === grandparentNode.rightOperand.variant) break;
    node = grandparentNode;
  }
  return document;
};

const isStatementWithoutIndentedOperation = createKindCheckFunction([
  'ReturnStatement',
  'IfStatement',
  'WhileStatement'
]);

const comparisonIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (grandparentNode.kind === 'ExpressionStatement') {
      if (path.getNode(i + 1).kind === 'ForStatementCondition') break;
      else return indent(document);
    }
    if (isStatementWithoutIndentedOperation(grandparentNode)) break;
    if (!isBinaryOperation(grandparentNode)) return indent(document);
    if (node === grandparentNode.rightOperand.variant) break;
    node = grandparentNode;
  }
  return document;
};

const logicalGroupRulesBuilder = (path) => (document) =>
  isBinaryOperation(path.getNode(2)) ? document : group(document);

const logicalIndentRulesBuilder = (path, options) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (isStatementWithoutIndentedOperation(grandparentNode)) break;
    if (
      options.experimentalTernaries &&
      grandparentNode.kind === 'ConditionalExpression' &&
      grandparentNode.operand.variant === node
    )
      break;
    if (!isBinaryOperation(grandparentNode)) return indent(document);
    if (node === grandparentNode.rightOperand.variant) break;
    node = grandparentNode;
  }
  return document;
};

export function rightOperandPrint(node, path, print) {
  const rightOperand = [line, path.call(print, 'rightOperand')];

  // If it's a single binary operation, avoid having a small right
  // operand like - 1 on its own line
  const shouldGroup =
    !isBinaryOperation(node.leftOperand.variant) &&
    !isBinaryOperation(path.getNode(2));

  return shouldGroup ? group(rightOperand) : rightOperand;
}

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

export const locStart = (node) => node.loc.start;
export const locEnd = (node) => node.loc.end;

export function printComments(node, path, options, filter = () => true) {
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
}
