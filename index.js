// This file ensures n8n can find and load your nodes and credentials
const { Hyperbrowser } = require('./dist/nodes/Hyperbrowser/Hyperbrowser.node.js');

module.exports = {
	nodeTypes: {
		hyperbrowser: Hyperbrowser,
	},
	credentialTypes: {
		hyperbrowserApi: require('./dist/credentials/HyperbrowserApi.credentials.js').HyperbrowserApi,
	},
};
