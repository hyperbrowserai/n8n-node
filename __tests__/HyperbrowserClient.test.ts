import { HyperbrowserClient } from '../nodes/HyperbrowserClient/HyperbrowserClient.node';

describe('HyperbrowserClient Node', () => {
	let mcpClient: HyperbrowserClient;

	beforeEach(() => {
		mcpClient = new HyperbrowserClient();
	});

	it('should have the correct node type', () => {
		expect(mcpClient.description.name).toBe('mcpClient');
	});

	it('should have properties defined', () => {
		expect(mcpClient.description.properties).toBeDefined();
	});
});
