![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-hyperbrowser

This repository contains a custom n8n node for [Hyperbrowser](https://docs.hyperbrowser.ai/readme), enabling powerful web scraping, crawling, and data extraction capabilities in your n8n workflows.

## Features

- **Web Scraping**: Extract content from any webpage in various formats (HTML, Markdown, Links)
- **Web Crawling**: Automatically crawl websites and extract data from multiple pages
- **AI-Powered Extraction**: Use natural language queries to extract specific data from webpages
- **Advanced Options**:
  - Proxy support with country selection
  - CAPTCHA solving
  - Custom timeouts
  - Main content extraction
  - Configurable output formats

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and pnpm. Minimum version Node 18. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
  ```
  pnpm install n8n -g
  ```
* A Hyperbrowser API key (get one at [Hyperbrowser](https://docs.hyperbrowser.ai/readme))

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

## Development

1. Run `pnpm lint` to check for errors
2. Run `pnpm lintfix` to automatically fix errors when possible
3. Test your node locally following the [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) guide

## Documentation

For detailed information about creating n8n nodes, refer to the [n8n documentation](https://docs.n8n.io/integrations/creating-nodes/).

For Hyperbrowser-specific documentation, visit the [Hyperbrowser docs](https://docs.hyperbrowser.ai/readme).

## License

[MIT](LICENSE.md)
