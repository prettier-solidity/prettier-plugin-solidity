import { version } from 'prettier';
import satisfies from 'semver/functions/satisfies.js';

import type { Range } from 'semver';

export function prettierVersionSatisfies(range: string | Range): boolean {
  return satisfies(version, range);
}
