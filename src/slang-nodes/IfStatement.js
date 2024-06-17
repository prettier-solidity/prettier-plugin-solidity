import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, hardline, indent, line } = doc.builders;

const printBody = (bodyVariantKind, path, print) =>
  bodyVariantKind === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]), {
        shouldBreak: bodyVariantKind === 'IfStatement' // `if` within `if`
      });

export const IfStatement = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    ifKeyword: ast.ifKeyword.text,
    openParen: ast.openParen.text,
    condition: parse(ast.condition, options, parse, offsets),
    closeParen: ast.closeParen.text,
    body: parse(ast.body, options, parse, offsets),
    elseBranch: ast.elseBranch
      ? parse(ast.elseBranch, options, parse, offsets)
      : undefined
  }),
  print: ({ node, path, print }) => {
    const bodyVariantKind = node.body.variant.kind;

    return [
      `${node.ifKeyword} ${node.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      node.closeParen,
      printBody(bodyVariantKind, path, print),
      node.elseBranch
        ? [
            bodyVariantKind !== 'Block'
              ? hardline // else on a new line if body is not a block
              : ' ',
            path.call(print, 'elseBranch')
          ]
        : ''
    ];
  }
};
