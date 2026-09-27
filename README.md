# Demovela MCP

**Product demos and marketing videos from real workflows.**

Demovela helps founders and product marketers show how a product actually works. Start with a supported product URL: the video agent explores the workflow, captures real desktop and mobile footage, and prepares demos and marketing cuts. Review the output library and direct the next edit in chat, keeping original recordings available for later versions.

[Website](https://demovela.com) · [MCP repository](https://github.com/demovela/mcp-server) · [Agent skill](https://github.com/demovela/agent-skill) · [npm package](https://www.npmjs.com/package/demovela-mcp)

## What this connector does

This package connects a local stdio MCP client to the hosted [Demovela MCP server](https://mcp.demovela.com/mcp). Hosted tools run on Cloudflare; the local package bridges the connection and opens browser-based OAuth. You do not need to deploy a Worker or paste a product password into your assistant.

| Tool | What it does |
| --- | --- |
| `get_profile` | Read the signed-in account context. |
| `list_templates` | Browse available template options for a brief. |
| `list_videos` | Browse existing owned outputs and saved drafts. |
| `get_video` | Read an existing video or draft record. |
| `get_video_status` | Check the saved status without starting a render. |
| `create_video_draft` | Save a title, brief and selected template as a draft conversation for review. |

The MCP browses existing work and saves briefs. It does not record a browser session, render a video, generate media or spend credits. A draft is not a finished video. The product’s current recording preview supports a limited set of products; consult the preview scope before starting. Download links can require product sign-in.

## Example workflow

1. Browse existing outputs and available templates.
2. Write a brief with an audience, one useful workflow, a hook and the intended format.
3. Save the requested brief as a draft and open its returned Demovela link to review and continue in the studio.

### Things to ask your assistant

> Find my latest product demo and tell me its saved status and where I can open it.

> Help me brief a mobile demo for new users. Browse the available templates before recommending one.

> Save this approved launch-video brief as a draft. Return the review link; do not start recording or rendering.

## Connect a remote MCP client

1. Open the client’s custom MCP or connector settings.
2. Enter `https://mcp.demovela.com/mcp` as the remote server URL.
3. Complete Demovela sign-in in your browser and review the permissions on the consent screen.
4. Return to the client and load the available tools.

Use a client that supports Streamable HTTP MCP and OAuth. Custom-connector availability depends on the client and your account. A public repository or npm release does not mean the integration has been approved for a client’s marketplace.

## Claude Desktop and other stdio clients

Requires **Node.js 22 or newer** and an existing Demovela account. Add this entry to your client’s MCP configuration:

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

You can also run `npx -y demovela-mcp` from a terminal to start the bridge. It speaks MCP over stdio; it is not an interactive chat interface. For desktop clients that support MCPB extensions, download the `.mcpb` file from [Demovela releases](https://github.com/demovela/mcp-server/releases).

## Permissions and account access

Requested scopes: `profile:read videos:read drafts:write`. Older profile-only connections need to reconnect and explicitly approve the additional permissions before content tools are available.

Only approve a connection you intended to start. If sign-in opens a new tab, finish it, return to the consent screen and refresh. [Manage or revoke connected apps](https://demovela.com/oauth/mcp/connections).

The package uses pinned [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) for OAuth, PKCE and local token storage. Tokens on your computer are credentials. The connector uses the fixed endpoint above and rejects command-line endpoint overrides. Product passwords and underlying provider credentials are not requested by this package.

### Retrying draft creation

Use a fresh UUID `requestId` for each new draft. Reuse that same ID only when retrying the identical request after an uncertain response. A changed brief or slide deck is a new request. Return the saved draft ID and review link; do not describe a saved draft as rendered or published content.

## Troubleshooting

- **No tools or insufficient permissions:** reconnect through browser consent and check the selected account.
- **An empty list:** confirm that the account owns the expected items. Empty results are different from a failed request.
- **A link asks you to sign in:** open it with the owning product account; a private product link is not a public share link.
- **The browser blocks authorization:** inspect the browser’s displayed error and restart an expired request from the client. Never send cookies or tokens in an issue.

## Add the companion skill

The [Demovela agent skill](https://github.com/demovela/agent-skill) explains how to select the right records, interpret results and respect the workflow’s limits:

```sh
npx skills add demovela/agent-skill
```

## Learn more about Demovela

- [AI product demo workspace](https://demovela.com/)
- [Real product-video examples](https://demovela.com/examples/)
- [Current recording preview scope](https://demovela.com/preview/)
- [Video templates](https://demovela.com/templates/)
- [Product demo guides](https://demovela.com/guides/)
- [Video planning tools](https://demovela.com/tools/)

## Development and support

```sh
npm ci
npm test
npm run bundle
```

[Report a connector issue](https://github.com/demovela/mcp-server/issues) with your client, Node.js version and a redacted error. Keep `package.json`, `manifest.json`, `server/config.json`, `server.json` and the lockfile version aligned for releases. GitHub Actions publishes versioned npm packages and MCPB assets. See [LICENSE](https://github.com/demovela/mcp-server/blob/main/LICENSE) for the MIT license.
