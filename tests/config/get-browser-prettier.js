import { chromium } from "playwright";
import getPlugins from "./get-plugins.js";

// `options.plugins` is a real array of imported module objects (functions
// and all), which can't cross the Node <-> browser boundary. There are only
// two shapes any test actually passes: the full canonical set from
// get-plugins.js, or just the solidity plugin alone. So rather than
// identifying individual plugins, this matches the whole array against
// those two shapes and sends which one it was; the page has the same two
// shapes available (see browser-standalone-server.js) and
// `window.__resolveOptions` swaps the flag back before calling into
// Prettier.
async function withPlugins({ plugins, ...rest }) {
  if (!Array.isArray(plugins)) {
    return rest;
  }

  const canonicalPlugins = await getPlugins();
  if (plugins.length === canonicalPlugins.length) {
    return { ...rest, plugins: "all" };
  }

  if (plugins.length === 1 && plugins[0] === canonicalPlugins.at(-1)) {
    return { ...rest, plugins: "solidity" };
  }

  throw new Error(
    "TEST_STANDALONE_BROWSER only knows how to resolve the full plugin set or the solidity plugin alone, both loaded through get-plugins.js.",
  );
}

function callBrowserPrettier(page, path, args) {
  return page
    .evaluate(
      async ([path, args]) => {
        try {
          args.options = window.__resolveOptions(args.options);
          // e.g. "__debug.parse" reaches window.__prettier.__debug.parse
          const method = path
            .split(".")
            .reduce((object, key) => object[key], window.__prettier);
          // args's own values, in declaration order, as positional arguments
          const value = await method(...Object.values(args));
          return { ok: true, value };
        } catch (error) {
          // Caught here and rethrown below, rather than left to cross the
          // boundary, since page.evaluate wraps it in its own
          // PlaywrightError and breaks toThrowErrorMatchingSnapshot().
          return { ok: false, message: error.message };
        }
      },
      [path, args],
    )
    .then(({ ok, value, message }) => {
      if (!ok) {
        throw new Error(message);
      }
      return value;
    });
}

async function createBrowserPrettier() {
  const wsEndpoint = process.env.BROWSER_STANDALONE_WS_ENDPOINT;
  const port = process.env.BROWSER_STANDALONE_SERVER_PORT;

  if (!wsEndpoint || !port) {
    throw new Error(
      "TEST_STANDALONE_BROWSER requires the browser-standalone globalSetup to have run. Use `npm run test:standalone:browser` rather than invoking jest directly.",
    );
  }

  const browser = await chromium.connect(wsEndpoint);
  const page = await browser.newPage();

  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error));

  await page.goto(`http://localhost:${port}/`);
  await page.waitForFunction(() => window.__plugins != null);

  if (pageErrors.length > 0) {
    throw pageErrors[0];
  }

  return {
    formatWithCursor: async (input, options) =>
      callBrowserPrettier(page, "formatWithCursor", {
        input,
        options: await withPlugins(options),
      }),

    getSupportInfo: async (options) =>
      callBrowserPrettier(page, "getSupportInfo", {
        options: await withPlugins(options),
      }),

    __debug: {
      parse: async (input, options, extra) =>
        callBrowserPrettier(page, "__debug.parse", {
          input,
          options: await withPlugins(options),
          extra,
        }),
    },
  };
}

let promise;
function getBrowserPrettier() {
  promise = promise ?? createBrowserPrettier();
  return promise;
}

export default getBrowserPrettier;
