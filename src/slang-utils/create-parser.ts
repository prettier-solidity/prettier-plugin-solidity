import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { Parser } from '@nomicfoundation/slang/parser';
import { LanguageFacts } from '@nomicfoundation/slang/utils';
import { maxSatisfying } from 'semver';
import { slangParserId, slangYulParserId } from '../constants.js';

import type { ParseOutput } from '@nomicfoundation/slang/parser';
import type { ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes/types.d.ts';

const supportedVersions = LanguageFacts.allVersions();
const supportedLength = supportedVersions.length;
const rootKindMap = new Map<ParserOptions<AstNode>['parser'], NonterminalKind>([
  [slangParserId, NonterminalKind.SourceUnit],
  [slangYulParserId, NonterminalKind.YulBlock]
]);

function parserAndOutput(
  text: string,
  version: string,
  { parser: optionsParser }: ParserOptions<AstNode>
): { parser: Parser; parseOutput: ParseOutput } {
  const rootKind = rootKindMap.get(optionsParser);

  if (rootKind === undefined) {
    throw new Error(
      `Parser '${optionsParser as string}' is not supported for Language Inference.`
    );
  }

  const parser = Parser.create(version);
  return { parser, parseOutput: parser.parseNonterminal(rootKind, text) };
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
  const compiler = maxSatisfying(supportedVersions, options.compiler);
  if (compiler) {
    const result = parserAndOutput(text, compiler, options);

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
      supportedVersions[supportedLength - 1],
      options
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

  const result = parserAndOutput(
    text,
    inferredRanges[inferredLength - 1],
    options
  );

  if (!result.parseOutput.isValid())
    throw createError(
      result,
      `Based on the pragma statements, we inferred your code to be using Solidity version ${
        result.parser.languageVersion
      }. If you would like to change that, update the pragmas in your source file, or specify a version in your \`.prettierrc\` file.`
    );

  return result;
}
