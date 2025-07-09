import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { minSatisfying } from 'semver';

import type { ParseOutput } from '@nomicfoundation/slang/parser';
import type { ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes/types.d.ts';

const supportedVersions = LanguageFacts.allVersions();
const supportedLength = supportedVersions.length;

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

function createError(
  result: { parseOutput: ParseOutput },
  reason: string
): Error {
  return new Error(
    `We encountered the following syntax error:\n\n\t${result.parseOutput.errors()[0].message}\n\n${reason}`
  );
}

export function createParser(
  text: string,
  options: ParserOptions<AstNode>
): { parser: Parser; parseOutput: ParseOutput } {
  const compiler = minSatisfying(supportedVersions, options.compiler);
  if (compiler) {
    const result = parserAndOutput(text, compiler);

    if (!result.parseOutput.isValid())
      throw createError(
        result,
        `Based on the compiler option provided, we inferred your code to be using Solidity version ${
          result.parser.languageVersion
        }. If you would like to change that, specify a different version in your \`.prettierrc\` file.`
      );

    return result;
  }

  const inferredRanges: string[] = LanguageFacts.inferLanguageVersions(text);
  const inferredLength = inferredRanges.length;

  if (inferredLength === 0 || inferredLength === supportedLength) {
    const result = parserAndOutput(
      text,
      supportedVersions[supportedLength - 1]
    );

    if (!result.parseOutput.isValid())
      throw createError(
        result,
        `We couldn't infer a Solidity version based on the pragma statements in your code so we defaulted to ${
          result.parser.languageVersion
        }. You might be attempting to use a syntax not yet supported by Slang or you might want to specify a version in your \`.prettierrc\` file.`
      );
    return result;
  }

  const result = parserAndOutput(text, inferredRanges[0]);

  if (!result.parseOutput.isValid())
    throw createError(
      result,
      `Based on the pragma statements, we inferred your code to be using Solidity version ${
        result.parser.languageVersion
      }. If you would like to change that, update the pragmas in your source file, or specify a version in your \`.prettierrc\` file.`
    );

  return result;
}
