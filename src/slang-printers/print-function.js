import { doc } from 'prettier';

const { dedent, group, indent, line } = doc.builders;

export function printFunction(functionName, node, path, print) {
  return [
    group([
      functionName,
      path.call(print, 'parameters'),
      indent(
        group([
          path.call(print, 'attributes'),
          node.returns ? [line, path.call(print, 'returns')] : '',
          node.body && node.body.variant !== ';' ? dedent(line) : ''
        ])
      )
    ]),
    node.body ? path.call(print, 'body') : ''
  ];
}
