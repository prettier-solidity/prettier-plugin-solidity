import { NonterminalKind, SlangAst } from '../slang-utils/slang.ts';
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

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.SourceUnitMember,
  SourceUnitMember
>(() => [
  [SlangAst.PragmaDirective, PragmaDirective],
  [SlangAst.ImportDirective, ImportDirective],
  [SlangAst.ContractDefinition, ContractDefinition],
  [SlangAst.InterfaceDefinition, InterfaceDefinition],
  [SlangAst.LibraryDefinition, LibraryDefinition],
  [SlangAst.StructDefinition, StructDefinition],
  [SlangAst.EnumDefinition, EnumDefinition],
  [SlangAst.FunctionDefinition, FunctionDefinition],
  [SlangAst.ConstantDefinition, ConstantDefinition],
  [SlangAst.ErrorDefinition, ErrorDefinition],
  [SlangAst.UserDefinedValueTypeDefinition, UserDefinedValueTypeDefinition],
  [SlangAst.UsingDirective, UsingDirective],
  [SlangAst.EventDefinition, EventDefinition]
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
