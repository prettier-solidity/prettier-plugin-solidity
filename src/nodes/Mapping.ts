import type { Mapping as IMapping } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const namedParameter = (
  prefix: 'key' | 'value',
  node: IMapping,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node[`${prefix}Name`]
    ? [
        path.call(print, `${prefix}Type`),
        ' ',
        path.call(print, `${prefix}Name`)
      ]
    : path.call(print, `${prefix}Type`);

export const Mapping: NodePrinter<IMapping> = {
  print: ({ node, path, print }) => [
    'mapping(',
    namedParameter('key', node, path, print),
    ' => ',
    namedParameter('value', node, path, print),
    ')'
  ]
};
