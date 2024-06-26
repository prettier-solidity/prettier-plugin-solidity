import { doc } from 'prettier';

const { group, indent, line } = doc.builders;

export const StateVariableDefinitionValue = {
  parse: ({ offsets, ast, options, parse }) => ({
    equal: ast.equal.text,
    value: parse(ast.value, options, parse, offsets)
  }),
  print: ({ node, path, print }) =>
    node.value.variant.kind === 'ArrayExpression'
      ? [` ${node.equal} `, path.call(print, 'value')]
      : group([` ${node.equal}`, indent([line, path.call(print, 'value')])])
};
