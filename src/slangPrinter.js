import * as nodes from './slang-nodes/index.js';
import {
  prettierVersionSatisfies
} from './common/util.js';
import { hasNodeIgnoreComment } from './common/slang-helpers.js';
import ignoreComments from './comments/ignore.js';

let checked = false;

function prettierVersionCheck() {
  if (checked) return;
  if (!prettierVersionSatisfies('>=2.3.0')) {
    throw new Error(
      'The version of prettier in your node-modules does not satisfy the required ">=2.3.0" constraint. Please update the version of Prettier.'
    );
  }
  checked = true;
}

function genericPrint(path, options, print) {
  prettierVersionCheck();

  const node = path.getValue();
  const nodeType = node.kind;
  if (node === null) {
    return '';
  }

  if (!(nodeType in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(nodeType)}`);
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(
      options.locStart(node),
      options.locEnd(node)
    );
  }

  return node.print(path, print, options);
}

export default genericPrint;
