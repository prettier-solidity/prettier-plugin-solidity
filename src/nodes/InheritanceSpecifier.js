const InheritanceSpecifier = {
  print: ({ path, print }) => path.call(print, 'baseName')
};

module.exports = InheritanceSpecifier;
