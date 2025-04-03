<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/hyperbrowserai/n8n-node/refs/heads/master/assets/dark_bg_logo.webp">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/hyperbrowserai/n8n-node/refs/heads/master/assets/light_bg_logo.webp">
  <img alt="Logo of Hyperbrowser" src="https://raw.githubusercontent.com/hyperbrowserai/n8n-node/refs/heads/master/assets/dark_bg_logo.webp">
</picture>


# @hyperbrowser/n8n-nodes

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

You can install this node from npm as a community node on n8n. Search for `@hyperbrowser/n8n-nodes`

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

## Examples

A few example n8n flows are provided in the [examples directory](/examples/). Feel free to explore and play with them.

## Documentation

For Hyperbrowser-specific documentation, visit the [Hyperbrowser docs](https://docs.hyperbrowser.ai/readme).

For detailed information about creating n8n nodes, refer to the [n8n documentation](https://docs.n8n.io/integrations/creating-nodes/).

## License

[MIT](LICENSE.md)
