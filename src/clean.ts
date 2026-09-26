// Prettier offers a clean way to define ignored properties.
const ignoredProperties = new Set(['loc', 'range', 'comments']);
function clean(/* ast, newObj, parent */): void {
  // Prettier strips `ignoredProperties` from each node before comparing ASTs;
  // Solidity needs no further cleanup, so this is intentionally empty.
}
clean.ignoredProperties = ignoredProperties;

export default clean;
