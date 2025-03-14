[中文](README_zh.md) | [English](README.md)

# pollinations-ai-image-server MCP 服务器

一个用于使用Pollinations AI生成图像的模型上下文协议(MCP)服务器

这是一个基于TypeScript的MCP服务器，实现了AI图像生成系统。它通过以下方式展示了核心MCP概念：

- 使用Pollinations AI生成图像的工具
- 与Claude Desktop的简单集成

## 功能特性

### 工具
- `generate_image` - 使用Pollinations AI生成图像
  - 需要提供提示词作为必需参数
  - 支持多种图片尺寸选项：720x1280、1280x720、1024x1024（默认）
  - 下载并将生成的图像保存到临时目录
  - 返回保存的图像文件路径

## 开发

安装依赖：
```bash
npm install
```

构建服务器：
```bash
npm run build
```

用于开发时自动重新构建：
```bash
npm run watch
```

## 安装

要与Claude Desktop一起使用，请添加服务器配置：

在MacOS上：`~/Library/Application Support/Claude/claude_desktop_config.json`
在Windows上：`%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "pollinations-ai-image-server": {
      "command": "/path/to/pollinations-ai-image-server/build/index.js"
    }
  }
}
```

### 使用方法

配置完成后，您可以通过要求Claude生成图像来使用服务器。例如：

"请使用pollinations-ai-image-server生成一张山峦日落的图像。"

您可以在请求中指定图片尺寸：
"使用pollinations-ai-image-server生成一张竖版（720x1280）的猫咪图像。"

支持的图片尺寸：
- 720x1280（竖版）
- 1280x720（横版）
- 1024x1024（方形，默认）

图像将使用Pollinations AI以下列默认设置生成：
- 模型：flux
- 种子值：42

生成的图像将保存到临时目录，并返回文件路径。

### 调试

由于MCP服务器通过stdio通信，调试可能具有挑战性。我们推荐使用[MCP Inspector](https://github.com/modelcontextprotocol/inspector)，可以通过包脚本使用：

```bash
npm run inspector
```

Inspector将提供一个URL，用于在浏览器中访问调试工具。