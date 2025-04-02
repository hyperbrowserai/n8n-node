// This file ensures n8n can find and load your nodes and credentials
const { Hyperbrowser } = require('./dist/Hyperbrowser.node.js');

module.exports = {
	nodeTypes: {
		hyperbrowser: Hyperbrowser,
	}
};
