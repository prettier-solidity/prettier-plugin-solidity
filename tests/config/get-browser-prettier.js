import { chromium } from "playwright";
import getPlugins from "./get-plugins.js";

// `options.plugins` is a real array of imported module objects (functions
// and all), which can't cross the Node <-> browser boundary. The page has
// the same plugins loaded, in the same order (see
// browser-standalone-server.js), so each plugin is swapped for its index in
// that list, and the page's `window.__resolveOptions` swaps it back before
// calling into Prettier.
async function withPluginIndices({ plugins, ...rest }) {
  if (!Array.isArray(plugins)) {
    return rest;
  }

  const canonicalPlugins = await getPlugins();
  const pluginIndices = plugins.map((plugin) => {
    const index = canonicalPlugins.indexOf(plugin);
    if (index === -1) {
      throw new Error(
        "TEST_STANDALONE_BROWSER only knows how to resolve plugins loaded through get-plugins.js.",
      );
    }
    return index;
  });

  return { ...rest, pluginIndices };
}

// `page.evaluate` rejects with its own `PlaywrightError` when the evaluated
// function throws, prefixing the message (e.g. `page.evaluate: Error: ...`)
// and appending the browser-side stack trace. That would break
// `toThrowErrorMatchingSnapshot()` even though the underlying Prettier error
// message is identical to the Node build's. So each call below catches
// inside the page, hands back a plain serializable `{ ok, value | message }`,
// and this reconstructs a normal `Error` here instead of letting one cross
// the boundary directly.
function unwrap({ ok, value, message }) {
  if (!ok) {
    throw new Error(message);
  }
  return value;
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
  await page.waitForFunction(() => Array.isArray(window.__plugins));

  if (pageErrors.length > 0) {
    throw pageErrors[0];
  }

  return {
    formatWithCursor: async (input, options) =>
      page
        .evaluate(
          async ([input, options]) => {
            try {
              const value = await window.__prettier.formatWithCursor(
                input,
                window.__resolveOptions(options),
              );
              return { ok: true, value };
            } catch (error) {
              return { ok: false, message: error.message };
            }
          },
          [input, await withPluginIndices(options)],
        )
        .then(unwrap),

    getSupportInfo: async (options) =>
      page
        .evaluate(
          async (options) => {
            try {
              const value = await window.__prettier.getSupportInfo(
                window.__resolveOptions(options),
              );
              return { ok: true, value };
            } catch (error) {
              return { ok: false, message: error.message };
            }
          },
          await withPluginIndices(options),
        )
        .then(unwrap),

    __debug: {
      parse: async (input, options, extra) =>
        page
          .evaluate(
            async ([input, options, extra]) => {
              try {
                const value = await window.__prettier.__debug.parse(
                  input,
                  window.__resolveOptions(options),
                  extra,
                );
                return { ok: true, value };
              } catch (error) {
                return { ok: false, message: error.message };
              }
            },
            [input, await withPluginIndices(options), extra],
          )
          .then(unwrap),
    },
  };
}

let promise;
function getBrowserPrettier() {
  promise = promise ?? createBrowserPrettier();
  return promise;
}

export default getBrowserPrettier;
