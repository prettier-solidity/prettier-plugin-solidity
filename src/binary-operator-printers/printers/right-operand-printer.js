import { doc } from 'prettier';

const { line } = doc.builders;

export const rightOperandPrinter = (node, path, print, options) =>
  options.experimentalOperatorPosition === 'end'
    ? [' ', node.operator, line, path.call(print, 'right')]
    : [line, node.operator, ' ', path.call(print, 'right')];
