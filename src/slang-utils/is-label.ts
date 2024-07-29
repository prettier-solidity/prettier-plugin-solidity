import type { Doc, doc } from 'prettier';

export function isLabel(doc: Doc): doc is doc.builders.Label {
  return (doc as doc.builders.DocCommand).type === 'label';
}
