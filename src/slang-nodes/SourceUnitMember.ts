import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
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

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.SourceUnitMember,
  SourceUnitMember
>([
  [slangAst.PragmaDirective, PragmaDirective],
  [slangAst.ImportDirective, ImportDirective],
  [slangAst.ContractDefinition, ContractDefinition],
  [slangAst.InterfaceDefinition, InterfaceDefinition],
  [slangAst.LibraryDefinition, LibraryDefinition],
  [slangAst.StructDefinition, StructDefinition],
  [slangAst.EnumDefinition, EnumDefinition],
  [slangAst.FunctionDefinition, FunctionDefinition],
  [slangAst.ConstantDefinition, ConstantDefinition],
  [slangAst.ErrorDefinition, ErrorDefinition],
  [slangAst.UserDefinedValueTypeDefinition, UserDefinedValueTypeDefinition],
  [slangAst.UsingDirective, UsingDirective],
  [slangAst.EventDefinition, EventDefinition]
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

  constructor(
    ast: slangAst.SourceUnitMember,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of
      // `SourceUnitMember` in the `createNonterminalVariant` function above.
      ((variant: slangAst.SourceUnitMember['variant']): void => {
        if (variant instanceof slangAst.PragmaDirective) return;
        if (variant instanceof slangAst.ImportDirective) return;
        if (variant instanceof slangAst.ContractDefinition) return;
        if (variant instanceof slangAst.InterfaceDefinition) return;
        if (variant instanceof slangAst.LibraryDefinition) return;
        if (variant instanceof slangAst.StructDefinition) return;
        if (variant instanceof slangAst.EnumDefinition) return;
        if (variant instanceof slangAst.FunctionDefinition) return;
        if (variant instanceof slangAst.ConstantDefinition) return;
        if (variant instanceof slangAst.ErrorDefinition) return;
        if (variant instanceof slangAst.UserDefinedValueTypeDefinition) return;
        if (variant instanceof slangAst.UsingDirective) return;
        if (variant instanceof slangAst.EventDefinition) return;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
