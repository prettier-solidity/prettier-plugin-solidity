// Prettier now offers a clean way to define ignored properties.
// TODO: for some reason clean doesn't iterate over comments. Either ignore
// them completely or add logic to iterate over them in the clean function.
const ignoredProperties = new Set(['loc', 'range', 'comments']);
function clean(/* ast, newObj, parent */) {}
clean.ignoredProperties = ignoredProperties;

module.exports = clean;
