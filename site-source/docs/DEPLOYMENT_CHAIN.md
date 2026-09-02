# FreeRUS deployment chain

## Target model

Production chain:

```text
GitHub -> n8n -> Codex -> VPS
```

Replit is not part of the production chain. Do not use Replit for deploys,
domain routing, source of truth, webhooks, or rollback decisions for
`freerus.site`.

## Responsibilities

### GitHub

- Stores the canonical source code.
- Receives release commits from Codex.
- Holds pull requests, tags and rollback points.

### n8n

- Runs editorial and operational automations.
- Can prepare content drafts, approval tasks and notifications.
- Should call GitHub/Codex/VPS workflows through explicit credentials.
- Must not store production secrets in workflow JSON committed to the repo.

### Codex

- Edits the codebase.
- Runs checks before release.
- Produces commit summaries and deployment notes.
- Does not publish to production unless the VPS or deployment credential is
  available in the current environment.

### VPS

- Serves `freerus.site` and `www.freerus.site`.
- Runs the web application, API routes, database bindings/adapters and background
  jobs.
- Owns nginx/Caddy, TLS certificates, PM2/systemd processes and runtime env
  variables.

## Release checklist

1. Commit the intended source state to GitHub.
2. Run checks:

```bash
npm test
```

3. Pull or upload the release to the VPS.
4. Install dependencies with the locked package manager.
5. Build the app:

```bash
npm run build
```

6. Restart the production process manager.
7. Reload the web server only after config validation.
8. Verify:

```bash
curl -I https://freerus.site/
curl -I https://www.freerus.site/
```

## Current local note

The local project still contains `.openai/hosting.json` because the current
Vite/Cloudflare local setup imports it for local bindings. This file is not the
production deployment authority in the new chain. Removing it should be done as
a separate migration together with `vite.config.ts` and database binding setup.
