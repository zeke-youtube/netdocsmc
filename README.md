# NetDocs MC

NetDocs MC is an unofficial, community-maintained reference for the NetEase Minecraft China Edition ModAPI. It improves browsing and search while preserving source semantics and original Chinese text. It is not affiliated with NetEase, Mojang, or Microsoft.

## Project status

The typed data model, static API pages, deterministic local search, and an initial text/HTML/JSON import pipeline are implemented. The bundled dataset contains only three entries for exercising the system; it is not a complete ModAPI reference.

## Architecture

- `docs-data/` contains canonical JSON consumed at build time.
- `src/types/` defines the shared documentation domain model.
- `scripts/import-docs/` parses raw inputs, normalizes records, and validates canonical output. Import logic is independent from React.
- `src/features/search/` contains transparent weighted local search and its interactive UI.
- `src/components/` contains focused shared controls and navigation.
- `src/app/` contains statically generated Next.js routes and metadata.

Documentation pages are server-rendered at build time. Only search, copy controls, and theme selection ship client-side state.

## Prerequisites and setup

Node.js 20 or later and npm are required.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. The theme defaults to the operating-system preference; a manual selection is persisted in local storage.

## Importing and validating documentation

Import a plain-text, HTML, or JSON source into canonical JSON:

```sh
npm run import:docs -- path/to/source.txt docs-data/imported.json
npm run validate:docs
```

The importer reports malformed or partial records with a warning code and source record. Invalid individual records do not stop other records from being written. Review warnings before replacing `docs-data/api.json`; warnings are not evidence that uncertain information should be guessed.

## Quality checks and build

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run build` produces a static export in `out/`, suitable for static hosting. Set `NEXT_PUBLIC_BASE_PATH` when the site is hosted below a domain root, and set `NEXT_PUBLIC_SITE_URL` to the complete public URL so generated sitemap and robots URLs are correct.

## GitHub Pages deployment

The `Deploy to GitHub Pages` workflow validates, builds, and deploys the static export whenever a commit reaches `main`. It also supports manual runs from the Actions tab. The workflow derives the repository subpath automatically, including the special root path used by repositories named `<owner>.github.io`.

In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the source. No deployment secret is required; the workflow uses GitHub's short-lived Pages identity token and declares only the permissions needed to read the repository and publish the site.

Pull requests do not deploy. Run the quality checks locally before merging because a failed lint, typecheck, test, or build step prevents deployment.

## Contributing

Keep original API names, types, namespaces, side designations, Chinese descriptions, and source attribution exact. Add English translations alongside Chinese text rather than replacing it. Unknown fields should remain unknown. Parser changes should include a representative fixture or test and should surface recoverable problems as contextual warnings.

Avoid unrelated refactors and unnecessary dependencies. Before opening a pull request, run all four quality commands above and explain any importer warnings or source-data limitations.
