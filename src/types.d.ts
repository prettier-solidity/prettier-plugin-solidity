import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { AstNode } from './slang-nodes/types.d.ts';

// Adding our own options to prettier's `ParserOptions` interface.
declare module 'prettier' {
  interface ParserOptions {
    compiler: string;
  }
}

interface Location {
  start: number;
  end: number;
}

interface AstLocation extends Location {
  leadingOffset: number;
  trailingOffset: number;
}

type PrintFunction = (path: AstPath<AstNode>) => Doc;

// This the union of all the types in the namespace `ast`.
type TypeOfAst = typeof ast;
type KeyOfAst = keyof TypeOfAst;
type ValuesOf<E> = E[keyof E];

type SlangAstNode = { [k in KeyOfAst]: ValuesOf<TypeOfAst[k]> }[KeyOfAst];
