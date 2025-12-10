# Technical Documentation

## Assignment 1 — Foundation

**Goal:** deliver a static yet polished personal portfolio.

### Highlights
- Semantic structure with Hero, About, Projects, and Contact sections.
- Responsive grid and card layout using CSS flexbox/grid.
- Sticky header, smooth scrolling, and auto-updating footer year.
- Theme toggle (dark/light) persisted via `localStorage`.
- Contact form with browser validation (required fields, email pattern).
- Performance basics: lightweight assets, lazy-loaded images, concise CSS.

### Files
- `index.html` — baseline markup and sections.
- `css/styles.css` — global design system (colors, spacing, typography).
- `js/script.js` — footer year + theme toggle helpers.

---

## Assignment 2 — Interactive Enhancements

**Goal:** make the portfolio dynamic with JavaScript-driven UX.

### Dynamic Content
- Project filter buttons, live search, collapsible “More details,” and empty-state message.
- Personalized greeting based on time of day and stored visitor name.

### Data Handling
- Contact form stores the visitor’s name in `localStorage` for reuse in greetings.
- Quote module uses the Quotable API with spinner, retry button, and error state logging.

### Animation & Feedback
- Hover states and collapsible transitions driven by CSS.
- Spinner honors `prefers-reduced-motion`.
- Toast notifications communicate form success/errors.

### Accessibility
- ARIA attributes (`aria-pressed`, `aria-expanded`, `aria-controls`, `aria-live`) on interactive elements.
- Keyboard-focus styles and logical DOM order for navigation.

### Files Modified
| File | Key Changes |
|------|-------------|
| `index.html` | Added greeting, quote, filters/search, collapsible sections, empty state |
| `css/styles.css` | Added transitions, spinner styles, alerts, motion preferences |
| `js/script.js` | Implemented filters, API calls, collapsible logic, toast system |
| `README.md` | Documented new features and instructions |

### Testing
- Manual verification on Chrome, Firefox, Edge.
- Disabled JavaScript to confirm graceful degradation of static content.

---

## Assignment 3 — Advanced Functionality

**Goal:** integrate a real external API, expand state management, and document/testing upgrades.

### GitHub API Integration
- **Endpoint:** `https://api.github.com/users/MoayedAljaddawi24/repos?sort=updated&per_page=20`
- Filters out forks, maps essential fields, and limits display to the latest six repositories.
- **Controls:** sort dropdown (recent vs. stars), refresh button, retry button shown on error.
- **Status UX:** spinner + status text (aria-live), cached vs. live messaging, error color state.
- **Caching:** results stored in `sessionStorage` (10‑minute TTL) to reduce API calls and keep data available offline/rate-limited.
- **Rendering:** responsive card grid showing repo name, description fallback, language, star count, last updated date, and CTA link.

### Favorites & Complex State Logic
- Added a **favorite** button to each project card and a **“Favorites only”** toggle layered onto existing filters/search.
- Favorite ids persist in `localStorage` (`favorite_projects_v1`) and hydrate on load to sync button state, badge count, and filter behavior.
- Filtering now evaluates three axes simultaneously: category buttons, live search query, and favorites-only mode.
- Empty-state messaging adapts based on whether the favorites filter is active, guiding the user to star items or broaden the view.

### Project Sorting
- Introduced a **Sort projects** dropdown with `recent` (default) and `alpha` options.
- Uses `data-date` metadata plus card titles to reorder DOM nodes without losing event bindings.
- Sorting runs alongside filters/search/favorites, ensuring complex state combinations remain predictable.

### AI Career Coach Feature
- Added `assets/data/ai-insights.json`, a set of curated action plans authored with AI tools (ChatGPT) and stored locally.
- UI contains selects for **focus** (showcase, network, learn) and **time** (short/long), plus a CTA button.
- JavaScript fetches the JSON dataset at runtime, filters it by the visitor's selections, and renders a title, description, and actionable list.
- Includes `aria-live` output messaging plus fallback states for validation errors or failed fetches (e.g., offline mode).

### Performance & Accessibility
- Added a `Skip to main content` link before the header for screen-reader/keyboard navigation.
- Project images include `loading="lazy"` and `decoding="async"` attributes to defer work until needed.
- Implemented `@media (prefers-reduced-motion: reduce)` to effectively disable transitions/animations (including the spinner) for motion-sensitive users.

### UI & State Tweaks
- Navigation now links to the GitHub section for quick access.
- Utility classes introduced for shared patterns (`.btn-sm`, `.visually-hidden`, `.muted`, `.eyebrow`, `.spinner`).
- New `.favorites-toggle` control styling + `.favorite-btn` state styles preserve consistency with existing tokens.
- `.sort-select` shares the same tokenized styling as other inputs so the dropdown is legible in both themes.
- Styles respect the existing design tokens (light/dark themes, spacing, radii).
- Status text toggles an `.error` modifier to improve contrast for failure messages.

### Files Modified
| File | Purpose |
|------|---------|
| `index.html` | Added GitHub section markup, nav anchor, and control elements |
| `css/styles.css` | Added utility classes, spinner animation, GitHub + favorites + sorting styles |
| `js/script.js` | Implemented GitHub fetch/caching/sorting logic, retry handling, favorites persistence/filtering, project sorting, and AI coach |
| `assets/data/ai-insights.json` | AI-authored action plans consumed by the coach feature |
| `README.md` | Documented Assignment 3 objective, features, and manual testing plan |
| `docs/testing-plan.md` | Manual verification steps for API, sorting, favorites, AI coach, accessibility, and performance features |
| `README.md` — Deployment section | Added GitHub Pages instructions and post-deploy verification checklist |

### Testing & Validation
1. Load the page with DevTools console open — observe spinner and successful card render.
2. Toggle sort dropdown to ensure reorder logic works.
3. Click Refresh and watch the Network tab for the GitHub API call.
4. Go offline (DevTools) and click Refresh — verify cached data remains and Retry button appears.
5. Return online, click Retry — confirm new data appears and status updates accordingly.
6. Favorite/unfavorite projects, enable “Favorites only,” and reload to verify persistence + layered filtering.
7. Change the Sort dropdown between “Recently updated” and “Alphabetical” while other filters/search states are active to confirm ordering holds.
8. Tab once to reach the skip link, scroll to ensure images lazy-load, and toggle “Reduce Motion” in the OS/browser to confirm animations stop.
9. Trigger the AI Career Coach with different selections, and simulate a blocked dataset request to test the fallback messaging.
10. Follow the scenarios captured in `docs/testing-plan.md` to keep consistent evidence for submission.
11. After deploying to GitHub Pages, repeat the smoke tests on `https://MoayedAljaddawi24.github.io/assignment-3/` to ensure parity with local results.

**Result:** The Assignment 3 layer demonstrates real API integration, stateful controls, resilient UX, and updated documentation, satisfying the next stage of the portfolio project.
