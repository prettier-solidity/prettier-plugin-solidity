import type { kinds } from '@nomicfoundation/slang/napi-bindings/generated';
import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type * as nodes from './slang-nodes';

// Adding our own options to prettier's `ParserOptions` interface.
declare module 'prettier' {
  interface ParserOptions {
    compiler: string;
    experimentalTernaries: boolean;
  }
}

interface Location {
  start: number;
  end: number;
}

interface AstLocation extends Location {
  leadingOffset: number;
  trailingOffset: number;
}

interface BaseComment {
  value: string;
  loc: Location;
  leading?: boolean;
  trailing?: boolean;
  printed?: boolean;
  precedingNode?: AstNode;
  enclosingNode?: AstNode;
  followingNode?: AstNode;
}
interface BlockComment extends BaseComment {
  kind:
    | kinds.TerminalKind.MultiLineComment
    | kinds.TerminalKind.MultiLineNatSpecComment;
}

interface LineComment extends BaseComment {
  kind:
    | kinds.TerminalKind.SingleLineComment
    | kinds.TerminalKind.SingleLineNatSpecComment;
}

type Comment = BlockComment | LineComment;

interface Metadata {
  comments: Comment[];
  loc: AstLocation;
  offsets: number[];
}

interface SlangNode {
  get kind(): string;
  comments?: Comment[];
  loc: Location;
  print?(
    path: AstPath<AstNode>,
    print: (path: AstPath<AstNode | string | undefined>) => Doc,
    options: ParserOptions
  ): Doc;
}

export type BinaryOperation =
  | nodes.AdditiveExpression
  | nodes.MultiplicativeExpression
  | nodes.ExponentiationExpression
  | nodes.AssignmentExpression
  | nodes.BitwiseAndExpression
  | nodes.BitwiseOrExpression
  | nodes.BitwiseXorExpression
  | nodes.ComparisonExpression
  | nodes.EqualityExpression
  | nodes.AndExpression
  | nodes.OrExpression
  | nodes.ShiftExpression;

export type FunctionLike =
  | nodes.ConstructorDefinition
  | nodes.FallbackFunctionDefinition
  | nodes.FunctionDefinition
  | nodes.FunctionType
  | nodes.ModifierDefinition
  | nodes.ReceiveFunctionDefinition
  | nodes.UnnamedFunctionDefinition;

export type HubNode =
  | nodes.ArrayValues
  | nodes.AssemblyFlags
  | nodes.CallOptions
  | nodes.CatchClauses
  | nodes.ConstructorAttributes
  | nodes.ContractMembers
  | nodes.EnumMembers
  | nodes.ErrorParameters
  | nodes.EventParameters
  | nodes.FallbackFunctionAttributes
  | nodes.FunctionAttributes
  | nodes.FunctionTypeAttributes
  | nodes.HexStringLiterals
  | nodes.IdentifierPath
  | nodes.ImportDeconstructionSymbols
  | nodes.InheritanceTypes
  | nodes.InterfaceMembers
  | nodes.LibraryMembers
  | nodes.ModifierAttributes
  | nodes.NamedArguments
  | nodes.OverridePaths
  | nodes.Parameters
  | nodes.ReceiveFunctionAttributes
  | nodes.SourceUnitMembers
  | nodes.Statements
  | nodes.StateVariableAttributes
  | nodes.StringLiterals
  | nodes.StructMembers
  | nodes.TupleDeconstructionElements
  | nodes.TupleValues
  | nodes.UnicodeStringLiterals
  | nodes.UnnamedFunctionAttributes
  | nodes.UsingDeconstructionSymbols
  | nodes.VersionExpressionSet
  | nodes.VersionExpressionSets
  | nodes.VersionSpecifiers
  | nodes.YulArguments
  | nodes.YulParameters
  | nodes.YulPath
  | nodes.YulPaths
  | nodes.YulReturnVariables
  | nodes.YulStatements
  | nodes.YulSwitchCases;

export type AstNode =
  | nodes.SourceUnit
  | nodes.PragmaDirective
  | nodes.ABICoderPragma
  | nodes.ExperimentalPragma
  | nodes.VersionPragma
  | nodes.VersionRange
  | nodes.VersionComparator
  | nodes.ImportDirective
  | nodes.PathImport
  | nodes.NamedImport
  | nodes.ImportDeconstruction
  | nodes.ImportDeconstructionSymbol
  | nodes.ImportAlias
  | nodes.UsingDirective
  | nodes.UsingDeconstruction
  | nodes.UsingDeconstructionSymbol
  | nodes.UsingAlias
  | nodes.ContractDefinition
  | nodes.InheritanceSpecifier
  | nodes.InheritanceType
  | nodes.InterfaceDefinition
  | nodes.LibraryDefinition
  | nodes.StructDefinition
  | nodes.StructMember
  | nodes.EnumDefinition
  | nodes.ConstantDefinition
  | nodes.StateVariableDefinition
  | nodes.StateVariableDefinitionValue
  | nodes.FunctionDefinition
  | nodes.ParametersDeclaration
  | nodes.Parameter
  | nodes.OverrideSpecifier
  | nodes.OverridePathsDeclaration
  | nodes.ReturnsDeclaration
  | nodes.ConstructorDefinition
  | nodes.UnnamedFunctionDefinition
  | nodes.FallbackFunctionDefinition
  | nodes.ReceiveFunctionDefinition
  | nodes.ModifierDefinition
  | nodes.ModifierInvocation
  | nodes.EventDefinition
  | nodes.EventParametersDeclaration
  | nodes.EventParameter
  | nodes.UserDefinedValueTypeDefinition
  | nodes.ErrorDefinition
  | nodes.ErrorParametersDeclaration
  | nodes.ErrorParameter
  | nodes.ArrayTypeName
  | nodes.FunctionType
  | nodes.MappingType
  | nodes.MappingKey
  | nodes.MappingValue
  | nodes.AddressType
  | nodes.Block
  | nodes.UncheckedBlock
  | nodes.ExpressionStatement
  | nodes.AssemblyStatement
  | nodes.AssemblyFlagsDeclaration
  | nodes.TupleDeconstructionStatement
  | nodes.TupleDeconstructionElement
  | nodes.TypedTupleMember
  | nodes.UntypedTupleMember
  | nodes.VariableDeclarationStatement
  | nodes.VariableDeclarationValue
  | nodes.IfStatement
  | nodes.ElseBranch
  | nodes.ForStatement
  | nodes.WhileStatement
  | nodes.DoWhileStatement
  | nodes.ContinueStatement
  | nodes.BreakStatement
  | nodes.ReturnStatement
  | nodes.EmitStatement
  | nodes.TryStatement
  | nodes.CatchClause
  | nodes.CatchClauseError
  | nodes.RevertStatement
  | nodes.ThrowStatement
  | nodes.AssignmentExpression
  | nodes.ConditionalExpression
  | nodes.OrExpression
  | nodes.AndExpression
  | nodes.EqualityExpression
  | nodes.ComparisonExpression
  | nodes.BitwiseOrExpression
  | nodes.BitwiseXorExpression
  | nodes.BitwiseAndExpression
  | nodes.ShiftExpression
  | nodes.AdditiveExpression
  | nodes.MultiplicativeExpression
  | nodes.ExponentiationExpression
  | nodes.PostfixExpression
  | nodes.PrefixExpression
  | nodes.FunctionCallExpression
  | nodes.CallOptionsExpression
  | nodes.MemberAccessExpression
  | nodes.IndexAccessExpression
  | nodes.IndexAccessEnd
  | nodes.PositionalArgumentsDeclaration
  | nodes.NamedArgumentsDeclaration
  | nodes.NamedArgumentGroup
  | nodes.NamedArgument
  | nodes.TypeExpression
  | nodes.NewExpression
  | nodes.TupleExpression
  | nodes.TupleValue
  | nodes.ArrayExpression
  | nodes.HexNumberExpression
  | nodes.DecimalNumberExpression
  | nodes.YulBlock
  | nodes.YulFunctionDefinition
  | nodes.YulParametersDeclaration
  | nodes.YulReturnsDeclaration
  | nodes.YulVariableDeclarationStatement
  | nodes.YulVariableDeclarationValue
  | nodes.YulVariableAssignmentStatement
  | nodes.YulStackAssignmentStatement
  | nodes.YulColonEqual
  | nodes.YulIfStatement
  | nodes.YulForStatement
  | nodes.YulSwitchStatement
  | nodes.YulDefaultCase
  | nodes.YulValueCase
  | nodes.YulLeaveStatement
  | nodes.YulBreakStatement
  | nodes.YulContinueStatement
  | nodes.YulLabel
  | nodes.YulFunctionCallExpression
  | nodes.SourceUnitMember
  | nodes.Pragma
  | nodes.ExperimentalFeature
  | nodes.VersionExpression
  | nodes.ImportClause
  | nodes.UsingClause
  | nodes.UsingOperator
  | nodes.UsingTarget
  | nodes.ContractMember
  | nodes.StateVariableAttribute
  | nodes.FunctionName
  | nodes.FunctionAttribute
  | nodes.FunctionBody
  | nodes.ConstructorAttribute
  | nodes.UnnamedFunctionAttribute
  | nodes.FallbackFunctionAttribute
  | nodes.ReceiveFunctionAttribute
  | nodes.ModifierAttribute
  | nodes.TypeName
  | nodes.FunctionTypeAttribute
  | nodes.MappingKeyType
  | nodes.ElementaryType
  | nodes.Statement
  | nodes.TupleMember
  | nodes.VariableDeclarationType
  | nodes.StorageLocation
  | nodes.ForStatementInitialization
  | nodes.ForStatementCondition
  | nodes.Expression
  | nodes.MemberAccess
  | nodes.ArgumentsDeclaration
  | nodes.NumberUnit
  | nodes.StringExpression
  | nodes.StringLiteral
  | nodes.HexStringLiteral
  | nodes.UnicodeStringLiteral
  | nodes.YulStatement
  | nodes.YulAssignmentOperator
  | nodes.YulSwitchCase
  | nodes.YulExpression
  | nodes.YulPathComponent
  | nodes.YulBuiltInFunction
  | nodes.YulLiteral
  | nodes.SourceUnitMembers
  | nodes.VersionExpressionSet
  | nodes.ContractMembers
  | nodes.InterfaceMembers
  | nodes.LibraryMembers
  | nodes.StructMembers
  | nodes.StateVariableAttributes
  | nodes.FunctionAttributes
  | nodes.ConstructorAttributes
  | nodes.UnnamedFunctionAttributes
  | nodes.FallbackFunctionAttributes
  | nodes.ReceiveFunctionAttributes
  | nodes.ModifierAttributes
  | nodes.FunctionTypeAttributes
  | nodes.Statements
  | nodes.CatchClauses
  | nodes.StringLiterals
  | nodes.HexStringLiterals
  | nodes.UnicodeStringLiterals
  | nodes.YulStatements
  | nodes.YulSwitchCases
  | nodes.VersionExpressionSets
  | nodes.VersionSpecifiers
  | nodes.ImportDeconstructionSymbols
  | nodes.UsingDeconstructionSymbols
  | nodes.InheritanceTypes
  | nodes.EnumMembers
  | nodes.Parameters
  | nodes.OverridePaths
  | nodes.EventParameters
  | nodes.ErrorParameters
  | nodes.AssemblyFlags
  | nodes.TupleDeconstructionElements
  | nodes.PositionalArguments
  | nodes.NamedArguments
  | nodes.CallOptions
  | nodes.TupleValues
  | nodes.ArrayValues
  | nodes.IdentifierPath
  | nodes.YulParameters
  | nodes.YulReturnVariables
  | nodes.YulArguments
  | nodes.YulPaths
  | nodes.YulPath;

export type SlangAstNode =
  | ast.SourceUnit
  | ast.PragmaDirective
  | ast.ABICoderPragma
  | ast.ExperimentalPragma
  | ast.VersionPragma
  | ast.VersionRange
  | ast.VersionComparator
  | ast.ImportDirective
  | ast.PathImport
  | ast.NamedImport
  | ast.ImportDeconstruction
  | ast.ImportDeconstructionSymbol
  | ast.ImportAlias
  | ast.UsingDirective
  | ast.UsingDeconstruction
  | ast.UsingDeconstructionSymbol
  | ast.UsingAlias
  | ast.ContractDefinition
  | ast.InheritanceSpecifier
  | ast.InheritanceType
  | ast.InterfaceDefinition
  | ast.LibraryDefinition
  | ast.StructDefinition
  | ast.StructMember
  | ast.EnumDefinition
  | ast.ConstantDefinition
  | ast.StateVariableDefinition
  | ast.StateVariableDefinitionValue
  | ast.FunctionDefinition
  | ast.ParametersDeclaration
  | ast.Parameter
  | ast.OverrideSpecifier
  | ast.OverridePathsDeclaration
  | ast.ReturnsDeclaration
  | ast.ConstructorDefinition
  | ast.UnnamedFunctionDefinition
  | ast.FallbackFunctionDefinition
  | ast.ReceiveFunctionDefinition
  | ast.ModifierDefinition
  | ast.ModifierInvocation
  | ast.EventDefinition
  | ast.EventParametersDeclaration
  | ast.EventParameter
  | ast.UserDefinedValueTypeDefinition
  | ast.ErrorDefinition
  | ast.ErrorParametersDeclaration
  | ast.ErrorParameter
  | ast.ArrayTypeName
  | ast.FunctionType
  | ast.MappingType
  | ast.MappingKey
  | ast.MappingValue
  | ast.AddressType
  | ast.Block
  | ast.UncheckedBlock
  | ast.ExpressionStatement
  | ast.AssemblyStatement
  | ast.AssemblyFlagsDeclaration
  | ast.TupleDeconstructionStatement
  | ast.TupleDeconstructionElement
  | ast.TypedTupleMember
  | ast.UntypedTupleMember
  | ast.VariableDeclarationStatement
  | ast.VariableDeclarationValue
  | ast.IfStatement
  | ast.ElseBranch
  | ast.ForStatement
  | ast.WhileStatement
  | ast.DoWhileStatement
  | ast.ContinueStatement
  | ast.BreakStatement
  | ast.ReturnStatement
  | ast.EmitStatement
  | ast.TryStatement
  | ast.CatchClause
  | ast.CatchClauseError
  | ast.RevertStatement
  | ast.ThrowStatement
  | ast.AssignmentExpression
  | ast.ConditionalExpression
  | ast.OrExpression
  | ast.AndExpression
  | ast.EqualityExpression
  | ast.ComparisonExpression
  | ast.BitwiseOrExpression
  | ast.BitwiseXorExpression
  | ast.BitwiseAndExpression
  | ast.ShiftExpression
  | ast.AdditiveExpression
  | ast.MultiplicativeExpression
  | ast.ExponentiationExpression
  | ast.PostfixExpression
  | ast.PrefixExpression
  | ast.FunctionCallExpression
  | ast.CallOptionsExpression
  | ast.MemberAccessExpression
  | ast.IndexAccessExpression
  | ast.IndexAccessEnd
  | ast.PositionalArgumentsDeclaration
  | ast.NamedArgumentsDeclaration
  | ast.NamedArgumentGroup
  | ast.NamedArgument
  | ast.TypeExpression
  | ast.NewExpression
  | ast.TupleExpression
  | ast.TupleValue
  | ast.ArrayExpression
  | ast.HexNumberExpression
  | ast.DecimalNumberExpression
  | ast.YulBlock
  | ast.YulFunctionDefinition
  | ast.YulParametersDeclaration
  | ast.YulReturnsDeclaration
  | ast.YulVariableDeclarationStatement
  | ast.YulVariableDeclarationValue
  | ast.YulVariableAssignmentStatement
  | ast.YulStackAssignmentStatement
  | ast.YulColonEqual
  | ast.YulIfStatement
  | ast.YulForStatement
  | ast.YulSwitchStatement
  | ast.YulDefaultCase
  | ast.YulValueCase
  | ast.YulLeaveStatement
  | ast.YulBreakStatement
  | ast.YulContinueStatement
  | ast.YulLabel
  | ast.YulFunctionCallExpression
  | ast.SourceUnitMember
  | ast.Pragma
  | ast.ExperimentalFeature
  | ast.VersionExpression
  | ast.ImportClause
  | ast.UsingClause
  | ast.UsingOperator
  | ast.UsingTarget
  | ast.ContractMember
  | ast.StateVariableAttribute
  | ast.FunctionName
  | ast.FunctionAttribute
  | ast.FunctionBody
  | ast.ConstructorAttribute
  | ast.UnnamedFunctionAttribute
  | ast.FallbackFunctionAttribute
  | ast.ReceiveFunctionAttribute
  | ast.ModifierAttribute
  | ast.TypeName
  | ast.FunctionTypeAttribute
  | ast.MappingKeyType
  | ast.ElementaryType
  | ast.Statement
  | ast.TupleMember
  | ast.VariableDeclarationType
  | ast.StorageLocation
  | ast.ForStatementInitialization
  | ast.ForStatementCondition
  | ast.Expression
  | ast.MemberAccess
  | ast.ArgumentsDeclaration
  | ast.NumberUnit
  | ast.StringExpression
  | ast.StringLiteral
  | ast.HexStringLiteral
  | ast.UnicodeStringLiteral
  | ast.YulStatement
  | ast.YulAssignmentOperator
  | ast.YulSwitchCase
  | ast.YulExpression
  | ast.YulPathComponent
  | ast.YulBuiltInFunction
  | ast.YulLiteral
  | ast.SourceUnitMembers
  | ast.VersionExpressionSet
  | ast.ContractMembers
  | ast.InterfaceMembers
  | ast.LibraryMembers
  | ast.StructMembers
  | ast.StateVariableAttributes
  | ast.FunctionAttributes
  | ast.ConstructorAttributes
  | ast.UnnamedFunctionAttributes
  | ast.FallbackFunctionAttributes
  | ast.ReceiveFunctionAttributes
  | ast.ModifierAttributes
  | ast.FunctionTypeAttributes
  | ast.Statements
  | ast.CatchClauses
  | ast.StringLiterals
  | ast.HexStringLiterals
  | ast.UnicodeStringLiterals
  | ast.YulStatements
  | ast.YulSwitchCases
  | ast.VersionExpressionSets
  | ast.VersionSpecifiers
  | ast.ImportDeconstructionSymbols
  | ast.UsingDeconstructionSymbols
  | ast.InheritanceTypes
  | ast.EnumMembers
  | ast.Parameters
  | ast.OverridePaths
  | ast.EventParameters
  | ast.ErrorParameters
  | ast.AssemblyFlags
  | ast.TupleDeconstructionElements
  | ast.PositionalArguments
  | ast.NamedArguments
  | ast.CallOptions
  | ast.TupleValues
  | ast.ArrayValues
  | ast.IdentifierPath
  | ast.YulParameters
  | ast.YulReturnVariables
  | ast.YulArguments
  | ast.YulPaths
  | ast.YulPath;