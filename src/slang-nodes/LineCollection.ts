import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc, util } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { locEnd } from '../slang-utils/loc.js';
import { VariantCollection } from './VariantCollection.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  CollectedMetadata,
  PrintFunction,
  SlangVariantCollection
} from '../types.d.ts';
import type {
  LineCollection as LineCollectionType,
  PrintableNode,
  StrictPolymorphicNode
} from './types.d.ts';

const { hardline } = doc.builders;

function printPreservingEmptyLines(
  node: LineCollectionType,
  print: PrintFunction,
  path: AstPath<LineCollectionType>,
  options: ParserOptions<PrintableNode>
): Doc {
  return node.items.length > 0
    ? path.map(({ node, isFirst, isLast }) => {
        return [
          // Only attempt to prepend an empty line if `node` is not the first item
          !isFirst &&
          // YulLabel adds a dedented line so we don't have to prepend a hardline.
          node.kind !== NonterminalKind.YulLabel
            ? hardline
            : '',
          print(),
          // Only attempt to append an empty line if `node` is not the last item
          !isLast &&
          // Append an empty line if the original text already had an one after the
          // current `node`
          util.isNextLineEmpty(options.originalText, locEnd(node))
            ? hardline
            : ''
        ];
      }, 'items')
    : printComments(node, path, options);
}

export abstract class LineCollection<
  A extends SlangVariantCollection,
  I extends StrictPolymorphicNode
> extends VariantCollection<A, I> {
  readonly #indented: boolean;

  protected constructor(
    ast: A,
    collected: CollectedMetadata,
    constructor: new (
      ast: A['items'][number],
      collected: CollectedMetadata
    ) => I,
    indented = true
  ) {
    super(ast, collected, constructor);

    this.#indented = indented;
  }

  print(
    print: PrintFunction,
    path: AstPath<LineCollectionType>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    const itemsDoc = printPreservingEmptyLines(
      this as LineCollectionType,
      print,
      path,
      options
    );

    if (!this.#indented) return itemsDoc;

    return this.items.length > 0 || (this.comments?.length || 0) > 0
      ? printSeparatedItem(itemsDoc, { firstSeparator: hardline })
      : '';
  }
}
