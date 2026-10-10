import type { Location } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export abstract class CommentNode {
  loc: Location;

  leading?: boolean;

  trailing?: boolean;

  printed?: boolean;

  placement?: 'endOfLine' | 'ownLine' | 'remaining';

  precedingNode?: PrintableNode;

  enclosingNode?: PrintableNode;

  followingNode?: PrintableNode;

  protected constructor(start: number, end: number) {
    this.loc = { start, end };
  }
}
