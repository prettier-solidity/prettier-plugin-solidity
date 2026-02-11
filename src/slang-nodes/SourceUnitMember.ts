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

const variantConstructors = {
  [ast.PragmaDirective.name]: PragmaDirective,
  [ast.ImportDirective.name]: ImportDirective,
  [ast.ContractDefinition.name]: ContractDefinition,
  [ast.InterfaceDefinition.name]: InterfaceDefinition,
  [ast.LibraryDefinition.name]: LibraryDefinition,
  [ast.StructDefinition.name]: StructDefinition,
  [ast.EnumDefinition.name]: EnumDefinition,
  [ast.FunctionDefinition.name]: FunctionDefinition,
  [ast.ConstantDefinition.name]: ConstantDefinition,
  [ast.ErrorDefinition.name]: ErrorDefinition,
  [ast.UserDefinedValueTypeDefinition.name]: UserDefinedValueTypeDefinition,
  [ast.UsingDirective.name]: UsingDirective,
  [ast.EventDefinition.name]: EventDefinition
};

function createNonterminalVariant(
  variant: ast.SourceUnitMember['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): SourceUnitMember['variant'] {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
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
