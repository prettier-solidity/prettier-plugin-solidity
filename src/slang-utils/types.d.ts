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

// This utility function helps us transform a union type `A | B | C` into an
// array `[A, B, C]`. And we need it to double check that functions like
// `isNodeCollection` or `isBinaryOperation` contain all and only the kinds
// matching a the generated type.
// https://catchts.com/union-array

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Finally me)
export type UnionToArray<T, A extends unknown[] = []> =
  IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];
