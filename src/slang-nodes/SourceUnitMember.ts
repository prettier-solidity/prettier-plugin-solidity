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

const keys = [
  ast.PragmaDirective,
  ast.ImportDirective,
  ast.ContractDefinition,
  ast.InterfaceDefinition,
  ast.LibraryDefinition,
  ast.StructDefinition,
  ast.EnumDefinition,
  ast.FunctionDefinition,
  ast.ConstantDefinition,
  ast.ErrorDefinition,
  ast.UserDefinedValueTypeDefinition,
  ast.UsingDirective,
  ast.EventDefinition
];
const constructors = [
  PragmaDirective,
  ImportDirective,
  ContractDefinition,
  InterfaceDefinition,
  LibraryDefinition,
  StructDefinition,
  EnumDefinition,
  FunctionDefinition,
  ConstantDefinition,
  ErrorDefinition,
  UserDefinedValueTypeDefinition,
  UsingDirective,
  EventDefinition
];

const variantConstructors = new Map<string, (typeof constructors)[number]>(
  keys.map((key, index) => [key.name, constructors[index]])
);

function createNonterminalVariant(
  variant: ast.SourceUnitMember['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): SourceUnitMember['variant'] {
  const variantConstructor = variantConstructors.get(variant.constructor.name);
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
