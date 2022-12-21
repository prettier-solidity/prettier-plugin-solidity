// Prettier offers a clean way to define ignored properties.
const ignoredProperties = new Set(['loc', 'range', 'comments']);
function clean(/* ast, newObj, parent */) {}
clean.ignoredProperties = ignoredProperties;

module.exports = clean;
