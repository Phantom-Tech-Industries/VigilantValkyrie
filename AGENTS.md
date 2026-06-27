# AGENTS.md

## Cursor Cloud specific instructions

This is a **zero-build static site** (plain HTML, CSS, vanilla JS that reads
content from JSON in `data/`). There is no package manager, no `node_modules`,
and no build step. Python 3 and Node are preinstalled.

### Run it (development)

The JSON `fetch` calls require an HTTP server; opening `index.html` from the
filesystem will not work. Serve the repo root:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

### Lint / test

There is no separate lint step. The only automated checks are in
`.github/workflows/ci.yml`:

- **JSON + schema validation** of `data/resources.json` and
  `data/crisis-resources.json` (required fields, `https://` websites, unique
  ids). This is the gate that must pass and can be re-run locally by copying the
  `Validate JSON and schema` Python snippet from `.github/workflows/ci.yml`.
- **External link check** of every org `website`. This step is
  `continue-on-error: true` in CI and requires outbound network access, so do
  not treat link-check failures as blocking.

### Notes

- Editable content lives in `data/resources.json` (organizations) and
  `data/crisis-resources.json` (crisis banner). The schema/format is documented
  in `CONTRIBUTING.md`.
- Deployed via Cloudflare Pages (framework preset None, empty build command,
  output dir `/`). `_headers` defines a strict CSP — keep scripts/styles
  same-origin (`'self'`).
