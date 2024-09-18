export function printWarning(message) {
  // Prettier prints some temporary messages while formatting, and this warning
  // can mess with that output. We clear the line and move the cursor to the
  // beginning of the line to avoid this.
  //
  // \x1b: Escape character
  //  [2K: Escape code to clear the entire line
  //   \r: Carriage return
  const clearLine = '\x1b[2K\r';

  console.warn(`${clearLine}[prettier-solidity] ${message}`);
}
