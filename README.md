# Personal Portfolio - Assignment 4

A polished single-page portfolio built across the course assignments. This final release delivers a production-ready experience with responsive design, interactive project browsing, API integration, and clear documentation.

## Features
- Responsive layout with sticky navigation, skip link, smooth anchors, and a light/dark theme toggle persisted in localStorage.
- Project browser with category filters, search, sort (recent or alphabetical), favorites stored in localStorage, and helpful empty-state messaging.
- GitHub activity section for @MoayedAljaddawi24 with sorting, refresh/retry controls, spinner/status text, and sessionStorage caching (10 minutes).
- AI Career Coach backed by the local dataset in `assets/data/ai-insights.json`; filters by goal and time, with graceful fallbacks.
- Hero extras: personalized greeting from the saved name and a daily quote with spinner plus retry.
- Contact form validation with toast feedback, lazy-loaded images, reduced-motion support, and consistent button/input styles.

## Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/MoayedAljaddawi24/assignment-4.git
   cd assignment-4
   ```
2. Open `index.html` in your browser, or run a lightweight server (`python -m http.server 8000` or `npx serve .`) and visit the printed URL.
3. No build step is required. The GitHub feed calls the public GitHub API; the quote module calls `https://dummyjson.com/quotes/random`.

## File Structure
assignment-4/
- index.html
- css/
  - styles.css
- js/
  - script.js
- assets/
  - images/
  - data/
    - ai-insights.json
- docs/
  - ai-usage-report.md
  - technical-documentation.md
  - testing-plan.md

## Testing
- Follow `docs/testing-plan.md` for the full checklist (GitHub feed, favorites/search/sort, AI coach, accessibility, and form validation).
- Quick smoke test: load the page, toggle the theme, star/unstar a project, refresh the GitHub feed, and generate an AI tip.

## Documentation
- `docs/technical-documentation.md` - implementation details by assignment phase and architecture notes.
- `docs/testing-plan.md` - manual validation scenarios.
- `docs/ai-usage-report.md` - prompts, outputs, edits, and lessons learned from AI assistance.

## Deployment
- Push to a public repo and enable GitHub Pages (root folder). The site is static; no server setup is required.
- After publishing, rerun the smoke tests above to confirm parity with local behavior.

## AI Usage Summary
AI tools (ChatGPT and GitHub Copilot) were used for ideation, copy editing, and small refactors. Detailed prompts, outputs, and adjustments are logged in `docs/ai-usage-report.md`.
