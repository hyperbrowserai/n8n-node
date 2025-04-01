import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import { Hyperbrowser } from '@hyperbrowser/sdk';
import { CreateSessionParams, Country, ScrapeOptions, ScrapeFormat } from '@hyperbrowser/sdk/types';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hyperbrowser',
		name: 'hyperbrowserScraper',
		group: ['transform'],
		version: 1,
		description: 'Interact with websites using Hyperbrowser',
		defaults: {
			name: 'Hyperbrowser',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'hyperbrowserApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Scrape',
						value: 'scrape',
						description: 'Scrape a URL',
						action: 'Scrape a URL',
					},
					{
						name: 'Crawl',
						value: 'crawl',
						description: 'Crawl a website and its links',
						action: 'Crawl a website',
					},
					{
						name: 'Extract',
						value: 'extract',
						description: 'Extract specific data from a webpage using AI',
						action: 'Extract data from a webpage',
					},
				],
				default: 'scrape',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				description: 'URL to process',
				placeholder: 'https://example.com',
			},
			{
				displayName: 'Extraction Query',
				name: 'extractionQuery',
				type: 'string',
				required: true,
				default: '',
				description: 'What data to extract from the webpage (e.g., "Extract all product prices")',
				displayOptions: {
					show: {
						operation: ['extract'],
					},
				},
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Output Format',
						name: 'format',
						type: 'options',
						options: [
							{
								name: 'HTML',
								value: 'html',
							},
							{
								name: 'Links',
								value: 'links',
							},
							{
								name: 'Markdown',
								value: 'markdown',
							},
						],
						default: 'markdown',
						description: 'Output format to return',
						displayOptions: {
							show: {
								'/operation': ['scrape'],
							},
						},
					},
					{
						displayName: 'Only Main Content',
						name: 'onlyMainContent',
						type: 'boolean',
						default: true,
						description: 'Whether to return only the main content of the page',
					},
					{
						displayName: 'Timeout (ms)',
						name: 'timeout',
						type: 'number',
						default: 15000,
						description: 'Maximum timeout for navigating to a page in milliseconds',
					},
					{
						displayName: 'Use Proxy',
						name: 'useProxy',
						type: 'boolean',
						default: false,
						description: 'Whether to use a proxy for scraping',
					},
					{
						displayName: 'Solve CAPTCHAs',
						name: 'solveCaptchas',
						type: 'boolean',
						default: false,
						description: 'Whether to solve CAPTCHAs during scraping',
					},
					{
						displayName: 'Proxy Country',
						name: 'proxyCountry',
						type: 'options',
						options: [
							{ name: 'United States', value: 'US' },
							{ name: 'United Kingdom', value: 'GB' },
							{ name: 'Germany', value: 'DE' },
							{ name: 'France', value: 'FR' },
							{ name: 'Japan', value: 'JP' },
						],
						default: 'US',
						description: 'Country for proxy server',
						displayOptions: {
							show: {
								useProxy: [true],
							},
						},
					},
					{
						displayName: 'Maximum Pages',
						name: 'maxPages',
						type: 'number',
						default: 10,
						description: 'Maximum number of pages to crawl',
						displayOptions: {
							show: {
								'/operation': ['crawl'],
							},
						},
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('hyperbrowserApi');
		const client = new Hyperbrowser({
			apiKey: credentials.apiKey as string,
		});

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const url = this.getNodeParameter('url', i) as string;
				const options = this.getNodeParameter('options', i, {}) as {
					format?: ScrapeFormat;
					onlyMainContent?: boolean;
					timeout?: number;
					useProxy?: boolean;
					solveCaptchas?: boolean;
					proxyCountry?: Country;
					maxPages?: number;
				};

				const sessionOptions: CreateSessionParams | undefined = options.useProxy
					? {
							useProxy: true,
							solveCaptchas: options.solveCaptchas || false,
							proxyCountry: options.proxyCountry || 'US',
					  }
					: undefined;

				let responseData: IDataObject;

				if (operation === 'scrape') {
					const scrapeOptions: ScrapeOptions = {
						formats: [options.format || 'markdown'],
						onlyMainContent: options.onlyMainContent ?? true,
						timeout: options.timeout || 15000,
					};

					const response = await client.scrape.startAndWait({
						url,
						scrapeOptions,
						sessionOptions,
					});

					responseData = {
						url,
						content: response.data,
						status: response.status,
					};
				} else if (operation === 'crawl') {
					const response = await client.crawl.startAndWait({
						url,
						maxPages: options.maxPages || 10,
						scrapeOptions: {
							formats: ['markdown'],
							onlyMainContent: options.onlyMainContent ?? true,
							timeout: options.timeout || 15000,
						},
						sessionOptions,
					});

					responseData = {
						url,
						data: response.data,
						status: response.status,
					};
				} else if (operation === 'extract') {
					const extractionQuery = this.getNodeParameter('extractionQuery', i) as string;
					const response = await client.extract.startAndWait({
						urls: [url],
						prompt: extractionQuery,
						sessionOptions,
					});

					responseData = {
						url,
						extractedData: response.data,
						status: response.status,
					};
				} else {
					throw new NodeOperationError(this.getNode(), `Operation "${operation}" is not supported`);
				}

				returnData.push({
					json: responseData,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
							url: this.getNodeParameter('url', i) as string,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
