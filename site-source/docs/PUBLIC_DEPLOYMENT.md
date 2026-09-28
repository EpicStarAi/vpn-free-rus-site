# Public freerus.site deployment

Verified 2026-09-28: the public routes `freerus.site/*` and `www.freerus.site/*` are served directly by the Cloudflare Worker `freerus-site`. Updating the VPS release alone does NOT publish this domain. The separate `freerus.site/admin*` route belongs to `freerus-files-admin` and must be preserved. The Telegram Mini App on vpn.freerus.site/client is a separate GitHub Pages deployment.

Build and publish from this directory with the existing authorized Wrangler login:

```sh
npm run build
npm run lint
node --test tests/rendered-html.test.mjs
npx wrangler deploy --config wrangler.production.json --dry-run
npx wrangler deploy --config wrangler.production.json
```

The production config preserves existing public routes and uses the generated client assets. No D1 bindings were present on the previous live Worker; do not publish the placeholder D1 ID generated for local development. Existing variables are retained with keep_vars.

Previous public Worker version for rollback: `87a666d8-ea3e-40e6-afdb-503e4408d570`.

Verify using a browser with an explicitly passed public URL. WSL environment variables are not a reliable way to pass the URL to Windows Node. Assert the rendered brand FREE RUS VPN, current download links, and absence of AmneziaWG in visible page text. Do not count a localhost check as public-domain verification.
