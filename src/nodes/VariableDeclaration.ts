import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type {
  StateVariableDeclarationVariable,
  VariableDeclaration as IVariableDeclaration
} from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const { group, indent, line } = doc.builders;

function isStateVariableDeclarationVariable(
  node: IVariableDeclaration
): node is StateVariableDeclarationVariable {
  return (
    (node as StateVariableDeclarationVariable).override !== undefined &&
    (node as StateVariableDeclarationVariable).isImmutable !== undefined
  );
}

const indexed = (node: IVariableDeclaration): string =>
  node.isIndexed ? ' indexed' : '';

const visibility = (node: IVariableDeclaration): Doc =>
  node.visibility && node.visibility !== 'default'
    ? [line, node.visibility]
    : '';

const constantKeyword = (node: IVariableDeclaration): string =>
  node.isDeclaredConst ? ' constant' : '';

const storageLocation = (node: IVariableDeclaration): Doc =>
  node.storageLocation && node.visibility !== 'default'
    ? [line, node.storageLocation]
    : '';

const immutable = (node: IVariableDeclaration): string =>
  isStateVariableDeclarationVariable(node) && node.isImmutable
    ? ' immutable'
    : '';

const override = (
  node: IVariableDeclaration,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc => {
  if (!isStateVariableDeclarationVariable(node) || !node.override) return '';
  return [
    line,
    'override',
    node.override.length === 0
      ? ''
      : ['(', printSeparatedList(path.map(print, 'override')), ')']
  ];
};

const name = (node: IVariableDeclaration): string =>
  node.name ? ` ${node.name}` : '';

export const VariableDeclaration: NodePrinter<IVariableDeclaration> = {
  print: ({ node, path, print }) =>
    node.typeName
      ? group([
          path.call(print, 'typeName'),
          indent([
            indexed(node),
            visibility(node),
            constantKeyword(node),
            storageLocation(node),
            immutable(node),
            override(node, path, print),
            name(node)
          ])
        ])
      : node.name!
};
