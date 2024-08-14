import type {
  NonterminalKind,
  TerminalKind
} from '@nomicfoundation/slang/kinds';
import type { kinds } from '@nomicfoundation/slang/napi-bindings/generated';
import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, StrictAstNode } from './slang-nodes';

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
  precedingNode?: StrictAstNode;
  enclosingNode?: StrictAstNode;
  followingNode?: StrictAstNode;
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
  kind:
    | keyof typeof NonterminalKind
    | typeof TerminalKind.Identifier
    | typeof TerminalKind.YulIdentifier;
  comments: Comment[];
  loc: Location;
  print(
    path: AstPath<AstNode>,
    print: (path: AstPath<AstNode | string | undefined>) => Doc,
    options: ParserOptions
  ): Doc;
}

type PrintFunction = (path: AstPath<AstNode>) => Doc;

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
  | ast.YulStackAssignmentOperator
  | ast.YulColonAndEqual
  | ast.YulEqualAndColon
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
  | ast.YulVariableNames
  | ast.YulArguments
  | ast.YulPaths
  | ast.YulPath;
