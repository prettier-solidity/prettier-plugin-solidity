import state from "./browser-standalone-state.js";

export default async function globalTeardown() {
  await state.browserServer?.close();

  if (state.server) {
    await new Promise((resolve) => state.server.close(resolve));
  }
}
