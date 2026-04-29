import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { PragmaDirective } from './PragmaDirective.js';
import { ImportDirective } from './ImportDirective.js';
import { ContractDefinition } from './ContractDefinition.js';
import { InterfaceDefinition } from './InterfaceDefinition.js';
import { LibraryDefinition } from './LibraryDefinition.js';
import { StructDefinition } from './StructDefinition.js';
import { EnumDefinition } from './EnumDefinition.js';
import { FunctionDefinition } from './FunctionDefinition.js';
import { ConstantDefinition } from './ConstantDefinition.js';
import { ErrorDefinition } from './ErrorDefinition.js';
import { UserDefinedValueTypeDefinition } from './UserDefinedValueTypeDefinition.js';
import { UsingDirective } from './UsingDirective.js';
import { EventDefinition } from './EventDefinition.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.SourceUnitMember,
  SourceUnitMember
>([
  [ast.PragmaDirective, PragmaDirective],
  [ast.ImportDirective, ImportDirective],
  [ast.ContractDefinition, ContractDefinition],
  [ast.InterfaceDefinition, InterfaceDefinition],
  [ast.LibraryDefinition, LibraryDefinition],
  [ast.StructDefinition, StructDefinition],
  [ast.EnumDefinition, EnumDefinition],
  [ast.FunctionDefinition, FunctionDefinition],
  [ast.ConstantDefinition, ConstantDefinition],
  [ast.ErrorDefinition, ErrorDefinition],
  [ast.UserDefinedValueTypeDefinition, UserDefinedValueTypeDefinition],
  [ast.UsingDirective, UsingDirective],
  [ast.EventDefinition, EventDefinition]
]);

export class SourceUnitMember extends PolymorphicNonterminalNode<
  ast.SourceUnitMember,
  | PragmaDirective
  | ImportDirective
  | ContractDefinition
  | InterfaceDefinition
  | LibraryDefinition
  | StructDefinition
  | EnumDefinition
  | FunctionDefinition
  | ConstantDefinition
  | ErrorDefinition
  | UserDefinedValueTypeDefinition
  | UsingDirective
  | EventDefinition
> {
  readonly kind = NonterminalKind.SourceUnitMember;

  constructor(ast: ast.SourceUnitMember, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
