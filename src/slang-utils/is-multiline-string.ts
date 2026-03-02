import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from './create-kind-check-function.js';

import type { StrictAstNode } from '../slang-nodes/types.js';
import type { StringLiterals } from '../slang-nodes/StringLiterals.js';
import type { HexStringLiterals } from '../slang-nodes/HexStringLiterals.js';
import type { UnicodeStringLiterals } from '../slang-nodes/UnicodeStringLiterals.js';

export const isMultilineString = createKindCheckFunction([
  NonterminalKind.StringLiterals,
  NonterminalKind.HexStringLiterals,
  NonterminalKind.UnicodeStringLiterals
]) as (
  node: StrictAstNode
) => node is StringLiterals | HexStringLiterals | UnicodeStringLiterals;
