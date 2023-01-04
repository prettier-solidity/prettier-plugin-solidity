const {
  doc: {
    builders: { dedent, group, indent, join, line }
  },
  util: { getNextNonSpaceNonCommentCharacterIndex }
} = require('prettier');

const {
  printComments,
  printSeparatedItem,
  printSeparatedList
} = require('../common/printer-helpers');

const functionName = (node, options) => {
  if (node.isConstructor && !node.name) return 'constructor';
  if (node.name) return `function ${node.name}`;
  if (node.isReceiveEther) return 'receive';
  // The parser doesn't give us any information about the keyword used for the
  // fallback.
  // Using the originalText is the next best option.
  // A neat idea would be to rely on the pragma and enforce it but for the
  // moment this will do.
  const names = { fallback: 'fallback', function: 'function' };
  const name = options.originalText.slice(
    options.locStart(node),
    options.locStart(node) + 8
  );
  return names[name];
};

const parameters = (parametersType, node, path, print, options) => {
  if (node[parametersType] && node[parametersType].length > 0) {
    return printSeparatedList(path.map(print, parametersType), {
      grouped: false
    });
  }
  if (node.comments && node.comments.length > 0) {
    // we add a check to see if the comment is inside the parentheses
    const parameterComments = printComments(
      node,
      path,
      options,
      (comment) =>
        options.originalText.charAt(
          getNextNonSpaceNonCommentCharacterIndex(
            options.originalText,
            comment,
            options.locEnd
          )
        ) === ')'
    );
    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
  return '';
};

const visibility = (node) =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const virtual = (node) => (node.isVirtual ? [line, 'virtual'] : '');

const override = (node, path, print) => {
  if (!node.override) return '';
  if (node.override.length === 0) return [line, 'override'];
  return [
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ];
};

const stateMutability = (node) =>
  node.stateMutability ? [line, node.stateMutability] : '';

const modifiers = (node, path, print) =>
  node.modifiers.length > 0
    ? [line, join(line, path.map(print, 'modifiers'))]
    : '';

const returnParameters = (node, path, print, options) =>
  node.returnParameters
    ? [
        line,
        'returns (',
        group(parameters('returnParameters', node, path, print, options)),
        ')'
      ]
    : '';

const signatureEnd = (node) => (node.body ? dedent(line) : ';');

const body = (node, path, print) => (node.body ? path.call(print, 'body') : '');

const FunctionDefinition = {
  print: ({ node, path, print, options }) => [
    group([
      functionName(node, options),
      '(',
      parameters('parameters', node, path, print, options),
      ')',
      indent(
        group([
          // TODO: sort comments for modifiers and return parameters
          printComments(node, path, options),
          visibility(node),
          stateMutability(node),
          virtual(node),
          override(node, path, print),
          modifiers(node, path, print),
          returnParameters(node, path, print, options),
          signatureEnd(node)
        ])
      )
    ]),
    body(node, path, print)
  ]
};

module.exports = FunctionDefinition;
