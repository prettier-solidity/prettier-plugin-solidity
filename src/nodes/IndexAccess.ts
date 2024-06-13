import { doc } from 'prettier';
import { isLabel } from '../common/util.js';
import type { IndexAccess as IIndexAccess } from '@solidity-parser/parser/src/ast-types';
import type { Doc } from 'prettier';
import type { NodePrinter } from './types';

const { group, indent, indentIfBreak, label, softline } = doc.builders;

let groupIndex = 0;
export const IndexAccess: NodePrinter<IIndexAccess> = {
  print: ({ path, print }) => {
    let baseDoc = path.call(print, 'base');
    let indexDoc: Doc = group([
      indent([softline, path.call(print, 'index')]),
      softline,
      ']'
    ]);

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (isLabel(baseDoc) && baseDoc.label === 'MemberAccessChain') {
      baseDoc = group(baseDoc.contents, {
        id: Symbol(`IndexAccess.base-${groupIndex}`)
      });

      groupIndex += 1;

      indexDoc = indentIfBreak(indexDoc, { groupId: baseDoc.id! });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [baseDoc, '[', indexDoc]);
    }

    return [baseDoc, '[', indexDoc];
  }
};
