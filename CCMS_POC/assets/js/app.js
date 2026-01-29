(function () {
  const container = document.getElementById('container');
  const sep = document.getElementById('separator');
  const right = document.getElementById('right-pane');

  // Draggable separator
  let isDragging = false;
  sep.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.style.cursor = 'col-resize';
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const min = 220;
    const max = Math.min(600, window.innerWidth - 400);
    const newW = Math.max(min, Math.min(max, e.clientX));
    container.style.gridTemplateColumns = `${newW}px 6px 1fr`;
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
  });

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[s]));
  }

  function renderDoc(json) {
    const title = `<h1>${escapeHtml(json.title || '')}</h1>`;
    const blocks = (json.snippets || []).map(s => `
      <section class="snippet" id="${escapeHtml(s.snippetID || '')}">
        <h2>${escapeHtml(s.title || '')}</h2>
        <div class="snippet-body">${s.html || ''}</div>
      </section>
    `).join('\n');
    right.innerHTML = `<article class="doc-version">${title}${blocks}</article>`;
    right.scrollTop = 0;
  }

  async function onVersionClick(e) {
    const a = e.target.closest('a.version-link');
    if (!a) return;
    e.preventDefault();
    const url = a.getAttribute('data-json');
    right.innerHTML = `<p>Loading…</p>`;
    try {
      const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const json = await resp.json();
      renderDoc(json);
      history.replaceState(null, '', a.href);
    } catch (err) {
      right.innerHTML = `<p style="color:#f87171">Failed to load. ${String(err)}</p>`;
    }
  }

  document.addEventListener('click', onVersionClick);
})();
