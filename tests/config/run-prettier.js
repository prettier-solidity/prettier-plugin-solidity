import getPrettier from "./get-prettier.js";
import getPlugins from "./get-plugins.js";
import {
  CURSOR_PLACEHOLDER,
  RANGE_START_PLACEHOLDER,
  RANGE_END_PLACEHOLDER,
} from "./constants.js";
import visualizeEndOfLine from "./utils/visualize-end-of-line.js";

async function parse(source, options) {
  const prettier = await getPrettier();

  const { ast } = await prettier.__debug.parse(
    source,
    { ...options, plugins: await getPlugins() },
    { massage: true },
  );
  return ast;
}

async function format(originalText, originalOptions) {
  const { text: input, options } = replacePlaceholders(
    originalText,
    originalOptions,
  );
  const inputWithCursor = insertCursor(input, options.cursorOffset);
  const prettier = await getPrettier();

  const { formatted: output, cursorOffset } = await prettier.formatWithCursor(
    input,
    { ...options, plugins: await getPlugins() },
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

const indexProperties = [
  {
    property: "cursorOffset",
    placeholder: CURSOR_PLACEHOLDER,
  },
  {
    property: "rangeStart",
    placeholder: RANGE_START_PLACEHOLDER,
  },
  {
    property: "rangeEnd",
    placeholder: RANGE_END_PLACEHOLDER,
  },
];

function replacePlaceholders(originalText, originalOptions) {
  const indexes = indexProperties
    .map(({ property, placeholder }) => {
      const value = originalText.indexOf(placeholder);
      return value === -1 ? undefined : { property, value, placeholder };
    })
    .filter(Boolean)
    .sort((a, b) => a.value - b.value);

  const options = { ...originalOptions };
  let text = originalText;
  let offset = 0;
  for (const { property, value, placeholder } of indexes) {
    text = text.replace(placeholder, "");
    options[property] = value + offset;
    offset -= placeholder.length;
  }
  return { text, options };
}

export { format, parse };
