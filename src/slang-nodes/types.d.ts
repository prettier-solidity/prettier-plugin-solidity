import type { AbicoderPragma } from './AbicoderPragma.ts';
import type { AdditiveExpression } from './AdditiveExpression.ts';
import type { AddressType } from './AddressType.ts';
import type { AndExpression } from './AndExpression.ts';
import type { ArgumentsDeclaration } from './ArgumentsDeclaration.ts';
import type { ArrayExpression } from './ArrayExpression.ts';
import type { ArrayTypeName } from './ArrayTypeName.ts';
import type { ArrayValues } from './ArrayValues.ts';
import type { AssemblyFlags } from './AssemblyFlags.ts';
import type { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration.ts';
import type { AssemblyStatement } from './AssemblyStatement.ts';
import type { AssignmentExpression } from './AssignmentExpression.ts';
import type { BitwiseAndExpression } from './BitwiseAndExpression.ts';
import type { BitwiseOrExpression } from './BitwiseOrExpression.ts';
import type { BitwiseXorExpression } from './BitwiseXorExpression.ts';
import type { Block } from './Block.ts';
import type { BreakStatement } from './BreakStatement.ts';
import type { CallOptions } from './CallOptions.ts';
import type { CallOptionsExpression } from './CallOptionsExpression.ts';
import type { CatchClause } from './CatchClause.ts';
import type { CatchClauseError } from './CatchClauseError.ts';
import type { CatchClauses } from './CatchClauses.ts';
import type { ConditionalExpression } from './ConditionalExpression.ts';
import type { ConstantDefinition } from './ConstantDefinition.ts';
import type { ConstructorAttribute } from './ConstructorAttribute.ts';
import type { ConstructorAttributes } from './ConstructorAttributes.ts';
import type { ConstructorDefinition } from './ConstructorDefinition.ts';
import type { ContinueStatement } from './ContinueStatement.ts';
import type { ContractDefinition } from './ContractDefinition.ts';
import type { ContractMember } from './ContractMember.ts';
import type { ContractMembers } from './ContractMembers.ts';
import type { ContractSpecifier } from './ContractSpecifier.ts';
import type { ContractSpecifiers } from './ContractSpecifiers.ts';
import type { DecimalNumberExpression } from './DecimalNumberExpression.ts';
import type { DoWhileStatement } from './DoWhileStatement.ts';
import type { ElementaryType } from './ElementaryType.ts';
import type { ElseBranch } from './ElseBranch.ts';
import type { EmitStatement } from './EmitStatement.ts';
import type { EnumDefinition } from './EnumDefinition.ts';
import type { EnumMembers } from './EnumMembers.ts';
import type { EqualityExpression } from './EqualityExpression.ts';
import type { ErrorDefinition } from './ErrorDefinition.ts';
import type { ErrorParameter } from './ErrorParameter.ts';
import type { ErrorParameters } from './ErrorParameters.ts';
import type { ErrorParametersDeclaration } from './ErrorParametersDeclaration.ts';
import type { EventDefinition } from './EventDefinition.ts';
import type { EventParameter } from './EventParameter.ts';
import type { EventParameters } from './EventParameters.ts';
import type { EventParametersDeclaration } from './EventParametersDeclaration.ts';
import type { ExperimentalFeature } from './ExperimentalFeature.ts';
import type { ExperimentalPragma } from './ExperimentalPragma.ts';
import type { ExponentiationExpression } from './ExponentiationExpression.ts';
import type { Expression } from './Expression.ts';
import type { ExpressionStatement } from './ExpressionStatement.ts';
import type { FallbackFunctionAttribute } from './FallbackFunctionAttribute.ts';
import type { FallbackFunctionAttributes } from './FallbackFunctionAttributes.ts';
import type { FallbackFunctionDefinition } from './FallbackFunctionDefinition.ts';
import type { ForStatement } from './ForStatement.ts';
import type { ForStatementCondition } from './ForStatementCondition.ts';
import type { ForStatementInitialization } from './ForStatementInitialization.ts';
import type { FunctionAttribute } from './FunctionAttribute.ts';
import type { FunctionAttributes } from './FunctionAttributes.ts';
import type { FunctionBody } from './FunctionBody.ts';
import type { FunctionCallExpression } from './FunctionCallExpression.ts';
import type { FunctionDefinition } from './FunctionDefinition.ts';
import type { FunctionName } from './FunctionName.ts';
import type { FunctionType } from './FunctionType.ts';
import type { FunctionTypeAttribute } from './FunctionTypeAttribute.ts';
import type { FunctionTypeAttributes } from './FunctionTypeAttributes.ts';
import type { HexNumberExpression } from './HexNumberExpression.ts';
import type { HexStringLiteral } from './HexStringLiteral.ts';
import type { HexStringLiterals } from './HexStringLiterals.ts';
import type { Identifier } from './Identifier.ts';
import type { IdentifierPath } from './IdentifierPath.ts';
import type { IfStatement } from './IfStatement.ts';
import type { ImportAlias } from './ImportAlias.ts';
import type { ImportClause } from './ImportClause.ts';
import type { ImportDeconstruction } from './ImportDeconstruction.ts';
import type { ImportDeconstructionSymbol } from './ImportDeconstructionSymbol.ts';
import type { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols.ts';
import type { ImportDirective } from './ImportDirective.ts';
import type { IndexAccessEnd } from './IndexAccessEnd.ts';
import type { IndexAccessExpression } from './IndexAccessExpression.ts';
import type { InequalityExpression } from './InequalityExpression.ts';
import type { InheritanceSpecifier } from './InheritanceSpecifier.ts';
import type { InheritanceType } from './InheritanceType.ts';
import type { InheritanceTypes } from './InheritanceTypes.ts';
import type { InterfaceDefinition } from './InterfaceDefinition.ts';
import type { InterfaceMembers } from './InterfaceMembers.ts';
import type { LibraryDefinition } from './LibraryDefinition.ts';
import type { LibraryMembers } from './LibraryMembers.ts';
import type { MappingKey } from './MappingKey.ts';
import type { MappingKeyType } from './MappingKeyType.ts';
import type { MappingType } from './MappingType.ts';
import type { MappingValue } from './MappingValue.ts';
import type { MemberAccessExpression } from './MemberAccessExpression.ts';
import type { ModifierAttribute } from './ModifierAttribute.ts';
import type { ModifierAttributes } from './ModifierAttributes.ts';
import type { ModifierDefinition } from './ModifierDefinition.ts';
import type { ModifierInvocation } from './ModifierInvocation.ts';
import type { MultiLineComment } from './MultiLineComment.ts';
import type { MultiLineNatSpecComment } from './MultiLineNatSpecComment.ts';
import type { MultiplicativeExpression } from './MultiplicativeExpression.ts';
import type { NamedArgument } from './NamedArgument.ts';
import type { NamedArgumentGroup } from './NamedArgumentGroup.ts';
import type { NamedArguments } from './NamedArguments.ts';
import type { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.ts';
import type { NamedImport } from './NamedImport.ts';
import type { NewExpression } from './NewExpression.ts';
import type { NumberUnit } from './NumberUnit.ts';
import type { OrExpression } from './OrExpression.ts';
import type { OverridePaths } from './OverridePaths.ts';
import type { OverridePathsDeclaration } from './OverridePathsDeclaration.ts';
import type { OverrideSpecifier } from './OverrideSpecifier.ts';
import type { Parameter } from './Parameter.ts';
import type { Parameters } from './Parameters.ts';
import type { ParametersDeclaration } from './ParametersDeclaration.ts';
import type { PathImport } from './PathImport.ts';
import type { PositionalArguments } from './PositionalArguments.ts';
import type { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.ts';
import type { PostfixExpression } from './PostfixExpression.ts';
import type { Pragma } from './Pragma.ts';
import type { PragmaDirective } from './PragmaDirective.ts';
import type { PrefixExpression } from './PrefixExpression.ts';
import type { ReceiveFunctionAttribute } from './ReceiveFunctionAttribute.ts';
import type { ReceiveFunctionAttributes } from './ReceiveFunctionAttributes.ts';
import type { ReceiveFunctionDefinition } from './ReceiveFunctionDefinition.ts';
import type { ReturnsDeclaration } from './ReturnsDeclaration.ts';
import type { ReturnStatement } from './ReturnStatement.ts';
import type { RevertStatement } from './RevertStatement.ts';
import type { ShiftExpression } from './ShiftExpression.ts';
import type { SimpleVersionLiteral } from './SimpleVersionLiteral.ts';
import type { SingleLineComment } from './SingleLineComment.ts';
import type { SingleLineNatSpecComment } from './SingleLineNatSpecComment.ts';
import type { SourceUnit } from './SourceUnit.ts';
import type { SourceUnitMember } from './SourceUnitMember.ts';
import type { SourceUnitMembers } from './SourceUnitMembers.ts';
import type { Statement } from './Statement.ts';
import type { Statements } from './Statements.ts';
import type { StateVariableAttribute } from './StateVariableAttribute.ts';
import type { StateVariableAttributes } from './StateVariableAttributes.ts';
import type { StateVariableDefinition } from './StateVariableDefinition.ts';
import type { StateVariableDefinitionValue } from './StateVariableDefinitionValue.ts';
import type { StorageLayoutSpecifier } from './StorageLayoutSpecifier.ts';
import type { StorageLocation } from './StorageLocation.ts';
import type { StringExpression } from './StringExpression.ts';
import type { StringLiteral } from './StringLiteral.ts';
import type { StringLiterals } from './StringLiterals.ts';
import type { StructDefinition } from './StructDefinition.ts';
import type { StructMember } from './StructMember.ts';
import type { StructMembers } from './StructMembers.ts';
import type { ThrowStatement } from './ThrowStatement.ts';
import type { TryStatement } from './TryStatement.ts';
import type { TupleDeconstructionElement } from './TupleDeconstructionElement.ts';
import type { TupleDeconstructionElements } from './TupleDeconstructionElements.ts';
import type { TupleDeconstructionStatement } from './TupleDeconstructionStatement.ts';
import type { TupleExpression } from './TupleExpression.ts';
import type { TupleMember } from './TupleMember.ts';
import type { TupleValue } from './TupleValue.ts';
import type { TupleValues } from './TupleValues.ts';
import type { TypedTupleMember } from './TypedTupleMember.ts';
import type { TypeExpression } from './TypeExpression.ts';
import type { TypeName } from './TypeName.ts';
import type { UncheckedBlock } from './UncheckedBlock.ts';
import type { UnicodeStringLiteral } from './UnicodeStringLiteral.ts';
import type { UnicodeStringLiterals } from './UnicodeStringLiterals.ts';
import type { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.ts';
import type { UnnamedFunctionAttributes } from './UnnamedFunctionAttributes.ts';
import type { UnnamedFunctionDefinition } from './UnnamedFunctionDefinition.ts';
import type { UntypedTupleMember } from './UntypedTupleMember.ts';
import type { UserDefinedValueTypeDefinition } from './UserDefinedValueTypeDefinition.ts';
import type { UsingAlias } from './UsingAlias.ts';
import type { UsingClause } from './UsingClause.ts';
import type { UsingDeconstruction } from './UsingDeconstruction.ts';
import type { UsingDeconstructionSymbol } from './UsingDeconstructionSymbol.ts';
import type { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.ts';
import type { UsingDirective } from './UsingDirective.ts';
import type { UsingOperator } from './UsingOperator.ts';
import type { UsingTarget } from './UsingTarget.ts';
import type { VariableDeclarationStatement } from './VariableDeclarationStatement.ts';
import type { VariableDeclarationType } from './VariableDeclarationType.ts';
import type { VariableDeclarationValue } from './VariableDeclarationValue.ts';
import type { VersionExpression } from './VersionExpression.ts';
import type { VersionExpressionSet } from './VersionExpressionSet.ts';
import type { VersionExpressionSets } from './VersionExpressionSets.ts';
import type { VersionOperator } from './VersionOperator.ts';
import type { VersionLiteral } from './VersionLiteral.ts';
import type { VersionPragma } from './VersionPragma.ts';
import type { VersionRange } from './VersionRange.ts';
import type { VersionTerm } from './VersionTerm.ts';
import type { WhileStatement } from './WhileStatement.ts';
import type { YulArguments } from './YulArguments.ts';
import type { YulAssignmentOperator } from './YulAssignmentOperator.ts';
import type { YulBlock } from './YulBlock.ts';
import type { YulBreakStatement } from './YulBreakStatement.ts';
import type { YulColonAndEqual } from './YulColonAndEqual.ts';
import type { YulContinueStatement } from './YulContinueStatement.ts';
import type { YulDefaultCase } from './YulDefaultCase.ts';
import type { YulEqualAndColon } from './YulEqualAndColon.ts';
import type { YulExpression } from './YulExpression.ts';
import type { YulForStatement } from './YulForStatement.ts';
import type { YulFunctionCallExpression } from './YulFunctionCallExpression.ts';
import type { YulFunctionDefinition } from './YulFunctionDefinition.ts';
import type { YulIdentifier } from './YulIdentifier.ts';
import type { YulIfStatement } from './YulIfStatement.ts';
import type { YulLabel } from './YulLabel.ts';
import type { YulLeaveStatement } from './YulLeaveStatement.ts';
import type { YulLiteral } from './YulLiteral.ts';
import type { YulParameters } from './YulParameters.ts';
import type { YulParametersDeclaration } from './YulParametersDeclaration.ts';
import type { YulPath } from './YulPath.ts';
import type { YulPaths } from './YulPaths.ts';
import type { YulReturnsDeclaration } from './YulReturnsDeclaration.ts';
import type { YulStackAssignmentOperator } from './YulStackAssignmentOperator.ts';
import type { YulStackAssignmentStatement } from './YulStackAssignmentStatement.ts';
import type { YulStatement } from './YulStatement.ts';
import type { YulStatements } from './YulStatements.ts';
import type { YulSwitchCase } from './YulSwitchCase.ts';
import type { YulSwitchCases } from './YulSwitchCases.ts';
import type { YulSwitchStatement } from './YulSwitchStatement.ts';
import type { YulValueCase } from './YulValueCase.ts';
import type { YulVariableAssignmentStatement } from './YulVariableAssignmentStatement.ts';
import type { YulVariableDeclarationStatement } from './YulVariableDeclarationStatement.ts';
import type { YulVariableDeclarationValue } from './YulVariableDeclarationValue.ts';
import type { YulVariableNames } from './YulVariableNames.ts';

export type FunctionLike =
  | ConstructorDefinition
  | FallbackFunctionDefinition
  | FunctionDefinition
  | FunctionType
  | ModifierDefinition
  | ReceiveFunctionDefinition
  | UnnamedFunctionDefinition;

export type BlockComment = MultiLineComment | MultiLineNatSpecComment;

export type LineComment = SingleLineComment | SingleLineNatSpecComment;

export type Comment = BlockComment | LineComment;

export type StrictAstNode =
  | SourceUnit
  | PragmaDirective
  | AbicoderPragma
  | ExperimentalPragma
  | VersionPragma
  | VersionRange
  | VersionTerm
  | ImportDirective
  | PathImport
  | NamedImport
  | ImportDeconstruction
  | ImportDeconstructionSymbol
  | ImportAlias
  | UsingDirective
  | UsingDeconstruction
  | UsingDeconstructionSymbol
  | UsingAlias
  | ContractDefinition
  | InheritanceSpecifier
  | InheritanceType
  | StorageLayoutSpecifier
  | InterfaceDefinition
  | LibraryDefinition
  | StructDefinition
  | StructMember
  | EnumDefinition
  | ConstantDefinition
  | StateVariableDefinition
  | StateVariableDefinitionValue
  | FunctionDefinition
  | ParametersDeclaration
  | Parameter
  | OverrideSpecifier
  | OverridePathsDeclaration
  | ReturnsDeclaration
  | ConstructorDefinition
  | UnnamedFunctionDefinition
  | FallbackFunctionDefinition
  | ReceiveFunctionDefinition
  | ModifierDefinition
  | ModifierInvocation
  | EventDefinition
  | EventParametersDeclaration
  | EventParameter
  | UserDefinedValueTypeDefinition
  | ErrorDefinition
  | ErrorParametersDeclaration
  | ErrorParameter
  | ArrayTypeName
  | FunctionType
  | MappingType
  | MappingKey
  | MappingValue
  | AddressType
  | Block
  | UncheckedBlock
  | ExpressionStatement
  | AssemblyStatement
  | AssemblyFlagsDeclaration
  | TupleDeconstructionStatement
  | TupleDeconstructionElement
  | TypedTupleMember
  | UntypedTupleMember
  | VariableDeclarationStatement
  | VariableDeclarationValue
  | IfStatement
  | ElseBranch
  | ForStatement
  | WhileStatement
  | DoWhileStatement
  | ContinueStatement
  | BreakStatement
  | ReturnStatement
  | EmitStatement
  | TryStatement
  | CatchClause
  | CatchClauseError
  | RevertStatement
  | ThrowStatement
  | AssignmentExpression
  | ConditionalExpression
  | OrExpression
  | AndExpression
  | EqualityExpression
  | InequalityExpression
  | BitwiseOrExpression
  | BitwiseXorExpression
  | BitwiseAndExpression
  | ShiftExpression
  | AdditiveExpression
  | MultiplicativeExpression
  | ExponentiationExpression
  | PostfixExpression
  | PrefixExpression
  | FunctionCallExpression
  | CallOptionsExpression
  | MemberAccessExpression
  | IndexAccessExpression
  | IndexAccessEnd
  | PositionalArgumentsDeclaration
  | NamedArgumentsDeclaration
  | NamedArgumentGroup
  | NamedArgument
  | TypeExpression
  | NewExpression
  | TupleExpression
  | TupleValue
  | ArrayExpression
  | HexNumberExpression
  | DecimalNumberExpression
  | YulBlock
  | YulFunctionDefinition
  | YulParametersDeclaration
  | YulReturnsDeclaration
  | YulVariableDeclarationStatement
  | YulVariableDeclarationValue
  | YulVariableAssignmentStatement
  | YulStackAssignmentStatement
  | YulStackAssignmentOperator
  | YulColonAndEqual
  | YulEqualAndColon
  | YulIfStatement
  | YulForStatement
  | YulSwitchStatement
  | YulDefaultCase
  | YulValueCase
  | YulLeaveStatement
  | YulBreakStatement
  | YulContinueStatement
  | YulLabel
  | YulFunctionCallExpression
  | SourceUnitMember
  | Pragma
  | ExperimentalFeature
  | VersionExpression
  | VersionOperator
  | VersionLiteral
  | ImportClause
  | UsingClause
  | UsingOperator
  | UsingTarget
  | ContractMember
  | StateVariableAttribute
  | FunctionName
  | FunctionAttribute
  | FunctionBody
  | ConstructorAttribute
  | UnnamedFunctionAttribute
  | FallbackFunctionAttribute
  | ReceiveFunctionAttribute
  | ModifierAttribute
  | TypeName
  | FunctionTypeAttribute
  | MappingKeyType
  | ElementaryType
  | Statement
  | TupleMember
  | VariableDeclarationType
  | StorageLocation
  | ForStatementInitialization
  | ForStatementCondition
  | Expression
  | ArgumentsDeclaration
  | NumberUnit
  | StringExpression
  | StringLiteral
  | HexStringLiteral
  | UnicodeStringLiteral
  | YulStatement
  | YulAssignmentOperator
  | YulSwitchCase
  | YulExpression
  | YulLiteral
  | SourceUnitMembers
  | VersionExpressionSet
  | ContractSpecifier
  | ContractSpecifiers
  | ContractMembers
  | InterfaceMembers
  | LibraryMembers
  | StructMembers
  | StateVariableAttributes
  | FunctionAttributes
  | ConstructorAttributes
  | UnnamedFunctionAttributes
  | FallbackFunctionAttributes
  | ReceiveFunctionAttributes
  | ModifierAttributes
  | FunctionTypeAttributes
  | Statements
  | CatchClauses
  | StringLiterals
  | HexStringLiterals
  | UnicodeStringLiterals
  | YulStatements
  | YulSwitchCases
  | VersionExpressionSets
  | SimpleVersionLiteral
  | ImportDeconstructionSymbols
  | UsingDeconstructionSymbols
  | InheritanceTypes
  | EnumMembers
  | Parameters
  | OverridePaths
  | EventParameters
  | ErrorParameters
  | AssemblyFlags
  | TupleDeconstructionElements
  | PositionalArguments
  | NamedArguments
  | CallOptions
  | TupleValues
  | ArrayValues
  | IdentifierPath
  | YulParameters
  | YulVariableNames
  | YulArguments
  | YulPaths
  | YulPath;

export type NodeCollection = Extract<
  StrictAstNode,
  { items: StrictAstNode[] | Identifier[] | YulIdentifier[] }
>;

export type Collection = Extract<
  StrictAstNode,
  { items: StrictAstNode[] | Identifier[] | YulIdentifier[] | string[] }
>;

export type BinaryOperation = Extract<
  StrictAstNode,
  {
    leftOperand: Expression;
    operator: string;
    rightOperand: Expression;
  }
>;

export type AstNode =
  | StrictAstNode
  | Comment
  | Identifier
  | YulIdentifier
  | string
  | undefined;
