import { TerminalNode as SlangTerminalNode } from '@nomicfoundation/slang/cst';

import type { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import type { CollectedMetadata, Location, SlangAstNode } from '../types.d.ts';
import type { Comment } from './types.d.ts';

// Every own data field of a node, excluding its methods (`print` and any
// node-specific ones like `getSingleExpression`).
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
    collected: CollectedMetadata,
    enclosePeripheralComments = false
  ) {
    const { id } = ast instanceof SlangTerminalNode ? ast : ast.cst;
    // `collectMetadata` recorded every node of the tree before we started
    // building ours.
    const [inner, outer] = collected.locations.get(id)!;

    // Only TerminalNodes will have an undefined `outer` location, since they
    // don't have children and will never have comments to enclose.
    this.loc = enclosePeripheralComments ? outer! : inner;
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
