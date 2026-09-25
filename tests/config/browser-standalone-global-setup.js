import { startStandaloneServer } from "./browser-standalone-server.js";
import getRuntimeBrowser from "./get-runtime-browser.js";
import state from "./browser-standalone-state.js";

// Runs once for the whole `jest` invocation (not per worker), so every
// worker's page connects to the same browser and file server instead of
// each spawning its own browser process.
export default async function globalSetup() {
  // Loads the .env file if present, needed for the Firefox launch workaround
  // on some macOS versions. See .env.example for how to generate it.
  try {
    process.loadEnvFile();
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const server = await startStandaloneServer();
  const browserType = getRuntimeBrowser();
  const browserServer = await browserType.launchServer({ headless: true });

  Object.assign(state, { server, browserServer });

  process.env.BROWSER_STANDALONE_WS_ENDPOINT = browserServer.wsEndpoint();
  process.env.BROWSER_STANDALONE_SERVER_PORT = String(server.address().port);
}
