import type { util } from 'prettier';
import type { ConstructorAttribute } from '../slang-nodes/ConstructorAttribute';
import type { FallbackFunctionAttribute } from '../slang-nodes/FallbackFunctionAttribute';
import type { FunctionAttribute } from '../slang-nodes/FunctionAttribute';
import type { FunctionTypeAttribute } from '../slang-nodes/FunctionTypeAttribute';
import type { ModifierAttribute } from '../slang-nodes/ModifierAttribute';
import type { ReceiveFunctionAttribute } from '../slang-nodes/ReceiveFunctionAttribute';
import type { StateVariableAttribute } from '../slang-nodes/StateVariableAttribute';
import type { UnnamedFunctionAttribute } from '../slang-nodes/UnnamedFunctionAttribute';
import type { AstNode } from '../slang-nodes';
import type { Comment } from '../types';

type SortableAttribute =
  | ConstructorAttribute
  | FallbackFunctionAttribute
  | FunctionAttribute
  | FunctionTypeAttribute
  | ModifierAttribute
  | ReceiveFunctionAttribute
  | StateVariableAttribute
  | UnnamedFunctionAttribute;

declare namespace utilV2Functions {
  function getNextNonSpaceNonCommentCharacterIndex(
    text: string,
    node: AstNode | Comment,
    locEnd: (node: AstNode) => number
  ): number | false;

  function isNextLineEmptyAfterIndex(text: string, startIndex: number): boolean;
}

type utilV2 = typeof util & typeof utilV2Functions;
