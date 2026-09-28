import type * as ast from '@nomicfoundation/slang/ast';
import type * as cst from '@nomicfoundation/slang/cst';
import type * as parser from '@nomicfoundation/slang/parser';
import type * as utils from '@nomicfoundation/slang/utils';

// Slang's .wasm loads with a top-level `await`; to keep it out of every
// importer, `src/index.ts` awaits `loadSlang()`, which fills in these values.
export let NonterminalKind: typeof cst.NonterminalKind;
export let TerminalKind: typeof cst.TerminalKind;
export type TerminalKind = cst.TerminalKind;
export let TerminalKindExtensions: typeof cst.TerminalKindExtensions;
export let TerminalNode: typeof cst.TerminalNode;
export type TerminalNode = cst.TerminalNode;
export let Parser: typeof parser.Parser;
export type Parser = parser.Parser;
export let LanguageFacts: typeof utils.LanguageFacts;
export let SlangAst: typeof ast;

let loading: Promise<void> | undefined;

async function load(): Promise<void> {
  SlangAst = await import('@nomicfoundation/slang/ast');
  ({ NonterminalKind, TerminalKind, TerminalKindExtensions, TerminalNode } =
    await import('@nomicfoundation/slang/cst'));
  ({ Parser } = await import('@nomicfoundation/slang/parser'));
  ({ LanguageFacts } = await import('@nomicfoundation/slang/utils'));
}

export function loadSlang(): Promise<void> {
  loading ??= load();
  return loading;
}
