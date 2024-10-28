import type { Doc } from 'prettier';

interface PrintSeparatedOptions {
  firstSeparator?: Doc;
  separator?: Doc;
  lastSeparator?: Doc;
  grouped?: boolean;
}
