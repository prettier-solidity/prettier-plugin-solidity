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
