// This file ensures n8n can find and load your nodes and credentials
const { HyperbrowserClient } = require('./dist/nodes/HyperbrowserClient/HyperbrowserClient.node.js');

module.exports = {
	nodeTypes: {
		hyperbrowserClient: HyperbrowserClient,
	},
	credentialTypes: {
		hyperbrowserClientApi: require('./dist/credentials/HyperbrowserClientApi.credentials.js').HyperbrowserClientApi,
		hyperbrowserClientSseApi: require('./dist/credentials/HyperbrowserClientSseApi.credentials.js').HyperbrowserClientSseApi,
	},
};
