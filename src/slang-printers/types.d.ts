import type { Doc, util } from 'prettier';

interface PrintSeparatedOptions {
  firstSeparator?: Doc;
  separator?: Doc;
  lastSeparator?: Doc;
  grouped?: boolean;
}

type DocV2 = Doc[] & { parts: Doc[] };

interface QuoteRegex {
  quote: util.Quote;
  regex: RegExp;
}
