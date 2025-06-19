import * as nodes from './nodes/index.js';
import { printWarning } from './common/print-warning.js';
import { hasNodeIgnoreComment } from './common/util.js';
import ignoreComments from './comments/ignore.js';

function once(factory) {
  let value;
  return () => {
    if (typeof value === 'undefined') {
      value = factory();
    }
    return value;
  };
}

const warnDeprecation = once(() => {
  printWarning(
    `The 'antlr' parser has been deprecated, please use 'slang' instead.`
  );
  return true;
});

function genericPrint(path, options, print) {
  warnDeprecation();

  const node = path.getValue();
  if (node === null) {
    return '';
  }

  if (!(node.type in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(
      options.locStart(node),
      options.locEnd(node) + 1
    );
  }

  return nodes[node.type].print({ node, options, path, print });
}

export default genericPrint;
