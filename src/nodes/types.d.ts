import type { AstPath, Doc, ParserOptions } from 'prettier';

interface NodePrinter<T> {
  print(arg: {
    node: T;
    options: ParserOptions;
    path: AstPath;
    print: (path: AstPath) => Doc;
  }): Doc;
}
