import type { StrictPolymorphicNode } from '../slang-nodes/types.ts';

// TODO: Receive constructor as an argument and instantiate the node here.
export function extractVariant<T extends StrictPolymorphicNode>({
  variant,
  comments,
  loc
}: T): T['variant'] {
  variant.comments = comments;
  variant.loc = loc;
  return variant;
}
