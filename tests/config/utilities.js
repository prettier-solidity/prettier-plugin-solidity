import path from "node:path";

const normalizeDirectory = (directory) => path.normalize(directory + path.sep);

const isErrorTest = (dirname) =>
  normalizeDirectory(dirname).includes(`${path.sep}_errors_${path.sep}`);

const shouldThrowOnFormat = ({ filename }, options) => {
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

export { isErrorTest, normalizeDirectory, shouldThrowOnFormat };
