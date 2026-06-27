# Vigilant Valkyrie

> Helping Female Veterans

Vigilant Valkyrie is a static web directory that helps female veterans find
organizations offering counseling, community, retreats, advocacy, and care.
It is a [Phantom Tech Industries](https://github.com/phantomtechindustries)
project.

**Live site:** https://vigilantvalkyrie.org

## What it does

- Lists vetted organizations that support female veterans.
- Lets visitors search and filter by name, location, or keyword.
- Keeps a prominent, always-visible crisis help banner (988, Veterans Crisis
  Line, and Military OneSource).

## How it works

This is a zero-build static site: plain HTML, CSS, and vanilla JavaScript that
reads its content from JSON files. There is no framework and no build step.

```
index.html              Page shell, crisis banner, search UI
css/styles.css          Dark patriotic theme
js/app.js               Renders cards and handles search/filter
data/resources.json     The organizations (primary editable data)
data/crisis-resources.json   Crisis hotline data
docs/Resource List.docx Source document (archive)
_headers                Security headers for Cloudflare Pages
```

## Editing the resource list

All content lives in [`data/resources.json`](data/resources.json). Edit that
file (in the GitHub web editor or a pull request) and the site updates on the
next deploy. See [CONTRIBUTING.md](CONTRIBUTING.md) for the data format.

## Running locally

No dependencies are required. Serve the folder with any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

The `fetch` calls for the JSON data require a server (opening `index.html`
directly from the filesystem will not work).

## Deployment

The site is hosted on Cloudflare Pages, connected to this GitHub repository.
Every push to `main` deploys automatically; pull requests get preview URLs.

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | (empty) |
| Build output directory | `/` |

## Security

See [SECURITY.md](SECURITY.md). The site stores only public information and
collects no visitor data.

## License

[MIT](LICENSE)
