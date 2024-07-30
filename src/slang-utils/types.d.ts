import type {
  ConstructorAttribute,
  FallbackFunctionAttribute,
  FunctionAttribute,
  FunctionTypeAttribute,
  ModifierAttribute,
  ReceiveFunctionAttribute,
  StateVariableAttribute,
  UnnamedFunctionAttribute,
  OverrideSpecifier,
  ModifierInvocation
} from '../slang-nodes';
import type { util } from 'prettier';
import type { astNode, Comment } from '../types';

type SortableAttribute =
  | ConstructorAttribute
  | FallbackFunctionAttribute
  | FunctionAttribute
  | FunctionTypeAttribute
  | ModifierAttribute
  | ReceiveFunctionAttribute
  | StateVariableAttribute
  | UnnamedFunctionAttribute;

type SortableVariant = OverrideSpecifier | ModifierInvocation;

declare namespace utilV2Functions {
  function getNextNonSpaceNonCommentCharacterIndex(
    text: string,
    node: astNode | Comment,
    locEnd: (node: astNode) => number
  ): number | false;

  function isNextLineEmptyAfterIndex(text: string, startIndex: number): boolean;
}

type utilV2 = typeof util & typeof utilV2Functions;
