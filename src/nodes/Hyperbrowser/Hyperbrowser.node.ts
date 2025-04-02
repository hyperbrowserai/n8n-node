import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { Hyperbrowser } from './hyperbrowser';
import {
	CreateSessionParams,
	Country,
	ScrapeOptions,
	ScrapeFormat,
} from './hyperbrowser/types';

export default class HyperbrowserNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hyperbrowser',
		name: 'hyperbrowser',
		group: ['transform'],
		version: 1,
		description: 'Interact with websites using Hyperbrowser',
		defaults: {
			name: 'Hyperbrowser',
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
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
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Only Main Content',
						name: 'onlyMainContent',
						type: 'boolean',
						default: true,
						description: 'Whether to return only the main content of the page',
					},
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
							// @ts-ignore
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
