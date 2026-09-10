# Project thumbnails

Drop an image here to use it as a project's card thumbnail. No JSON changes needed.

- File name must match the project's `id` in `src/Data/index.json` (for JSON projects)
  or the repo name (for GitHub projects). Matching is case-insensitive.
- Supported: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`
- Recommended size: **1280 x 720** (16:9). Cards crop to 16:9 with `object-cover`.

Examples:

```
src/assets/thumbnails/orqestra.png            -> project id "orqestra"
src/assets/thumbnails/shopai-voice-agent.jpg  -> project id "shopai-voice-agent"
src/assets/thumbnails/react-url-shortener.png -> GitHub repo "react-url-shortener"
```

Resolution order for a card image:

1. Local file in this folder
2. `poster.src` from `index.json` (JSON projects) or `logo.png` in the repo (GitHub projects)
3. GitHub's generated social preview for the repo
4. A generated placeholder with the project's initials
