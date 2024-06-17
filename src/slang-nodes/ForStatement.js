import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { group, indent, line } = doc.builders;

export const ForStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    forKeyword: ast.forKeyword.text,
    openParen: ast.openParen.text,
    initialization: parse(ast.initialization, options, parse, offsets),
    condition: parse(ast.condition, options, parse, offsets),
    iterator: ast.iterator
      ? parse(ast.iterator, options, parse, offsets)
      : undefined,
    closeParen: ast.closeParen.text,
    body: parse(ast.body, options, parse, offsets)
  }),
  print: ({ node, path, print }) => {
    const initialization = path.call(print, 'initialization');
    const condition = path.call(print, 'condition');
    const iterator = node.iterator ? path.call(print, 'iterator') : '';

    return [
      `${node.forKeyword} ${node.openParen}`,
      printSeparatedList([initialization, condition, iterator], {
        separator:
          initialization !== ';' || condition !== ';' || iterator !== ''
            ? line
            : ''
      }),
      node.closeParen,
      node.body.variant.kind === 'Block'
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]))
    ];
  }
};
