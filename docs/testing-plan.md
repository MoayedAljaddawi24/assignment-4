# Testing Plan — Assignment 3

This document captures the manual checks performed for the advanced features introduced in Assignment 3.

| # | Area | Scenario | Steps | Expected Result |
|---|------|----------|-------|-----------------|
| 1 | GitHub API | Successful fetch | Load `index.html`, scroll to **Latest GitHub Activity**. | Spinner and “Loading repositories…” message show, then 1–6 cards populate with repo details. |
| 2 | GitHub API | Retry on failure | Disable network (DevTools), click **Refresh**. Re-enable and click **Retry**. | Status changes to cached/error, Retry button becomes visible. After reconnection, Retry fetches fresh data and updates status text. |
| 3 | Project sorting | Alphabetical order | In the Projects section, change **Sort projects** to *Alphabetical*. | Cards reorder A→Z; toggling back to *Recently updated* restores date-based order. |
| 4 | Favorites filter | Persistence | Star both projects, toggle **Favorites only**, refresh the page. | Only starred cards show while toggle is on; stars remain filled after refresh. |
| 5 | Search + filters combo | Layered logic | Set Category to “JavaScript”, enter “hub” in search, keep Favorites off. | Only the KFUPM card remains visible; empty state stays hidden. |
| 6 | Skip link | Keyboard navigation | Press `Tab` immediately after loading the page, press `Enter`. | Focus lands on “Skip to main content”, then moves to `<main>`. |
| 7 | Reduced motion | Accessibility | Enable “Reduce motion” in OS (or emulate in DevTools) and reload. | Animations/spinners stop, ensuring no motion-heavy transitions. |
| 8 | AI Career Coach | Dynamic tips | Select a focus/time combo, click **Generate tip**. Block `assets/data/ai-insights.json` to test fallback. | Tip headline/paragraph/actions update; when blocked, a friendly error message appears. |
| 9 | Lazy images | Performance | Open DevTools Network tab (Slow 3G), reload and watch image requests while scrolling to Projects. | Project images start downloading only when near viewport, confirming lazy loading. |
| 10 | Contact form | Validation + toast | Submit empty form, then fill valid data and submit. | Browser validation prevents empty submit; with valid data a success toast appears and form resets. |

