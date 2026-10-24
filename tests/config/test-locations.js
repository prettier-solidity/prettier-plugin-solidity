import { wrap as raw } from "jest-snapshot-serializer-raw";
import getPlugins from "./get-plugins.js";
import getPrettier from "./get-prettier.js";

/**
@import {TestCase} from "./run-test.js"
*/

// Records the `start` and `end` of every node, which are what Prettier uses
// to attach comments and keep blank lines. A change in how locations are
// collected then shows up in the snapshot, only in the nodes it affects.
//
// This tests are meant for a transition period only, while we review the
// collection of the Metadata, and can be disabled while we are not actively
// working on it.

/**
@param {object} node
@param {number} depth
@param {string[]} lines
*/
function printLocations(node, depth, lines) {
  lines.push(
    `${"  ".repeat(depth)}${node.kind} ${node.loc.start}-${node.loc.end}`,
  );

  for (const [key, value] of Object.entries(node)) {
    if (key === "loc" || key === "comments") continue;
    for (const child of Array.isArray(value) ? value : [value]) {
      if (child?.loc === undefined) continue;
      printLocations(child, depth + 1, lines);
    }
  }
}

/**
@param {TestCase} testCase
@param {string} name
*/
function testLocations(testCase, name) {
  test(name, async () => {
    const prettier = await getPrettier();
    const { ast } = await prettier.__debug.parse(testCase.code, {
      ...testCase.formatOptions,
      plugins: await getPlugins(),
    });

    const lines = [];
    printLocations(ast, 0, lines);
    expect(raw(lines.join("\n"))).toMatchSnapshot();
  });
}

/**
@param {TestCase} testCase
@return {boolean}
*/
function shouldSkip(testCase) {
  return testCase.expectFail;
}

export { testLocations as run, shouldSkip as skip };
