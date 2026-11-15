import { TerminalNode as SlangTerminalNode } from '@nomicfoundation/slang/cst';

import type { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import type { CollectedMetadata, Location, SlangAstNode } from '../types.d.ts';
import type { Comment } from './types.d.ts';

// Every own data field of a node, excluding its methods (`print`,
// `updateMetadata`, and any node-specific ones like `getSingleExpression`).
type DataFields<T> = {
  [
    K in keyof T as T[K] extends (...args: never[]) => unknown ? never : K
  ]: T[K];
};

export abstract class SlangNode {
  abstract readonly kind: TerminalKind | NonterminalKind;

  comments?: Comment[];

  loc: Location;

  protected constructor(
    ast: SlangAstNode | SlangTerminalNode,
    collected: CollectedMetadata
  ) {
    const { id } = ast instanceof SlangTerminalNode ? ast : ast.cst;
    // `collectMetadata` recorded every node of the tree before we started
    // building ours.
    this.loc = collected.locations.get(id)!;
  }

  updateMetadata(...childNodes: unknown[]): void;
  updateMetadata(): void {
    // do nothing
  }

  // Builds an instance with the right prototype (so `instanceof` and the
  // class's own methods work) bypassing its constructor, which expects a real
  // slang-parsed AST.
  static createSynthetic<T extends SlangNode>(
    this: (new (...args: never[]) => T) & { prototype: T },
    fields: DataFields<T>
  ): T {
    return Object.assign(Object.create(this.prototype) as T, fields);
  }
}
