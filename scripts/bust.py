"""Sätter ?v=<hash> på style.css, projects.js och app.js i site/index.html. Kör efter varje ändring i assets."""
import hashlib, re, pathlib
site = pathlib.Path(__file__).resolve().parent.parent / "site"
html = (site / "index.html").read_text(encoding="utf8")
for f in ("style.css", "projects.js", "app.js"):
    h = hashlib.sha1((site / "assets" / f).read_bytes()).hexdigest()[:8]
    html = re.sub(r'assets/' + re.escape(f) + r'(\?v=[0-9a-f]+)?"', f'assets/{f}?v={h}"', html)
(site / "index.html").write_text(html, encoding="utf8")
print("ok")
