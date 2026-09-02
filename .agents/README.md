# Antigravity Supabase MCP Configuration

This directory configures the Antigravity Model Context Protocol (MCP) server for direct Supabase database interaction and management.

## Setup & Reauthentication

### Option 1: Workspace MCP Config (`.agents/mcp_config.json`)
Open [`.agents/mcp_config.json`](./mcp_config.json) and supply your Supabase credentials:
- `SUPABASE_URL`: `https://txaceigetesftgckqdcm.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY`: Obtained from Supabase Dashboard > Project Settings > API > `service_role` secret key.
- `SUPABASE_ACCESS_TOKEN`: Obtained from Supabase Dashboard > Account Settings > Access Tokens > Generate new token (`sbp_...`).

### Option 2: Global IDE Configuration (`~/.gemini/config/mcp_config.json`)
You can also configure this globally in your user profile:
1. In Antigravity IDE, go to **Settings / Additional Options (...) > MCP Servers**.
2. Select **Supabase** or add a new MCP Server.
3. Authenticate with your Personal Access Token (`sbp_...`) or Project Credentials.
