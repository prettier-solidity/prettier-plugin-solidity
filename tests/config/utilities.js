import path from "node:path";

const normalizeDirectory = (directory) => path.normalize(directory + path.sep);

const shouldThrowOnFormat = (filename, options) => {
  const { errors = {}, parser } = options;
  if (errors === true) {
    return true;
  }

  const files = errors[parser];

  if (files === true || (Array.isArray(files) && files.includes(filename))) {
    return true;
  }

  return false;
};

export { normalizeDirectory, shouldThrowOnFormat };
