import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { PragmaDirective } from './PragmaDirective.ts';
import { ImportDirective } from './ImportDirective.ts';
import { ContractDefinition } from './ContractDefinition.ts';
import { InterfaceDefinition } from './InterfaceDefinition.ts';
import { LibraryDefinition } from './LibraryDefinition.ts';
import { StructDefinition } from './StructDefinition.ts';
import { EnumDefinition } from './EnumDefinition.ts';
import { FunctionDefinition } from './FunctionDefinition.ts';
import { ConstantDefinition } from './ConstantDefinition.ts';
import { ErrorDefinition } from './ErrorDefinition.ts';
import { UserDefinedValueTypeDefinition } from './UserDefinedValueTypeDefinition.ts';
import { UsingDirective } from './UsingDirective.ts';
import { EventDefinition } from './EventDefinition.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
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

export class SourceUnitMember extends SlangNode {
  readonly kind = NonterminalKind.SourceUnitMember;

  variant:
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
    | EventDefinition;

  constructor(ast: ast.SourceUnitMember, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
