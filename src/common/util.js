const getCompiler = (options) => {
  if (!options.compiler) return undefined;
  return options.compiler.split(/-|\+/)[0];
};

module.exports = { getCompiler };
