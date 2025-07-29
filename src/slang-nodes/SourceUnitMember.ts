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
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.SourceUnitMember['variant'],
  options: ParserOptions<AstNode>
): SourceUnitMember['variant'] {
  if (variant instanceof ast.PragmaDirective) {
    return new PragmaDirective(variant, options);
  }
  if (variant instanceof ast.ImportDirective) {
    return new ImportDirective(variant, options);
  }
  if (variant instanceof ast.ContractDefinition) {
    return new ContractDefinition(variant, options);
  }
  if (variant instanceof ast.InterfaceDefinition) {
    return new InterfaceDefinition(variant, options);
  }
  if (variant instanceof ast.LibraryDefinition) {
    return new LibraryDefinition(variant, options);
  }
  if (variant instanceof ast.StructDefinition) {
    return new StructDefinition(variant, options);
  }
  if (variant instanceof ast.EnumDefinition) {
    return new EnumDefinition(variant);
  }
  if (variant instanceof ast.FunctionDefinition) {
    return new FunctionDefinition(variant, options);
  }
  if (variant instanceof ast.ConstantDefinition) {
    return new ConstantDefinition(variant, options);
  }
  if (variant instanceof ast.ErrorDefinition) {
    return new ErrorDefinition(variant, options);
  }
  if (variant instanceof ast.UserDefinedValueTypeDefinition) {
    return new UserDefinedValueTypeDefinition(variant);
  }
  if (variant instanceof ast.UsingDirective) {
    return new UsingDirective(variant, options);
  }
  if (variant instanceof ast.EventDefinition) {
    return new EventDefinition(variant, options);
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

  constructor(ast: ast.SourceUnitMember, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
