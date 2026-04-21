import type * as ast from '@nomicfoundation/slang/ast';
import type { TerminalNode as SlangTerminalNode } from '@nomicfoundation/slang/cst';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { Comment, PrintableNode } from './slang-nodes/types.d.ts';

// Adding our own options to prettier's `ParserOptions` interface.
declare module 'prettier' {
  interface ParserOptions {
    compiler: string;
  }
}

interface CollectedMetadata {
  offsets: Map<number, number>;
  comments: Comment[];
  options: ParserOptions<PrintableNode>;
}

interface Location {
  start: number;
  end: number;
}

interface AstLocation extends Location {
  outerStart: number;
  outerEnd: number;
}

type PrintFunction = (
  selector?: string | number | (string | number)[] | AstPath<PrintableNode>
) => Doc;

// This the union of all the types in the namespace `ast`.
type TypeOfAst = typeof ast;
type KeyOfAst = keyof TypeOfAst;
type ValuesOf<E> = E[keyof E];

type SlangAstNode = { [k in KeyOfAst]: ValuesOf<TypeOfAst[k]> }[KeyOfAst];
type SlangAstNodeClass = { [k in KeyOfAst]: TypeOfAst[k] }[KeyOfAst];

type SlangPolymorphicNode = Extract<
  SlangAstNode,
  { variant: SlangAstNode | SlangTerminalNode }
>;

type SlangPolymorphicNonterminalNode = Extract<
  SlangAstNode,
  { variant: SlangAstNode }
>;

type SlangPolymorphicTerminalNode = Extract<
  SlangAstNode,
  { variant: SlangTerminalNode }
>;

type SlangCollectionNode = Extract<
  SlangAstNode,
  { items: readonly (SlangAstNode | SlangTerminalNode)[] }
>;

type SlangVariantCollection = Extract<
  SlangCollectionNode,
  { items: readonly SlangPolymorphicNode[] }
>;

type SlangBinaryOperation = Extract<
  SlangAstNode,
  {
    leftOperand: ast.Expression;
    operator: SlangTerminalNode;
    rightOperand: ast.Expression;
  }
>;

type SlangUnaryOperation = Extract<
  SlangAstNode,
  { operand: ast.Expression; operator: SlangTerminalNode }
>;
