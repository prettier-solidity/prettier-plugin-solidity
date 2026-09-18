// Shared between browser-standalone-global-setup.js and
// browser-standalone-global-teardown.js. Jest runs both in the same process,
// so this plain module singleton is enough to hand the teardown file the
// handles the setup file created.
const state = {};

export default state;
