# Chainnes

Static site for [chainnes.com](https://chainnes.com), a one-person solarpunk studio. Pages live in `public/` and deploy as a Cloudflare Worker with static assets.

## Local

```bash
npm install
npm run dev
```

## Cloudflare

Workers Builds on the `main` branch deploys this repo. Leave the build command empty. The deploy command is `npx wrangler deploy`.

`name` in `wrangler.jsonc` must match the Worker on the chainnes.com Workers page. The custom domain `chainnes.com` is declared there so deploys keep the hostname.
