import { chromium, firefox, webkit } from "playwright";
import { TEST_RUNTIME_BROWSER } from "./constants.js";

const browserTypes = { chromium, firefox, webkit };

function getRuntimeBrowser() {
  const browserType = browserTypes[TEST_RUNTIME_BROWSER];
  if (!browserType) {
    throw new Error(
      `Unknown TEST_RUNTIME_BROWSER "${TEST_RUNTIME_BROWSER}". Expected one of: ${Object.keys(browserTypes).join(", ")}.`,
    );
  }
  return browserType;
}

export default getRuntimeBrowser;
