export class Loc {
  startWithTrivia;

  start;

  endWithTrivia;

  end;

  constructor({ startWithTrivia, endWithTrivia, start, end }) {
    this.startWithTrivia = startWithTrivia;
    this.endWithTrivia = endWithTrivia;

    this.start = typeof start === 'undefined' ? startWithTrivia : start;
    this.end = typeof end === 'undefined' ? endWithTrivia : end;
  }
}

export function locStart(node) {
  return node.loc.start;
}

export function locEnd(node) {
  return node.loc.end;
}
