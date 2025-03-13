[中文](README_zh.md) | [English](README.md)

# pollinations-ai-image-server MCP Server

A Model Context Protocol server for generating images using Pollinations AI

This is a TypeScript-based MCP server that implements an AI image generation system. It demonstrates core MCP concepts by providing:

- Tools for generating images using Pollinations AI
- Simple integration with Claude Desktop

## Features

### Tools
- `generate_image` - Generate images using Pollinations AI
  - Takes a prompt as required parameter
  - Downloads and saves the generated image to a temporary directory
  - Returns the file path of the saved image

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "pollinations-ai-image-server": {
      "command": "/path/to/pollinations-ai-image-server/build/index.js"
    }
  }
}
```

### Usage

Once configured, you can use the server with Claude Desktop by asking Claude to generate images. For example:

"Please generate an image of a sunset over mountains using the pollinations-ai-image-server."

The image will be generated using Pollinations AI with the following default settings:
- Width: 1024px
- Height: 1024px
- Model: flux

The generated image will be saved to a temporary directory and the file path will be returned.

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
