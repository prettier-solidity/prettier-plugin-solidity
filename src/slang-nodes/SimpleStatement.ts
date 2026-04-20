import { SlangNode } from './SlangNode.js';

import type { Doc } from 'prettier';
import type { CollectedMetadata, SlangAstNode } from '../types.d.ts';

export abstract class SimpleStatement extends SlangNode {
  readonly #text: string;

  protected constructor(
    ast: SlangAstNode,
    collected: CollectedMetadata,
    text: string
  ) {
    super(ast, collected);
    this.#text = text;
  }

  print(): Doc {
    return this.#text;
  }
}
