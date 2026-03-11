import path from "node:path";

const normalizeDirectory = (directory) => path.normalize(directory + path.sep);

export { normalizeDirectory };
