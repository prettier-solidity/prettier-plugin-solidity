import { doc } from 'prettier';

import type { Doc } from 'prettier';

const { join } = doc.builders;

export function joinExisting(sep: Doc, docs: (Doc | undefined)[]): Doc[] {
  return join(sep, docs.filter(Boolean) as Doc[]);
}
