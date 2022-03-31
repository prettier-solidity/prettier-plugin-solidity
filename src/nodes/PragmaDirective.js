const PragmaDirective = {
  print: ({ node }) => [
    'pragma ', 
    node.name, 
    (node.value === '') ? '' : ' ',
    node.value, ';']
};

module.exports = PragmaDirective;
