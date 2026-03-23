import type { Doc, doc } from 'prettier';

export function isLabel(
  document: Doc,
  value: symbol
): document is doc.builders.Label {
  return (
    (document as doc.builders.DocCommand).type === 'label' &&
    (document as doc.builders.Label).label === value
  );
}
