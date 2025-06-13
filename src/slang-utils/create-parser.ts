import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { maxSatisfying } from 'semver';

import type { ParseOutput } from '@nomicfoundation/slang/parser';
import type { ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes/types.js';

const supportedVersions = LanguageFacts.allVersions();

function parserAndOutput(
  text: string,
  version: string
): { parser: Parser; parseOutput: ParseOutput } {
  const parser = Parser.create(version);
  return {
    parser,
    parseOutput: parser.parseNonterminal(NonterminalKind.SourceUnit, text)
  };
}

export function createParser(
  text: string,
  options: ParserOptions<AstNode>
): { parser: Parser; parseOutput: ParseOutput } {
  const compiler = maxSatisfying(supportedVersions, options.compiler);
  if (compiler) return parserAndOutput(text, compiler);

  const inferredRanges: string[] = LanguageFacts.inferLanguageVersions(text);

  const result = parserAndOutput(
    text,
    inferredRanges[inferredRanges.length - 1]
  );
  if (!result.parseOutput.isValid())
    throw new Error(
      `Based on the pragma statements, we inferred your code to be using Solidity version ${
        result.parser.languageVersion
      }. If you would like to change that, update the pragmas in your source file, or specify a version in \`.prettierrc\` or VSCode's \`settings.json\`.`
    );

  return result;
}
