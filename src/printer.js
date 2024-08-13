import * as nodes from './nodes/index.js';
import {
  hasNodeIgnoreComment,
  prettierVersionSatisfies
} from './common/util.js';
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
  console.warn(`'solidity-parse' has been deprecated, please use 'slang'.`);
  return true;
});

const prettierVersionCheck = once(() => {
  if (!prettierVersionSatisfies('>=2.3.0')) {
    throw new Error(
      'The version of prettier in your node-modules does not satisfy the required ">=2.3.0" constraint. Please update the version of Prettier.'
    );
  }
  return true;
});

function genericPrint(path, options, print) {
  warnDeprecation();
  prettierVersionCheck();

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
