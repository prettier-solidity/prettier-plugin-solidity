export const shouldGroupOrIndent = ({ type, operator }, matchers) =>
  type !== 'BinaryOperation' ||
  matchers.some((matcher) => matcher.match(operator));
