
/* ============================
   Base helpers (year, theme)
   ============================ */

// Footer year
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// === Theme toggle (robust: works with [data-theme] or .dark/.light) ===
(function themeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const KEY = 'theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine current theme from storage, classes, data-attr, or system
  const stored = localStorage.getItem(KEY);
  let current =
    stored ||
    (document.documentElement.classList.contains('dark') ? 'dark' :
     document.documentElement.classList.contains('light') ? 'light' :
     document.documentElement.dataset.theme || (prefersDark ? 'dark' : 'light'));

  apply(current);

  btn.addEventListener('click', () => {
    current = current === 'dark' ? 'light' : 'dark';
    apply(current);
    localStorage.setItem(KEY, current);
  });

  function apply(mode) {
    // Keep both patterns in sync so whichever your CSS uses will work
    document.documentElement.dataset.theme = mode;         // [data-theme="dark|light"]
    document.documentElement.classList.toggle('dark',  mode === 'dark');   // .dark
    document.documentElement.classList.toggle('light', mode === 'light');  // .light
  }
})();


// Mobile menu toggle (if you style it)
(function mobileMenu() {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open', !expanded);
  });
})();

/* =========================================
   Assignment 2 features (interactive)
   ========================================= */

// 1) Personalized greeting (time of day + stored name)
(function greetingFeature() {
  const el = document.getElementById('personalGreeting');
  if (!el) return;

  const h = new Date().getHours();
  const part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const saved = localStorage.getItem('username');
  el.textContent = saved ? `${part}, ${saved}!` : `${part}!`;
})();

// 2) Quote API with resilient fallback
(function quoteFeature() {
  const btn = document.getElementById("retryQuote");
  const text = document.querySelector("#dailyQuote .quote-text");
  const spinner = document.querySelector("#dailyQuote .spinner");

  let authorEl = document.querySelector("#dailyQuote .quote-author");
  if (!authorEl) {
    authorEl = document.createElement("span");
    authorEl.className = "quote-author";
    document.querySelector("#dailyQuote").appendChild(authorEl);
  }

  async function loadQuote() {
    spinner.hidden = false;
    btn.hidden = true;
    text.textContent = "Loading quote…";
    authorEl.textContent = "";

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();

      text.textContent = `“${data.quote || data.content}”`;
      authorEl.textContent = `${data.author}`;
      authorEl.style.display = "block"; 
      authorEl.style.marginTop = "0.25rem";
    } catch (err) {
      text.textContent = "Failed to load quote.";
      authorEl.textContent = "";
      console.error("Error fetching quote:", err);
      btn.hidden = false;
    } finally {
      spinner.hidden = true;
    }
  }

  btn.addEventListener("click", loadQuote);
  loadQuote();
})();


// 3) Project filters + live search + empty state
(function projectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = Array.from(document.querySelectorAll('.projects-grid .card'));
  const grid = document.querySelector('.projects-grid');
  const search = document.getElementById('projectSearch');
  const empty = document.getElementById('projectsEmpty');
  const favoritesToggle = document.getElementById('favoritesOnly');
  const favoritesCount = document.getElementById('favoritesCount');
  const sortSelect = document.getElementById('projectSort');
  if (!cards.length) return;

  const FAVORITES_KEY = 'favorite_projects_v1';
  let favorites = loadFavorites();
  let activeCategory = 'all';
  let query = '';
  let favoritesOnly = !!favoritesToggle?.checked;

  function apply() {
    let visible = 0;

    cards.forEach(card => {
      const tags = (card.dataset.tags || '').toLowerCase().split(/\s+/);
      const text = card.textContent.toLowerCase();
      const id = card.dataset.id;
      const isFavorite = id ? favorites.has(id) : false;

      const matchCat = activeCategory === 'all' || tags.includes(activeCategory);
      const matchQuery = !query || text.includes(query);
      const matchFavorite = !favoritesOnly || isFavorite;

      const show = matchCat && matchQuery && matchFavorite;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (empty) {
      empty.hidden = visible !== 0;
      if (favoritesOnly) {
        empty.textContent = 'No favorite projects yet. Add some or turn off the toggle.';
      } else {
        empty.textContent = 'No projects found. Try a different filter or search.';
      }
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      activeCategory = btn.dataset.category || 'all';
      apply();
    });
  });

  search?.addEventListener('input', (e) => {
    query = e.target.value.trim().toLowerCase();
    apply();
  });

  sortSelect?.addEventListener('change', () => {
    sortCards();
    apply();
  });

  favoritesToggle?.addEventListener('change', (e) => {
    favoritesOnly = e.target.checked;
    apply();
  });

  function attachFavoriteButtons() {
    cards.forEach(card => {
      const btn = card.querySelector('.favorite-btn');
      const id = card.dataset.id;
      if (!btn || !id) return;

      btn.addEventListener('click', () => {
        if (favorites.has(id)) {
          favorites.delete(id);
        } else {
          favorites.add(id);
        }
        persistFavorites();
        updateFavoriteUI();
        apply();
      });
    });
  }

  function updateFavoriteUI() {
    cards.forEach(card => {
      const btn = card.querySelector('.favorite-btn');
      const id = card.dataset.id;
      if (!btn || !id) return;
      const isFavorite = favorites.has(id);
      btn.setAttribute('aria-pressed', String(isFavorite));
      const icon = btn.querySelector('[aria-hidden="true"]');
      if (icon) icon.textContent = isFavorite ? '★' : '☆';
    });
    if (favoritesCount) favoritesCount.textContent = String(favorites.size);
  }

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return new Set();
      return new Set(parsed);
    } catch {
      return new Set();
    }
  }

  function persistFavorites() {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (err) {
      console.warn('Unable to save favorites:', err);
    }
  }

  function sortCards() {
    if (!grid) return;
    const mode = sortSelect?.value || 'recent';
    const sorted = [...cards].sort((a, b) => compareCards(a, b, mode));
    sorted.forEach(card => grid.appendChild(card));
  }

  function compareCards(a, b, mode) {
    if (mode === 'alpha') {
      const nameA = a.querySelector('h3')?.textContent.trim() || '';
      const nameB = b.querySelector('h3')?.textContent.trim() || '';
      return nameA.localeCompare(nameB);
    }
    const dateA = new Date(a.dataset.date || 0);
    const dateB = new Date(b.dataset.date || 0);
    return dateB - dateA;
  }

  sortCards();
  attachFavoriteButtons();
  updateFavoriteUI();
  apply();
})();

// 7) Assignment 3 - AI coach suggestions sourced from AI-written dataset
(function aiCoach() {
  const form = document.getElementById('coachForm');
  const goalSelect = document.getElementById('coachGoal');
  const timeSelect = document.getElementById('coachTime');
  const output = document.getElementById('coachOutput');
  if (!form || !goalSelect || !timeSelect || !output) return;

  let insights = [];
  let loadError = false;

  loadInsights();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const goal = goalSelect.value;
    const time = timeSelect.value;
    if (!goal || !time) {
      showMessage('Please choose both a focus and time commitment.');
      return;
    }

    if (loadError) {
      showMessage('AI tips are unavailable right now. Please try again later.');
      return;
    }

    const filtered = insights.filter(item =>
      (item.goal === goal || item.goal === 'any') &&
      (item.time === time || item.time === 'any')
    );

    const tip = filtered.length
      ? filtered[Math.floor(Math.random() * filtered.length)]
      : null;

    if (!tip) {
      showMessage('No curated plan yet for that combo. Try another option!');
      return;
    }

    renderTip(tip);
  });

  function renderTip(tip) {
    const actionsList = tip.actions?.map(action => `<li>${action}</li>`).join('') || '';
    output.innerHTML = `
      <h3>${tip.title}</h3>
      <p>${tip.tip}</p>
      ${actionsList ? `<ul>${actionsList}</ul>` : ''}
    `;
  }

  function showMessage(message) {
    output.innerHTML = `<p class="muted">${message}</p>`;
  }

  async function loadInsights() {
    try {
      const response = await fetch('assets/data/ai-insights.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const data = await response.json();
      insights = Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Failed to load AI insights', err);
      loadError = true;
      showMessage('Unable to load AI tips. Check your connection and refresh.');
    }
  }
})();
// 4) Collapsible project "More details"
(function collapsibleDetails() {
  document.querySelectorAll('.details-toggle').forEach(btn => {
    const id = btn.getAttribute('aria-controls');
    const panel = id ? document.getElementById(id) : null;
    if (!panel) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));

      if (expanded) {
        panel.setAttribute('aria-hidden', 'true');
        panel.hidden = true;
      } else {
        panel.hidden = false;
        // allow CSS transition
        requestAnimationFrame(() => panel.setAttribute('aria-hidden', 'false'));
      }
    });
  });
})();

// 5) Contact form: save name + toast feedback
(function enhanceForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
      const name = (document.getElementById('name')?.value || '').trim();
      if (name) localStorage.setItem('username', name);
      toast('Message sent! (Demo — no data is transmitted)', 'success');
      form.reset();
    } else {
      form.reportValidity();
      toast('Please complete all required fields correctly.', 'error');
    }
  });

  function toast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = `alert ${type}`;
    el.role = 'status';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
})();

// 6) Assignment 3 - GitHub API integration with caching + sorting
(function githubIntegration() {
  const grid = document.getElementById('githubRepos');
  const statusWrap = document.getElementById('githubStatus');
  const statusText = statusWrap?.querySelector('.status-text');
  const spinner = statusWrap?.querySelector('.spinner');
  const retryBtn = document.getElementById('githubRetry');
  const refreshBtn = document.getElementById('githubRefresh');
  const sortSelect = document.getElementById('githubSort');
  if (!grid || !statusWrap || !statusText) return;

  const CACHE_KEY = 'github_repos_v1';
  const CACHE_WINDOW = 1000 * 60 * 10; // 10 minutes
  const DISPLAY_COUNT = 6;
  const ENDPOINT = 'https://api.github.com/users/MoayedAljaddawi24/repos?sort=updated&per_page=20';

  let repos = [];

  init();

  function init() {
    attachEvents();
    const cached = readCache();
    if (cached) {
      repos = cached.data;
      spinner && (spinner.hidden = true);
      setStatus(`Showing cached repositories from ${timeAgo(cached.fetchedAt)} ago.`);
      render();
    } else {
      fetchRepos();
    }
  }

  function attachEvents() {
    sortSelect?.addEventListener('change', render);
    refreshBtn?.addEventListener('click', () => fetchRepos(true));
    retryBtn?.addEventListener('click', () => fetchRepos(true));
  }

  async function fetchRepos(force = false) {
    if (!force) {
      const cached = readCache();
      if (cached) {
        repos = cached.data;
        spinner && (spinner.hidden = true);
        setStatus(`Showing cached repositories from ${timeAgo(cached.fetchedAt)} ago.`);
        render();
        return;
      }
    }

    spinner && (spinner.hidden = false);
    setStatus('Loading repositories…');
    retryBtn && (retryBtn.hidden = true);

    try {
      const res = await fetch(ENDPOINT, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) throw new Error(`GitHub HTTP ${res.status}`);
      const data = await res.json();
      repos = (Array.isArray(data) ? data : [])
        .filter(repo => !repo.fork)
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          visibility: repo.visibility,
        }));
      writeCache(repos);
      render();
      setStatus('Live data fetched just now.');
    } catch (err) {
      console.error('GitHub fetch failed:', err);
      spinner && (spinner.hidden = true);
      if (!repos.length) {
        setStatus('Could not load repositories. Try again later.', true);
        retryBtn && (retryBtn.hidden = false);
      } else {
        setStatus('Using cached repositories (live update failed).', true);
      }
    } finally {
      spinner && (spinner.hidden = true);
    }
  }

  function render() {
    if (!repos.length) {
      grid.innerHTML = '<p class="empty">No repositories to display yet.</p>';
      return;
    }

    const sort = sortSelect?.value || 'updated';
    const sorted = [...repos].sort((a, b) => {
      if (sort === 'stars') return b.stars - a.stars;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    grid.innerHTML = '';
    sorted.slice(0, DISPLAY_COUNT).forEach(repo => {
      const article = document.createElement('article');
      article.className = 'card repo-card';

      const name = document.createElement('h3');
      name.textContent = repo.name;
      article.appendChild(name);

      const desc = document.createElement('p');
      desc.textContent = repo.description || 'No description provided.';
      article.appendChild(desc);

      const meta = document.createElement('div');
      meta.className = 'repo-meta';
      meta.innerHTML = `
        <span>${repo.language || 'Misc'}</span>
        <span>★ ${repo.stars}</span>
        <span>Updated ${new Date(repo.updatedAt).toLocaleDateString()}</span>
      `;
      article.appendChild(meta);

      const link = document.createElement('a');
      link.href = repo.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'btn btn-sm';
      link.textContent = 'View on GitHub';
      article.appendChild(link);

      grid.appendChild(article);
    });
  }

  function setStatus(message, isError = false) {
    if (statusText) statusText.textContent = message;
    statusWrap?.classList.toggle('error', !!isError);
  }

  function readCache() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed?.data || Date.now() - parsed.fetchedAt > CACHE_WINDOW) {
        sessionStorage.removeItem(CACHE_KEY);
        return null;
      }
      return parsed;
    } catch {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
  }

  function writeCache(data) {
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ fetchedAt: Date.now(), data })
      );
    } catch (err) {
      console.warn('Unable to cache GitHub repos:', err);
    }
  }

  function timeAgo(timestamp) {
    const diff = Date.now() - timestamp;
    const mins = Math.round(diff / 60000);
    if (mins < 1) return 'moments';
    if (mins === 1) return '1 minute';
    if (mins < 60) return `${mins} minutes`;
    const hours = Math.round(mins / 60);
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
})();
