import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
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

function createNonterminalVariant(
  variant: ast.SourceUnitMember['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): SourceUnitMember['variant'] {
  if (variant instanceof ast.PragmaDirective) {
    return new PragmaDirective(variant, collected, options);
  }
  if (variant instanceof ast.ImportDirective) {
    return new ImportDirective(variant, collected, options);
  }
  if (variant instanceof ast.ContractDefinition) {
    return new ContractDefinition(variant, collected, options);
  }
  if (variant instanceof ast.InterfaceDefinition) {
    return new InterfaceDefinition(variant, collected, options);
  }
  if (variant instanceof ast.LibraryDefinition) {
    return new LibraryDefinition(variant, collected, options);
  }
  if (variant instanceof ast.StructDefinition) {
    return new StructDefinition(variant, collected, options);
  }
  if (variant instanceof ast.EnumDefinition) {
    return new EnumDefinition(variant, collected);
  }
  if (variant instanceof ast.FunctionDefinition) {
    return new FunctionDefinition(variant, collected, options);
  }
  if (variant instanceof ast.ConstantDefinition) {
    return new ConstantDefinition(variant, collected, options);
  }
  if (variant instanceof ast.ErrorDefinition) {
    return new ErrorDefinition(variant, collected, options);
  }
  if (variant instanceof ast.UserDefinedValueTypeDefinition) {
    return new UserDefinedValueTypeDefinition(variant, collected);
  }
  if (variant instanceof ast.UsingDirective) {
    return new UsingDirective(variant, collected, options);
  }
  if (variant instanceof ast.EventDefinition) {
    return new EventDefinition(variant, collected, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

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
    ast: ast.SourceUnitMember,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
