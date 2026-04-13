import type { PrintableNode } from '../slang-nodes/types.d.ts';

const ignoredKeys = new Set([
  'kind',
  'loc',
  'comments',
  'print',
  'isEmpty',
  'updateMetadata',
  'cleanModifierInvocationArguments',
  'getSingleExpression'
]);

export function getVisitorKeys(
  node: PrintableNode,
  nonTraversableKeys: Set<string>
): string[] {
  return Object.keys(node).filter(
    (key) => !nonTraversableKeys.has(key) && !ignoredKeys.has(key)
  );
}
