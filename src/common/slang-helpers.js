import { doc } from 'prettier';

const { dedent, group, indent, line } = doc.builders;

export const printFunction = (functionName, node, path, print) => [
  group([
    functionName,
    path.call(print, 'parameters'),
    indent(
      group([
        path.call(print, 'attributes'),
        node.returns ? [line, path.call(print, 'returns')] : '',
        dedent(line)
      ])
    )
  ]),
  path.call(print, 'body')
];
