import { StrictPolymorphicType } from '../slang-nodes/types.js';

type ast<T extends StrictPolymorphicType> = ConstructorParameters<T>[0];
type options<T extends StrictPolymorphicType> = ConstructorParameters<T>[1];

export function extractVariant<T extends StrictPolymorphicType>(
  constructor: new (ast: ast<T>, options: options<T>) => InstanceType<T>,
  ast: ast<T>,
  options?: options<T>
): InstanceType<T>['variant'] {
  const { variant, comments, loc } = new constructor(ast, options);
  variant.comments = comments;
  variant.loc = loc;
  return variant;
}
