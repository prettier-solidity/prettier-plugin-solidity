"use strict";

const path = require("path");
const vm = require("vm");
const prettier = require("prettier");
const satisfies = require("semver/functions/satisfies");
const createSandBox = require("./utils/create-sandbox.cjs");

const prettierPath = path.dirname(require.resolve("prettier"));
const isPrettier2 = satisfies(prettier.version, "^2.3.0");
const pluginPrefix = isPrettier2
  ? "parser-" // Prettier V2
  : "plugins/"; // Prettier V3

const plugins = [
  path.join(prettierPath, `${pluginPrefix}markdown.js`),
  path.join(__dirname, "../../dist/standalone.cjs"),
];

const files = isPrettier2
  ? [path.join(prettierPath, "standalone.js"), ...plugins]
  : [
      path.join(prettierPath, "standalone.js"),
      path.join(prettierPath, `${pluginPrefix}babel.js`),
      path.join(prettierPath, `${pluginPrefix}estree.js`),
      ...plugins,
    ];

const sandbox = createSandBox({ files });

// TODO: maybe expose (and write tests) for `format`, `utils`, and
// `__debug` methods
module.exports = {
  formatWithCursor(input, options) {
    return vm.runInNewContext(
      `
        const options = {
          ...$$$options,
          plugins: [
            ...Object.values(prettierPlugins),
            ...($$$options.plugins || []),
          ],
        };
        prettier.formatWithCursor($$$input, options);
      `,
      { $$$input: input, $$$options: options, ...sandbox },
    );
  },

  __debug: {
    parse(input, options, devOptions) {
      return vm.runInNewContext(
        `
          const options = {
            ...$$$options,
            plugins: [
              ...Object.values(prettierPlugins),
              ...($$$options.plugins || []),
            ],
          };
          prettier.__debug.parse($$$input, options, $$$devOptions);
        `,
        {
          $$$input: input,
          $$$options: options,
          $$$devOptions: devOptions,
          ...sandbox,
        },
      );
    },
  },
};
