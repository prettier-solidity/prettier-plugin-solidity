// `createParser` needs Slang loaded first, and both have to come from the same
// copy of the plugin's code, so the tests import them together from here.
export { createParser } from "../../src/slang-utils/create-parser.ts";
export { loadSlang } from "../../src/slang-utils/slang.ts";
