#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import os from 'os';

async function downloadImage(prompt: string) {
  const width = 1024;
  const height = 1024;
  const seed = 42; 
  const model = 'flux'; 

  const cacheDir = path.join(os.tmpdir(), 'imagen-cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const buffer = await response.buffer();
    const filename = `image_${Date.now()}.png`; 
    const filePath = path.join(cacheDir, filename);
    fs.writeFileSync(filePath, buffer);
    console.log(`Image downloaded to ${filePath}`);
    return filePath; 
  } catch (error) {
    console.error("Download failed:", error);
    throw error; 
  }
}

const server = new Server(
  {
    name: "pollinations-ai-image-server",
    version: "0.2.0", 
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_image",
        description: "Generate an image using Pollinations AI and download it to the current directory",
        inputSchema: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "Prompt for image generation",
            },
          },
          required: ["prompt"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "generate_image") {
    const prompt = String(request.params.arguments?.prompt);
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    try {
      const filePath = await downloadImage(prompt);
      return {
        content: [{
          type: "text",
          text: `The image has been saved to:${filePath}`,
        }],
      };
    } catch (error: any) {
      return {
        content: [{
          type: "text",
          text: `Image generation failed: ${error.message}`,
        }],
        isError: true,
      };
    }
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Pollinations AI Image MCP server running on stdio");
}

main().catch(console.error);
