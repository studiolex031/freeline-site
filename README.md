# freeline.se

FreeLines portfolio — statisk sajt som publiceras automatiskt till Simply.com.

```
site/
  index.html
  assets/projects.js   ← projektlistan (redigera här)
  assets/app.js
  assets/style.css
  assets/shots/<id>-d.webp (1280×800) och <id>-m.webp (390×844)
```

## Publicering
Varje push till `main` kör `scripts/check.js` (alla projekt giltiga, alla skärmbilder finns) och laddar sedan upp
ändrade filer via FTPS till Simply.com. Pull requests kör bara kontrollen.

Filer på servern som inte finns i repot (t.ex. `.htaccess`) rörs aldrig.

### Engångsinställning (GitHub → Settings → Secrets and variables → Actions)
| Typ | Namn | Värde |
|---|---|---|
| Secret | `FTP_SERVER` | FTP-servern från Simply.com (Kontrollpanelen → FTP) |
| Secret | `FTP_USERNAME` | FTP-användare |
| Secret | `FTP_PASSWORD` | FTP-lösenord |
| Variable | `FTP_SERVER_DIR` | Valfri. Webbroten, standard `public_html/` |

Första körningen laddar upp alla filer en gång; därefter bara det som ändrats.

## Lägga till ett projekt
1. Lägg till ett objekt i `site/assets/projects.js` (`category` och `status` måste finnas i listorna längst ner).
   **Riktiga betalningar:** när ett projekt tar emot riktiga (live) betalningar, sätt `live: 'https://…'` och `livePayments: true`. Kortet får då en LIVE-box överst och en länk till sidan under kortet.
2. Lägg skärmbilderna i `site/assets/shots/` som `<id>-d.webp` och `<id>-m.webp`.
3. Kör `node scripts/check.js`, commit och push — sajten uppdateras automatiskt.
