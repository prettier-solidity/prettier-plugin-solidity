import getPrettier from "./get-prettier.js";
import getPlugins from "./get-plugins.js";
import { CURSOR_PLACEHOLDER } from "./constants.js";
import visualizeEndOfLine from "./visualize-end-of-line.js";

async function parse(input, options) {
  const prettier = await getPrettier();
  const { ast } = await prettier.__debug.parse(
    input,
    await loadPlugins(options),
    { massage: true },
  );
  return ast;
}

async function format(input, options) {
  const inputWithCursor = insertCursor(input, options.cursorOffset);
  const prettier = await getPrettier();

  const { formatted: output, cursorOffset } = await prettier.formatWithCursor(
    input,
    await loadPlugins(options),
  );
  const outputWithCursor = insertCursor(output, cursorOffset);
  const eolVisualizedOutput = visualizeEndOfLine(outputWithCursor);

  const changed = outputWithCursor !== inputWithCursor;

  return {
    changed,
    options,
    input,
    inputWithCursor,
    output,
    outputWithCursor,
    eolVisualizedOutput,
  };
}

const insertCursor = (text, cursorOffset) =>
  cursorOffset >= 0
    ? text.slice(0, cursorOffset) +
      CURSOR_PLACEHOLDER +
      text.slice(cursorOffset)
    : text;

async function loadPlugins(options) {
  return { ...options, plugins: await getPlugins() };
}

export { format, parse };
