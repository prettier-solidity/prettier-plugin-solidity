import type { util } from 'prettier';
import type { ConstructorAttribute } from '../slang-nodes/ConstructorAttribute.ts';
import type { FallbackFunctionAttribute } from '../slang-nodes/FallbackFunctionAttribute.ts';
import type { FunctionAttribute } from '../slang-nodes/FunctionAttribute.ts';
import type { FunctionTypeAttribute } from '../slang-nodes/FunctionTypeAttribute.ts';
import type { ModifierAttribute } from '../slang-nodes/ModifierAttribute.ts';
import type { ReceiveFunctionAttribute } from '../slang-nodes/ReceiveFunctionAttribute.ts';
import type { StateVariableAttribute } from '../slang-nodes/StateVariableAttribute.ts';
import type { UnnamedFunctionAttribute } from '../slang-nodes/UnnamedFunctionAttribute.ts';
import type { AstNode } from '../slang-nodes/index.d.ts';

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
    node: AstNode,
    locEnd: (node: AstNode) => number
  ): number | false;

  function isNextLineEmptyAfterIndex(text: string, startIndex: number): boolean;
}

type utilV2 = typeof util & typeof utilV2Functions;