# Personal Portfolio — Assignments 1‑3

A personal, responsive portfolio website developed across three course assignments.  
This README covers the **foundation (Assignment 1)**, the **interactive layer (Assignment 2)**, and the **advanced/API enhancements (Assignment 3)**.

---

## Assignment 1 — Foundation

### Objective
Build a clean, accessible, and responsive personal portfolio using **HTML**, **CSS**, and **vanilla JavaScript**.

### Features
- Required sections: **Hero**, **About**, **Projects**, **Contact**
- Responsive grid and card layout
- Sticky header with smooth scrolling
- **Dark/Light theme toggle** (stored in `localStorage`)
- Contact form with basic validation
- Auto-updating year in the footer
- Lazy-loaded images and basic SEO meta description

---

## Assignment 2 — Interactive Features

### Objective
Enhance the Assignment 1 portfolio with dynamic content, data handling, animations, and AI-assisted improvements.

### Highlights
- **Dynamic content**: Project filters, live search, collapsible “More details,” and personalized greeting
- **Data handling**: LocalStorage-powered greeting + contact form persistence, Quotable API quote with loading/error/retry states
- **Animations**: Smooth card/section transitions, spinner, and `prefers-reduced-motion` support
- **Error handling & feedback**: Empty-state messaging, toast notifications, resilient API handling
- **Accessibility & UX**: ARIA attributes (`aria-pressed`, `aria-expanded`, `aria-live`), keyboard-friendly interactions, improved color contrast
- **AI assistance**: ChatGPT + GitHub Copilot for ideation and refactoring (documented in `docs/ai-usage-report.md`)

### Technologies Used
- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- **LocalStorage API**
- **Fetch API**
- **ARIA accessibility patterns**
- **AI tools**: ChatGPT (GPT‑5), GitHub Copilot

### File Structure
```
assignment-3/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── data/
│       └── ai-insights.json
└── docs/
    ├── ai-usage-report.md
    ├── testing-plan.md
    └── technical-documentation.md
```

---

## Assignment 3 — Advanced Functionality

### Objective
Show mastery of external integrations, richer UI state, and improved documentation/testing on top of the Assignment 2 baseline.

### New Features

#### Live GitHub Activity Feed
- Dedicated “Latest GitHub Activity” section pulls repositories from **@MoayedAljaddawi24** via the GitHub REST API.
- Supports **sorting** (recently updated vs. most stars), manual **refresh**, and **retry** controls.
- Resilient UX: cached results (`sessionStorage`, 10‑minute window), loading spinner, friendly status text, and retry button for failures.
- Repository cards display description, language, star count, last updated date, and a CTA to open the repo in a new tab.

#### Favorites-Driven Project Browser
- Each portfolio project can be marked as a **favorite** via a toggle button stored in `localStorage`.
- The new **“Favorites only”** control layers onto existing filters/search, demonstrating richer state + multi-step logic.
- Favorite buttons expose accessible state (`aria-pressed`, icon swap), and the empty-state messaging adapts based on whether the filter is active.

#### Intelligent Project Sorting
- Added a **“Sort projects”** dropdown that reorders cards without a full reload.
- Options include **Recently updated** (based on `data-date`) and **Alphabetical** (card title).
- Sorting works alongside filters, search, and favorites, showcasing combined state management.

#### AI Career Coach
- New section powered by AI-generated insights curated during development.
- Visitors pick a focus (showcase, network, learn) and available time to receive tailored action plans sourced from `assets/data/ai-insights.json`.
- Provides multi-step guidance (headline + bullet actions) and graceful fallbacks if the dataset cannot be loaded.

#### State & UX Enhancements
- Global navigation now links to the GitHub section for faster access.
- Project favorites persist between visits, and the favorites-only toggle combines with filters/search for complex browsing logic.
- Controls maintain their state; cached responses keep the UI usable while offline or rate-limited.
- Shared utility styles (`.btn-sm`, `.visually-hidden`, `.muted`, `.eyebrow`, `.spinner`) keep the new section consistent with the rest of the site.

#### Performance & Accessibility Upgrades
- Added a prominent **Skip to main content** link for keyboard users.
- Project imagery now uses `loading="lazy"` + `decoding="async"` to reduce LCP on scroll.
- A `prefers-reduced-motion` media query disables transitions/spinners for motion-sensitive visitors.

### Testing the GitHub Integration
1. Open `index.html` in a modern browser with DevTools console visible.
2. Scroll to **Latest GitHub Activity**:
   - Confirm the spinner and “Loading repositories…” status appear, then repository cards render.
   - Switch the sort dropdown to “Most stars” and verify the order updates.
   - Click **Refresh** and monitor the Network tab for the GitHub API request.
3. Disable your network (or use DevTools offline mode) and press **Refresh**:
   - Existing cards stay visible; status indicates cached usage or shows an error, and the **Retry** button appears.
4. Re-enable the network, click **Retry**, and confirm fresh data loads without reloading the page.

> Tip: If the GitHub API rate-limits you, wait a minute or supply a personal token via the console by setting `sessionStorage.githubToken`.

### Testing the Favorites Workflow
1. Scroll to **Projects** and click the star button on a card — it should fill and the badge count increments.
2. Toggle **Favorites only**:
   - Only starred projects remain visible, and the empty-state text updates if none match.
3. Refresh the page:
   - Favorited projects remain starred (data persisted in `localStorage`).
4. Remove a favorite; verify it disappears while “Favorites only” is active, demonstrating dynamic filtering.

### Testing Project Sorting
1. With multiple projects displayed, open the **Sort projects** dropdown.
2. Choose **Alphabetical** — cards should reorder immediately (A→Z by title).
3. Switch back to **Recently updated** — cards reorder based on their `data-date` metadata.
4. Apply category filters, a search term, and/or favorites-only; verify the sort order respects those constraints while staying consistent.

### Testing the AI Career Coach
1. Scroll to **AI Career Coach**, pick a focus + time, and click **Generate tip**.
2. Confirm the tip headline, paragraph, and bullet actions update dynamically.
3. Change the selections multiple times to see varied AI insights.
4. Temporarily block `assets/data/ai-insights.json` (DevTools > Network > Block URL) to ensure the UI shows a graceful error.

### Testing Accessibility & Performance Tweaks
1. Press `Tab` immediately after loading the page — focus should jump to the **Skip to main content** link, and pressing `Enter` should move focus into `<main>`.
2. Open DevTools > Performance or Network: scroll the Projects section and confirm lazy-loaded images only request when near viewport.
3. In your OS/browser accessibility settings, enable **Reduce Motion** (or emulate via DevTools) and reload — spinners and transitions should be removed.

---

## Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/MoayedAljaddawi24/assignment-3.git
   cd assignment-3
   ```
2. Open `index.html` directly in your browser or use a local server (e.g., VS Code Live Server).

---

## Documentation
- `docs/technical-documentation.md` — implementation details per assignment phase
- `docs/testing-plan.md` — manual test cases for Assignment 3 features
- `docs/ai-usage-report.md` — how AI tools supported the work and review steps taken

---

## Projects
- **Event Ticket Reservation System** — browse events, reserve tickets, view bookings.
- **KFUPM Event Hub (In Progress)** — discover, register for, and manage university events.

---

## Deployment

This project is designed to run as a static site, so GitHub Pages is the recommended hosting option.

### GitHub Pages Steps
1. Push the repository to GitHub (e.g., `MoayedAljaddawi24/assignment-3`).
2. In the repo settings, open **Pages** → set **Source** to `main` and **Branch** to `/root`.
3. Wait for the build banner to show, then visit the published URL:  
   `https://MoayedAljaddawi24.github.io/assignment-3/`
4. Smoke test using the [Testing Plan](docs/testing-plan.md) to confirm:  
   - GitHub feed loads correctly.  
   - Favorites/filter/sort interactions work.  
   - AI Career Coach fetches tips (or shows fallback).  
   - Skip link/lazy images behave the same as locally.

> If deploying elsewhere (Netlify, Vercel, etc.), point the root to `index.html` and ensure `assets/` is served statically.
