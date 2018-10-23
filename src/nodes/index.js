const dirToObject = require('dir-to-object');

const nodes = dirToObject(__dirname, { canAdd: data => data.print });

module.exports = nodes;
