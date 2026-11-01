(() => {
  const P = window.FREELINE_PROJECTS || [];
  const CATS = window.FREELINE_CATEGORIES || {};
  const STATUS = window.FREELINE_STATUS || {};
  const CFG = window.FREELINE_CONFIG || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = s => document.querySelector(s);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shot = (p, t) => `assets/shots/${p.id}-${t}.webp`;

  const year = new Date().getFullYear();
  $('#year').textContent = year;
  $('#year2').textContent = year;

  // Stats — derived from the catalogue, never hard-coded
  const stacks = new Set(P.flatMap(p => p.stack));
  const stats = [
    ['Projekt', P.length],
    ['I drift', P.filter(p => p.status === 'live').length],
    ['Områden', Object.keys(CATS).length - 1],
    ['Tekniker', stacks.size]
  ];
  $('#stats').innerHTML = stats.map(([k, v]) => `<div><dt>${k}</dt><dd data-to="${v}">0</dd></div>`).join('');

  // Marquee of technologies
  const techs = [...stacks];
  $('#marquee').innerHTML = [...techs, ...techs].map(t => `<span>${esc(t)}</span>`).join('');

  // Category chips
  let cat = 'all', query = '';
  const counts = P.reduce((m, p) => (m[p.category] = (m[p.category] || 0) + 1, m), {});
  $('#chips').innerHTML = Object.entries(CATS).map(([k, v]) =>
    `<button class="chip" data-cat="${k}" aria-pressed="${k === 'all'}">${esc(v)}<span class="n">${k === 'all' ? P.length : counts[k] || 0}</span></button>`).join('');

  // Cards
  const featured = new Set(['launchengine', 'swen-mission-hub']);
  $('#grid').innerHTML = P.map((p, i) => {
    const media = p.noShot
      ? `<div class="shot code"><pre><b>$</b> bridge_agent --poll\n<b>→</b> job exposure-watch-scan\n<b>✓</b> result committed\n<b>→</b> outbound HTTPS only\n<b>✓</b> no open ports</pre></div>`
      : `<div class="shot"><img src="${shot(p, 'd')}" alt="Skärmbild av ${esc(p.name)}" loading="${i < 4 ? 'eager' : 'lazy'}" decoding="async" width="1280" height="800"></div>`;
    // livePayments: the project takes real payments — LIVE box on top and a link to the site under the card.
    const host = p.live ? p.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
    const liveBox = p.livePayments ? `<span class="livebox"><span class="dot"></span>LIVE</span>` : '';
    const liveLink = p.livePayments && p.live
      ? `<a class="golive" href="${esc(p.live)}" target="_blank" rel="noopener">Besök ${esc(host)} <span aria-hidden="true">↗</span></a>` : '';
    return `<div class="card${featured.has(p.id) ? ' feature' : ''}${p.livePayments ? ' paid' : ''}" data-id="${p.id}" style="--accent:${p.accent}">
      <a class="cardlink" href="#projekt/${p.id}" aria-label="${esc(p.name)} — visa detaljer"></a>
      ${liveBox}
      ${media}
      <span class="arrow" aria-hidden="true">↗</span>
      <span class="cbody">
        <span class="ctop"><span class="mono">${esc(CATS[p.category])}</span><span class="badge ${p.status}">${esc(STATUS[p.status])}</span></span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.tagline)}</p>
        <span class="tags">${p.stack.map(s => `<span class="tag">${esc(s)}</span>`).join('')}</span>
      </span>
      ${liveLink}
    </div>`;
  }).join('');
  const cards = [...document.querySelectorAll('.card')];

  function applyFilter() {
    const q = query.trim().toLowerCase();
    let shown = 0;
    cards.forEach(c => {
      const p = P.find(x => x.id === c.dataset.id);
      const hay = [p.name, p.tagline, p.description, ...p.stack, ...p.features].join(' ').toLowerCase();
      const ok = (cat === 'all' || p.category === cat) && (!q || hay.includes(q));
      c.classList.toggle('hide', !ok);
      if (ok) shown++;
    });
    $('#empty').hidden = shown > 0;
    document.querySelectorAll('.chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === cat));
  }
  $('#chips').addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    cat = b.dataset.cat; applyFilter();
  });
  $('#q').addEventListener('input', e => { query = e.target.value; applyFilter(); });

  // Pointer spotlight + subtle 3D tilt
  if (!reduce && matchMedia('(hover: hover)').matches) {
    cards.forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px');
        c.style.setProperty('--my', y + 'px');
        const rx = ((y / r.height) - .5) * -5, ry = ((x / r.width) - .5) * 6;
        c.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
  }

  // Reveal on scroll + count-up stats
  const countUp = el => {
    const to = +el.dataset.to;
    if (reduce) { el.textContent = to; return; }
    const t0 = performance.now(), d = 1200;
    const step = t => {
      const k = Math.min(1, (t - t0) / d);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.classList.contains('card')) {
        const idx = cards.filter(c => !c.classList.contains('in')).indexOf(el);
        setTimeout(() => el.classList.add('in'), Math.max(0, idx) * 70);
      } else el.classList.add('in');
      if (el.id === 'stats') el.querySelectorAll('dd').forEach(countUp);
      io.unobserve(el);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .card').forEach(el => io.observe(el));
  requestAnimationFrame(() => $('.headline').classList.add('in'));
  document.querySelectorAll('.headline .word').forEach((w, i) => { w.style.transitionDelay = (0.08 * i + 0.1) + 's'; });

  // Nav state
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Contact CTA from config
  if (CFG.contactEmail || CFG.contactUrl) {
    const href = CFG.contactEmail ? `mailto:${CFG.contactEmail}` : CFG.contactUrl;
    $('#contact-cta').insertAdjacentHTML('afterbegin', `<a class="btn primary" href="${esc(href)}">Boka en demo →</a>`);
    $('#contact-cta a[href="#work"]').className = 'btn ghost';
  }

  // Detail dialog with deep links (#projekt/<id>)
  const dlg = $('#detail');
  let current = -1;
  function visibleList() { return cards.filter(c => !c.classList.contains('hide')).map(c => c.dataset.id); }
  function open(id, push = true) {
    const p = P.find(x => x.id === id); if (!p) return;
    current = id;
    dlg.style.setProperty('--accent', p.accent);
    $('#d-title').textContent = p.name;
    $('#d-tagline').textContent = p.tagline;
    $('#d-desc').textContent = p.description;
    $('#d-cat').textContent = CATS[p.category];
    $('#d-status').className = 'badge ' + p.status;
    $('#d-status').textContent = STATUS[p.status];
    $('#d-url').textContent = p.live ? p.live.replace(/^https?:\/\//, '') : `freeline · ${p.id}`;
    $('#d-feat').innerHTML = p.features.map(f => `<li>${esc(f)}</li>`).join('');
    $('#d-stack').innerHTML = p.stack.map(s => `<span class="tag">${esc(s)}</span>`).join('');
    const media = $('.d-media');
    if (p.noShot) {
      media.querySelector('.browser').style.display = 'none';
      $('#d-phone').style.display = 'none';
      $('#d-code').hidden = false;
    } else {
      $('#d-code').hidden = true;
      media.querySelector('.browser').style.display = '';
      $('#d-phone').style.display = '';
      $('#d-shot').src = shot(p, 'd'); $('#d-shot').alt = `${p.name} på desktop`;
      $('#d-mshot').src = shot(p, 'm'); $('#d-mshot').alt = `${p.name} på mobil`;
    }
    $('#d-cta').innerHTML = p.live
      ? `<a class="btn primary" href="${esc(p.live)}" target="_blank" rel="noopener">${p.livePayments ? 'Besök sidan' : 'Öppna live-demo'} ↗</a>`
      : `<a class="btn ghost" href="#contact" data-close>Demo på begäran</a>`;
    if (!dlg.open) dlg.showModal();
    dlg.querySelector('.d-body').scrollTop = 0;
    if (push) history.replaceState(null, '', '#projekt/' + id);
  }
  function close() {
    if (dlg.open) dlg.close();
  }
  dlg.addEventListener('close', () => {
    if (location.hash.startsWith('#projekt/')) history.replaceState(null, '', location.pathname + location.search);
    const c = cards.find(x => x.dataset.id === current); if (c) c.querySelector('.cardlink').focus({ preventScroll: true });
  });
  $('#grid').addEventListener('click', e => {
    if (e.target.closest('.golive')) return; // real link to the live site
    const c = e.target.closest('.card'); if (c) { e.preventDefault(); open(c.dataset.id); }
  });
  $('#d-close').addEventListener('click', close);
  dlg.addEventListener('click', e => {
    if (e.target === dlg) close();
    if (e.target.closest('[data-close]')) close();
  });
  const step = d => { const l = visibleList(); const i = l.indexOf(current); open(l[(i + d + l.length) % l.length]); };
  $('#d-prev').addEventListener('click', () => step(-1));
  $('#d-next').addEventListener('click', () => step(1));
  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  const fromHash = () => { const m = location.hash.match(/^#projekt\/(.+)$/); if (m) open(decodeURIComponent(m[1]), false); };
  addEventListener('hashchange', fromHash); fromHash();

  // Ambient field: drifting constellation that leans toward the pointer
  const cv = $('#field'), ctx = cv.getContext('2d');
  let W, H, dpr, pts = [], mouse = { x: -1e4, y: -1e4 };
  const colors = ['79,227,255', '155,123,255', '182,243,90'];
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    const n = Math.round(Math.min(90, (innerWidth * innerHeight) / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .25 * dpr, vy: (Math.random() - .5) * .25 * dpr,
      c: colors[Math.random() * 3 | 0], r: (Math.random() * 1.4 + .6) * dpr
    }));
  }
  function glow() {
    const g1 = ctx.createRadialGradient(W * .15, H * .05, 0, W * .15, H * .05, W * .6);
    g1.addColorStop(0, 'rgba(30,70,140,.35)'); g1.addColorStop(1, 'rgba(5,7,13,0)');
    const g2 = ctx.createRadialGradient(W * .95, H * .35, 0, W * .95, H * .35, W * .5);
    g2.addColorStop(0, 'rgba(80,40,160,.28)'); g2.addColorStop(1, 'rgba(5,7,13,0)');
    ctx.fillStyle = '#05070d'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
  }
  function frame() {
    glow();
    const link = 140 * dpr, mx = mouse.x * dpr, my = mouse.y * dpr;
    for (const p of pts) {
      const dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy);
      if (d < 220 * dpr) { p.vx += dx / d * .012 * dpr; p.vy += dy / d * .012 * dpr; }
      p.vx *= .985; p.vy *= .985;
      p.x += p.vx + Math.sin(p.y * .002) * .08 * dpr; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(${a.c},${(1 - d / link) * .16})`;
          ctx.lineWidth = dpr * .8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const p of pts) {
      ctx.fillStyle = `rgba(${p.c},.75)`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
    }
    if (!reduce && !document.hidden) requestAnimationFrame(frame);
  }
  size();
  addEventListener('resize', () => { size(); if (reduce) frame(); });
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !reduce) requestAnimationFrame(frame); });
  frame();
})();
