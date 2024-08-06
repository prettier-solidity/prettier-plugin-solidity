import type { Doc, doc } from 'prettier';

export function isLabel(document: Doc): document is doc.builders.Label {
  return (document as doc.builders.DocCommand).type === 'label';
}
