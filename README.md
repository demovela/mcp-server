# Demovela MCP

Create product demo videos with guided recording and reusable video templates.

get_profile and list_templates provide account and template context. list_videos, get_video and get_video_status read existing outputs. create_video_draft saves a brief for review without recording, rendering or spending credits.

## Remote MCP

Use **https://mcp.demovela.com/mcp** in a client that supports remote MCP with OAuth. Sign in to Demovela and explicitly approve the connection.

## Claude Desktop and other stdio clients

Requires Node.js 22 or newer. Add this configuration:

```json
{
  "mcpServers": {
    "demovela": {
      "command": "npx",
      "args": [
        "-y",
        "demovela-mcp"
      ]
    }
  }
}
```

Or install the `.mcpb` file from [Releases](https://github.com/demovela/mcp-server/releases) in your desktop client's Extensions settings. The connector opens your browser for sign-in. If the consent page asks you to sign in, use its new-tab link, then return and refresh the consent page.

## Privacy and permissions

Existing profile-only connections must reconnect and approve the new permissions to use content tools. The consent screen lists the requested permissions. Your product password and provider credentials are not requested by this package. The pinned [mcp-remote](https://www.npmjs.com/package/mcp-remote) bridge handles OAuth, PKCE and local token storage. It connects only to the fixed endpoint above; command-line endpoint overrides are not supported. OAuth tokens are stored locally by mcp-remote and should be treated as credentials.

Revoke a connection at [Demovela MCP connections](https://demovela.com/oauth/mcp/connections).

## Development and publishing

Run `npm ci` and `npm test`. GitHub Actions publishes a new package version using the organization’s `NPM_TOKEN` secret, then builds and releases the desktop bundle. Keep package.json, manifest.json, server/config.json and server.json versions aligned.

Marketplace approval is separate from npm publication. See the product’s submission notes for endpoint tests and review prerequisites.

[Website](https://demovela.com) · [Issues](https://github.com/demovela/mcp-server/issues)
