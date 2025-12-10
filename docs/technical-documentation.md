# Technical Documentation

This document summarizes the implementation across all four assignment phases and highlights the final polish applied in Assignment 4.

## Assignment 1 - Foundation
- Semantic structure for Hero, About, Projects, and Contact sections.
- Responsive layout with CSS grid/flex, sticky header, smooth anchor scrolling, and a theme toggle persisted in `localStorage`.
- Contact form with browser validation and an auto-updating footer year.
- Lazy-loaded images and lean styles for quick loads.

## Assignment 2 - Interactive Layer
- Project filters, live search, collapsible "More details" panels, and empty-state messaging.
- Greeting that uses the stored visitor name; quote module with spinner, retry button, and error handling.
- Toast feedback on form submit and reduced-motion support for spinners/transitions.
- ARIA coverage: `aria-pressed`, `aria-expanded`, `aria-controls`, `aria-live`, and focus-friendly nav patterns.

## Assignment 3 - Advanced Features
- GitHub Activity section for `@MoayedAljaddawi24` with sorting (recent or stars), manual refresh, retry, and sessionStorage caching (10-minute TTL). Cards show language, stars, updated date, description, and a CTA.
- Favorites toggle layered on filters/search; persisted in `localStorage` and reflected in button state + badge count.
- Project sorting dropdown (recent/alphabetical) that reorders DOM nodes without dropping event listeners.
- AI Career Coach that loads `assets/data/ai-insights.json`, filters by goal/time, and renders tips with status/fallback messaging.
- Accessibility/performance extras: skip link, lazy images, reduced-motion handling, shared utility classes.

## Assignment 4 - Final Polish
- Removed corrupted characters and replaced icons/text with ASCII-friendly copy for consistent rendering.
- Normalized status messages (loading/retry), placeholders, and option labels to keep aria-live messaging clear.
- Swapped star icons to entity-based characters (`\u2605`/`\u2606`) to avoid external assets while keeping recognizable affordances.
- Rewrote README and documentation for deployment readiness and testing clarity.
- Verified light/dark theme toggle, menu toggle, and project/GitHub states after the text cleanup.

## Architecture Notes
- **Storage**: `localStorage` for theme, greeting name, favorites; `sessionStorage` for cached GitHub responses.
- **Networking**: Fetch API calls to GitHub REST (repos endpoint) and DummyJSON quotes with defensive error handling.
- **Accessibility**: aria-live regions for status text, aria-pressed for toggles, aria-expanded/controls for collapsibles, and a skip link for keyboard users.
- **Performance**: static assets only, lazy images, small CSS/JS footprint, caching for GitHub data, and reduced-motion guardrails.

## Files of Interest
- `index.html` - semantic structure and interactive controls for all sections.
- `css/styles.css` - tokens, layout, theming, utility classes, and component styling.
- `js/script.js` - theme/menu toggles, greeting/quote, filters/search/favorites/sort, GitHub fetch + cache, AI coach, and form feedback.
- `assets/data/ai-insights.json` - local dataset for the AI Career Coach.
- `docs/testing-plan.md` - detailed manual QA scenarios.
