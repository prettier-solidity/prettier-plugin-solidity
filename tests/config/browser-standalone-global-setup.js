import { chromium } from "playwright";
import { startStandaloneServer } from "./browser-standalone-server.js";
import state from "./browser-standalone-state.js";

// Runs once for the whole `jest` invocation (not per worker), so every
// worker's page connects to the same browser and file server instead of
// each spawning its own Chromium process.
export default async function globalSetup() {
  const server = await startStandaloneServer();
  const browserServer = await chromium.launchServer({ headless: true });

  Object.assign(state, { server, browserServer });

  process.env.BROWSER_STANDALONE_WS_ENDPOINT = browserServer.wsEndpoint();
  process.env.BROWSER_STANDALONE_SERVER_PORT = String(server.address().port);
}
