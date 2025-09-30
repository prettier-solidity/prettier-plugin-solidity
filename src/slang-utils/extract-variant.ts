import type { StrictPolymorphicNode } from '../slang-nodes/types.ts';

export function extractVariant<T extends StrictPolymorphicNode>({
  variant,
  loc
}: T): T['variant'] {
  variant.loc = loc;
  return variant;
}
