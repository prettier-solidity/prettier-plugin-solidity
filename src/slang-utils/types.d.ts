import type { ConstructorAttribute } from '../slang-nodes/ConstructorAttribute.ts';
import type { FallbackFunctionAttribute } from '../slang-nodes/FallbackFunctionAttribute.ts';
import type { FunctionAttribute } from '../slang-nodes/FunctionAttribute.ts';
import type { FunctionTypeAttribute } from '../slang-nodes/FunctionTypeAttribute.ts';
import type { ModifierAttribute } from '../slang-nodes/ModifierAttribute.ts';
import type { ReceiveFunctionAttribute } from '../slang-nodes/ReceiveFunctionAttribute.ts';
import type { StateVariableAttribute } from '../slang-nodes/StateVariableAttribute.ts';
import type { UnnamedFunctionAttribute } from '../slang-nodes/UnnamedFunctionAttribute.ts';

type SortableAttribute =
  | ConstructorAttribute
  | FallbackFunctionAttribute
  | FunctionAttribute
  | FunctionTypeAttribute
  | ModifierAttribute
  | ReceiveFunctionAttribute
  | StateVariableAttribute
  | UnnamedFunctionAttribute;
