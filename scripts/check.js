// Validates the portfolio before deploy: every project has a known category/status
// and every referenced screenshot exists, so a broken upload never reaches freeline.se.
const fs = require('fs');
const path = require('path');
const site = path.join(__dirname, '..', 'site');
global.window = {};
require(path.join(site, 'assets', 'projects.js'));
const { FREELINE_PROJECTS: projects, FREELINE_CATEGORIES: cats, FREELINE_STATUS: status } = window;
const errors = [];
const ids = new Set();
for (const p of projects) {
  if (ids.has(p.id)) errors.push(`duplicate id: ${p.id}`);
  ids.add(p.id);
  for (const field of ['id', 'name', 'tagline', 'description']) if (!p[field]) errors.push(`${p.id}: missing ${field}`);
  if (!cats[p.category]) errors.push(`${p.id}: unknown category ${p.category}`);
  if (!status[p.status]) errors.push(`${p.id}: unknown status ${p.status}`);
  if (p.livePayments && !/^https:\/\//.test(p.live || '')) errors.push(`${p.id}: livePayments requires an https live URL`);
  if (!p.noShot) for (const s of ['d', 'm']) {
    if (!fs.existsSync(path.join(site, 'assets', 'shots', `${p.id}-${s}.webp`))) errors.push(`${p.id}: missing shots/${p.id}-${s}.webp`);
  }
}
for (const f of ['index.html', 'assets/app.js', 'assets/style.css']) if (!fs.existsSync(path.join(site, f))) errors.push(`missing ${f}`);
// index.html must reference each asset with ?v=<first 8 of sha1>, so browsers never serve a stale copy.
const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
for (const f of ['style.css', 'projects.js', 'app.js']) {
  const v = require('crypto').createHash('sha1').update(fs.readFileSync(path.join(site, 'assets', f))).digest('hex').slice(0, 8);
  if (!html.includes(`assets/${f}?v=${v}`)) errors.push(`index.html: assets/${f} needs ?v=${v} (run: python3 scripts/bust.py)`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`OK: ${projects.length} projects, all screenshots present.`);
