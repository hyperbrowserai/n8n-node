![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-hyperbrowser

This repository contains a custom n8n node for [Hyperbrowser](https://docs.hyperbrowser.ai/readme), enabling powerful web scraping, crawling, and data extraction capabilities in your n8n workflows.

## Features

- **Web Scraping**: Extract content from any webpage in various formats (HTML, Markdown, Links)
- **Web Crawling**: Automatically crawl websites and extract data from multiple pages
- **AI-Powered Extraction**: Use natural language queries to extract specific data from webpages
- **Browser Automation**:
  - Browser Use: Control browser actions with AI guidance
  - Claude Computer Use: Use Claude to control computer actions
  - OpenAI CUA: Use OpenAI to control user actions
- **Advanced Options**:
  - Proxy support with country selection
  - CAPTCHA solving
  - Custom timeouts
  - Main content extraction
  - Configurable output formats
  - Vision capabilities for browser automation
  - Maximum steps control for AI agents
  - Maximum pages limit for crawling

## Prerequisites

You need the following information to get started with the hyperbrowser n8n node:

* A Hyperbrowser API key (get one at [Hyperbrowser](https://app.hyperbrowser.ai))

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/<your organization>/n8n-nodes-hyperbrowser.git
   ```
2. Install dependencies:
   ```
   pnpm install
   ```

## Usage

1. Add your Hyperbrowser API key in n8n credentials
2. Add the Hyperbrowser node to your workflow
3. Configure the node with your desired operation:
   - **Scrape**: Extract content from a single webpage
   - **Crawl**: Automatically crawl multiple pages from a website
   - **Extract**: Use AI to extract specific data from a webpage
   - **Browser Use**: Control browser actions with AI guidance using the Browser-Use agent
   - **Claude Computer Use**: Use Claude to control computer actions using the Computer Use agent
   - **OpenAI CUA**: Use OpenAI to control user actions using the CUA agent

## Documentation

For Hyperbrowser-specific documentation, visit the [Hyperbrowser docs](https://docs.hyperbrowser.ai/readme).

For detailed information about creating n8n nodes, refer to the [n8n documentation](https://docs.n8n.io/integrations/creating-nodes/).

## License

[MIT](LICENSE.md)
