import path from "node:path";
import { normalizeDirectory } from "./utilities.js";

const __dirname = import.meta.dirname;

export const FORMAT_TEST_SCRIPT_FILENAME = "format.test.js";

export const FORMAT_TEST_DIRECTORY = normalizeDirectory(
  path.join(__dirname, "../format/"),
);

export const {
  FULL_TEST,
  TEST_STANDALONE_BROWSER,
  TEST_RUNTIME_BROWSER = "chromium",
} = process.env;

export const TEST_STANDALONE =
  process.env.TEST_STANDALONE || TEST_STANDALONE_BROWSER;

export const BOM = "\uFEFF";

export const CURSOR_PLACEHOLDER = "<|>";
export const RANGE_START_PLACEHOLDER = "<<<PRETTIER_RANGE_START>>>";
export const RANGE_END_PLACEHOLDER = "<<<PRETTIER_RANGE_END>>>";

export const PRETTIER_PLUGIN_NAMES = ["babel", "estree", "markdown"];

export const BROWSER_TEST_ROOTS = [
  ["/dist/", path.resolve(__dirname, "../../dist")],
  ["/prettier/", path.resolve(__dirname, "../../node_modules/prettier")],
];
