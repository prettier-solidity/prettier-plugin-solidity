export function createKindCheckFunction(kindsArray) {
  const kinds = new Set(kindsArray);
  return (node) => kinds.has(node?.kind);
}
