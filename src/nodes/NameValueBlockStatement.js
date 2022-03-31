const {
    doc: {
      builders: { line, softline }
    }
  } = require('prettier');
  
  const printSeparatedList = require('./print-separated-list');
  
  const NameValueBlockStatement = {
    print: ({ node, path, print, options }) =>
    ['{',
      printSeparatedList(
        path
          .map(print, 'arguments')
          .map((argument, index) =>{
              if(typeof node.names[index] === 'undefined') return argument;
              return [node.names[index], ': ', argument]
            }),
        {
          firstSeparator: options.bracketSpacing ? line : softline
        }
      ),
    '}']
  };
  
  module.exports = NameValueBlockStatement;
  