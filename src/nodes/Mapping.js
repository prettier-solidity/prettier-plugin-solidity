const namedParameter = (prefix, node, path, print) =>
  node[`${prefix}Name`]
    ? [
        path.call(print, `${prefix}Type`),
        ' ',
        path.call(print, `${prefix}Name`)
      ]
    : path.call(print, `${prefix}Type`);

export const Mapping = {
  print: ({ node, path, print }) => [
    'mapping(',
    namedParameter('key', node, path, print),
    ' => ',
    namedParameter('value', node, path, print),
    ')'
  ]
};
