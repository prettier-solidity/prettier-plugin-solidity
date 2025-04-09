import type { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, Comment, StrictAstNode } from './slang-nodes/types.d.ts';

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

interface BaseComment {
  value: string;
  loc: Location;
  leading?: boolean;
  trailing?: boolean;
  printed?: boolean;
  placement?: 'endOfLine' | 'ownLine' | 'remaining';
  precedingNode?: StrictAstNode;
  enclosingNode?: StrictAstNode;
  followingNode?: StrictAstNode;
}

interface Metadata {
  comments: Comment[];
  loc: AstLocation;
}

interface SlangNode {
  kind:
    | NonterminalKind
    | typeof TerminalKind.Identifier
    | typeof TerminalKind.YulIdentifier
    | typeof TerminalKind.MultiLineComment
    | typeof TerminalKind.MultiLineNatSpecComment
    | typeof TerminalKind.SingleLineComment
    | typeof TerminalKind.SingleLineNatSpecComment;
  comments?: Comment[];
  loc: AstLocation | Location;
  print(
    path: AstPath<AstNode>,
    print: (path: AstPath<AstNode>) => Doc,
    options: ParserOptions
  ): Doc;
}

type PrintFunction = (path: AstPath<AstNode>) => Doc;

// This the union of all the types in the namespace `ast`.
type TypeOfAst = typeof ast;
type KeyOfAst = keyof TypeOfAst;
type ValuesOf<E> = E[keyof E];

type SlangAstNode = { [k in KeyOfAst]: ValuesOf<TypeOfAst[k]> }[KeyOfAst];
