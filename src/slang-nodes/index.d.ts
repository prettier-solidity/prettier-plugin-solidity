import type { ABICoderPragma } from './ABICoderPragma';
import type { AdditiveExpression } from './AdditiveExpression';
import type { AddressType } from './AddressType';
import type { AndExpression } from './AndExpression';
import type { ArgumentsDeclaration } from './ArgumentsDeclaration';
import type { ArrayExpression } from './ArrayExpression';
import type { ArrayTypeName } from './ArrayTypeName';
import type { ArrayValues } from './ArrayValues';
import type { AssemblyFlags } from './AssemblyFlags';
import type { AssemblyFlagsDeclaration } from './AssemblyFlagsDeclaration';
import type { AssemblyStatement } from './AssemblyStatement';
import type { AssignmentExpression } from './AssignmentExpression';
import type { BitwiseAndExpression } from './BitwiseAndExpression';
import type { BitwiseOrExpression } from './BitwiseOrExpression';
import type { BitwiseXorExpression } from './BitwiseXorExpression';
import type { Block } from './Block';
import type { BreakStatement } from './BreakStatement';
import type { CallOptions } from './CallOptions';
import type { CallOptionsExpression } from './CallOptionsExpression';
import type { CatchClause } from './CatchClause';
import type { CatchClauseError } from './CatchClauseError';
import type { CatchClauses } from './CatchClauses';
import type { ComparisonExpression } from './ComparisonExpression';
import type { ConditionalExpression } from './ConditionalExpression';
import type { ConstantDefinition } from './ConstantDefinition';
import type { ConstructorAttribute } from './ConstructorAttribute';
import type { ConstructorAttributes } from './ConstructorAttributes';
import type { ConstructorDefinition } from './ConstructorDefinition';
import type { ContinueStatement } from './ContinueStatement';
import type { ContractDefinition } from './ContractDefinition';
import type { ContractMember } from './ContractMember';
import type { ContractMembers } from './ContractMembers';
import type { DecimalNumberExpression } from './DecimalNumberExpression';
import type { DoWhileStatement } from './DoWhileStatement';
import type { ElementaryType } from './ElementaryType';
import type { ElseBranch } from './ElseBranch';
import type { EmitStatement } from './EmitStatement';
import type { EnumDefinition } from './EnumDefinition';
import type { EnumMembers } from './EnumMembers';
import type { EqualityExpression } from './EqualityExpression';
import type { ErrorDefinition } from './ErrorDefinition';
import type { ErrorParameter } from './ErrorParameter';
import type { ErrorParameters } from './ErrorParameters';
import type { ErrorParametersDeclaration } from './ErrorParametersDeclaration';
import type { EventDefinition } from './EventDefinition';
import type { EventParameter } from './EventParameter';
import type { EventParameters } from './EventParameters';
import type { EventParametersDeclaration } from './EventParametersDeclaration';
import type { ExperimentalFeature } from './ExperimentalFeature';
import type { ExperimentalPragma } from './ExperimentalPragma';
import type { ExponentiationExpression } from './ExponentiationExpression';
import type { Expression } from './Expression';
import type { ExpressionStatement } from './ExpressionStatement';
import type { FallbackFunctionAttribute } from './FallbackFunctionAttribute';
import type { FallbackFunctionAttributes } from './FallbackFunctionAttributes';
import type { FallbackFunctionDefinition } from './FallbackFunctionDefinition';
import type { ForStatement } from './ForStatement';
import type { ForStatementCondition } from './ForStatementCondition';
import type { ForStatementInitialization } from './ForStatementInitialization';
import type { FunctionAttribute } from './FunctionAttribute';
import type { FunctionAttributes } from './FunctionAttributes';
import type { FunctionBody } from './FunctionBody';
import type { FunctionCallExpression } from './FunctionCallExpression';
import type { FunctionDefinition } from './FunctionDefinition';
import type { FunctionName } from './FunctionName';
import type { FunctionType } from './FunctionType';
import type { FunctionTypeAttribute } from './FunctionTypeAttribute';
import type { FunctionTypeAttributes } from './FunctionTypeAttributes';
import type { HexNumberExpression } from './HexNumberExpression';
import type { HexStringLiteral } from './HexStringLiteral';
import type { HexStringLiterals } from './HexStringLiterals';
import type { Identifier } from './Identifier';
import type { IdentifierPath } from './IdentifierPath';
import type { IfStatement } from './IfStatement';
import type { ImportAlias } from './ImportAlias';
import type { ImportClause } from './ImportClause';
import type { ImportDeconstruction } from './ImportDeconstruction';
import type { ImportDeconstructionSymbol } from './ImportDeconstructionSymbol';
import type { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols';
import type { ImportDirective } from './ImportDirective';
import type { IndexAccessEnd } from './IndexAccessEnd';
import type { IndexAccessExpression } from './IndexAccessExpression';
import type { InheritanceSpecifier } from './InheritanceSpecifier';
import type { InheritanceType } from './InheritanceType';
import type { InheritanceTypes } from './InheritanceTypes';
import type { InterfaceDefinition } from './InterfaceDefinition';
import type { InterfaceMembers } from './InterfaceMembers';
import type { LibraryDefinition } from './LibraryDefinition';
import type { LibraryMembers } from './LibraryMembers';
import type { MappingKey } from './MappingKey';
import type { MappingKeyType } from './MappingKeyType';
import type { MappingType } from './MappingType';
import type { MappingValue } from './MappingValue';
import type { MemberAccessExpression } from './MemberAccessExpression';
import type { ModifierAttribute } from './ModifierAttribute';
import type { ModifierAttributes } from './ModifierAttributes';
import type { ModifierDefinition } from './ModifierDefinition';
import type { ModifierInvocation } from './ModifierInvocation';
import type { MultiLineComment } from './MultiLineComment';
import type { MultiLineNatSpecComment } from './MultiLineNatSpecComment';
import type { MultiplicativeExpression } from './MultiplicativeExpression';
import type { NamedArgument } from './NamedArgument';
import type { NamedArgumentGroup } from './NamedArgumentGroup';
import type { NamedArguments } from './NamedArguments';
import type { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration';
import type { NamedImport } from './NamedImport';
import type { NewExpression } from './NewExpression';
import type { NumberUnit } from './NumberUnit';
import type { OrExpression } from './OrExpression';
import type { OverridePaths } from './OverridePaths';
import type { OverridePathsDeclaration } from './OverridePathsDeclaration';
import type { OverrideSpecifier } from './OverrideSpecifier';
import type { Parameter } from './Parameter';
import type { Parameters } from './Parameters';
import type { ParametersDeclaration } from './ParametersDeclaration';
import type { PathImport } from './PathImport';
import type { PositionalArguments } from './PositionalArguments';
import type { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration';
import type { PostfixExpression } from './PostfixExpression';
import type { Pragma } from './Pragma';
import type { PragmaDirective } from './PragmaDirective';
import type { PrefixExpression } from './PrefixExpression';
import type { ReceiveFunctionAttribute } from './ReceiveFunctionAttribute';
import type { ReceiveFunctionAttributes } from './ReceiveFunctionAttributes';
import type { ReceiveFunctionDefinition } from './ReceiveFunctionDefinition';
import type { ReturnsDeclaration } from './ReturnsDeclaration';
import type { ReturnStatement } from './ReturnStatement';
import type { RevertStatement } from './RevertStatement';
import type { ShiftExpression } from './ShiftExpression';
import type { SingleLineComment } from './SingleLineComment';
import type { SingleLineNatSpecComment } from './SingleLineNatSpecComment';
import type { SourceUnit } from './SourceUnit';
import type { SourceUnitMember } from './SourceUnitMember';
import type { SourceUnitMembers } from './SourceUnitMembers';
import type { Statement } from './Statement';
import type { Statements } from './Statements';
import type { StateVariableAttribute } from './StateVariableAttribute';
import type { StateVariableAttributes } from './StateVariableAttributes';
import type { StateVariableDefinition } from './StateVariableDefinition';
import type { StateVariableDefinitionValue } from './StateVariableDefinitionValue';
import type { StorageLocation } from './StorageLocation';
import type { StringExpression } from './StringExpression';
import type { StringLiteral } from './StringLiteral';
import type { StringLiterals } from './StringLiterals';
import type { StructDefinition } from './StructDefinition';
import type { StructMember } from './StructMember';
import type { StructMembers } from './StructMembers';
import type { ThrowStatement } from './ThrowStatement';
import type { TryStatement } from './TryStatement';
import type { TupleDeconstructionElement } from './TupleDeconstructionElement';
import type { TupleDeconstructionElements } from './TupleDeconstructionElements';
import type { TupleDeconstructionStatement } from './TupleDeconstructionStatement';
import type { TupleExpression } from './TupleExpression';
import type { TupleMember } from './TupleMember';
import type { TupleValue } from './TupleValue';
import type { TupleValues } from './TupleValues';
import type { TypedTupleMember } from './TypedTupleMember';
import type { TypeExpression } from './TypeExpression';
import type { TypeName } from './TypeName';
import type { UncheckedBlock } from './UncheckedBlock';
import type { UnicodeStringLiteral } from './UnicodeStringLiteral';
import type { UnicodeStringLiterals } from './UnicodeStringLiterals';
import type { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute';
import type { UnnamedFunctionAttributes } from './UnnamedFunctionAttributes';
import type { UnnamedFunctionDefinition } from './UnnamedFunctionDefinition';
import type { UntypedTupleMember } from './UntypedTupleMember';
import type { UserDefinedValueTypeDefinition } from './UserDefinedValueTypeDefinition';
import type { UsingAlias } from './UsingAlias';
import type { UsingClause } from './UsingClause';
import type { UsingDeconstruction } from './UsingDeconstruction';
import type { UsingDeconstructionSymbol } from './UsingDeconstructionSymbol';
import type { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols';
import type { UsingDirective } from './UsingDirective';
import type { UsingOperator } from './UsingOperator';
import type { UsingTarget } from './UsingTarget';
import type { VariableDeclarationStatement } from './VariableDeclarationStatement';
import type { VariableDeclarationType } from './VariableDeclarationType';
import type { VariableDeclarationValue } from './VariableDeclarationValue';
import type { VersionComparator } from './VersionComparator';
import type { VersionExpression } from './VersionExpression';
import type { VersionExpressionSet } from './VersionExpressionSet';
import type { VersionExpressionSets } from './VersionExpressionSets';
import type { VersionPragma } from './VersionPragma';
import type { VersionRange } from './VersionRange';
import type { VersionSpecifiers } from './VersionSpecifiers';
import type { WhileStatement } from './WhileStatement';
import type { YulArguments } from './YulArguments';
import type { YulAssignmentOperator } from './YulAssignmentOperator';
import type { YulBlock } from './YulBlock';
import type { YulBreakStatement } from './YulBreakStatement';
import type { YulBuiltInFunction } from './YulBuiltInFunction';
import type { YulColonAndEqual } from './YulColonAndEqual';
import type { YulContinueStatement } from './YulContinueStatement';
import type { YulDefaultCase } from './YulDefaultCase';
import type { YulEqualAndColon } from './YulEqualAndColon';
import type { YulExpression } from './YulExpression';
import type { YulForStatement } from './YulForStatement';
import type { YulFunctionCallExpression } from './YulFunctionCallExpression';
import type { YulFunctionDefinition } from './YulFunctionDefinition';
import type { YulIdentifier } from './YulIdentifier';
import type { YulIfStatement } from './YulIfStatement';
import type { YulLabel } from './YulLabel';
import type { YulLeaveStatement } from './YulLeaveStatement';
import type { YulLiteral } from './YulLiteral';
import type { YulParameters } from './YulParameters';
import type { YulParametersDeclaration } from './YulParametersDeclaration';
import type { YulPath } from './YulPath';
import type { YulPathComponent } from './YulPathComponent';
import type { YulPaths } from './YulPaths';
import type { YulReturnsDeclaration } from './YulReturnsDeclaration';
import type { YulStackAssignmentOperator } from './YulStackAssignmentOperator';
import type { YulStackAssignmentStatement } from './YulStackAssignmentStatement';
import type { YulStatement } from './YulStatement';
import type { YulStatements } from './YulStatements';
import type { YulSwitchCase } from './YulSwitchCase';
import type { YulSwitchCases } from './YulSwitchCases';
import type { YulSwitchStatement } from './YulSwitchStatement';
import type { YulValueCase } from './YulValueCase';
import type { YulVariableAssignmentStatement } from './YulVariableAssignmentStatement';
import type { YulVariableDeclarationStatement } from './YulVariableDeclarationStatement';
import type { YulVariableDeclarationValue } from './YulVariableDeclarationValue';
import type { YulVariableNames } from './YulVariableNames';

export type BinaryOperation =
  | AdditiveExpression
  | MultiplicativeExpression
  | ExponentiationExpression
  | AssignmentExpression
  | BitwiseAndExpression
  | BitwiseOrExpression
  | BitwiseXorExpression
  | ComparisonExpression
  | EqualityExpression
  | AndExpression
  | OrExpression
  | ShiftExpression;

export type FunctionLike =
  | ConstructorDefinition
  | FallbackFunctionDefinition
  | FunctionDefinition
  | FunctionType
  | ModifierDefinition
  | ReceiveFunctionDefinition
  | UnnamedFunctionDefinition;

export type CollectionNode =
  | ArrayValues
  | AssemblyFlags
  | CallOptions
  | CatchClauses
  | ConstructorAttributes
  | ContractMembers
  | EnumMembers
  | ErrorParameters
  | EventParameters
  | FallbackFunctionAttributes
  | FunctionAttributes
  | FunctionTypeAttributes
  | HexStringLiterals
  | IdentifierPath
  | ImportDeconstructionSymbols
  | InheritanceTypes
  | InterfaceMembers
  | LibraryMembers
  | ModifierAttributes
  | NamedArguments
  | OverridePaths
  | Parameters
  | PositionalArguments
  | ReceiveFunctionAttributes
  | SourceUnitMembers
  | Statements
  | StateVariableAttributes
  | StringLiterals
  | StructMembers
  | TupleDeconstructionElements
  | TupleValues
  | UnicodeStringLiterals
  | UnnamedFunctionAttributes
  | UsingDeconstructionSymbols
  | VersionExpressionSet
  | VersionExpressionSets
  | VersionSpecifiers
  | YulArguments
  | YulParameters
  | YulPath
  | YulPaths
  | YulStatements
  | YulSwitchCases
  | YulVariableNames;

export type BlockComment = MultiLineComment | MultiLineNatSpecComment;

export type LineComment = SingleLineComment | SingleLineNatSpecComment;

export type Comment = BlockComment | LineComment;

export type StrictAstNode =
  | SourceUnit
  | PragmaDirective
  | ABICoderPragma
  | ExperimentalPragma
  | VersionPragma
  | VersionRange
  | VersionComparator
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
  | ComparisonExpression
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
  | YulPathComponent
  | YulBuiltInFunction
  | YulLiteral
  | SourceUnitMembers
  | VersionExpressionSet
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
  | VersionSpecifiers
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

export type AstNode =
  | StrictAstNode
  | Comment
  | Identifier
  | YulIdentifier
  | string
  | undefined;
