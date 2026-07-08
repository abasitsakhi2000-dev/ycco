# CMS-Einrichtung (Decap CMS auf Netlify)

Damit der Kunde **News & Events** selbst auf der Website pflegen kann, wurde ein
Git-basiertes CMS (**Decap CMS**) eingebaut. Der Kunde bearbeitet Inhalte über
eine einfache Weboberfläche; Decap speichert die Änderungen direkt im Git-Repo
und Netlify veröffentlicht die Seite automatisch neu.

- **Kostenlos** (Netlify Free-Tier, Decap ist Open Source)
- **Kein Build-Framework** – die Seite bleibt reines HTML/CSS/JS
- Der öffentliche Teil der Seite und die gehärtete CSP bleiben unverändert

---

## Was bereits im Code liegt

| Datei | Zweck |
|-------|-------|
| `admin/index.html` | Login + Editor-Oberfläche (`/admin/`) |
| `admin/config.yml` | Definition der Inhalte („News & Events") |
| `content/news.json` | Die Inhaltsdatei (enthält einen Beispiel-Eintrag) |
| `images/news/` | Hier landen vom Kunden hochgeladene Bilder |
| News-Section in `index.html` + Styles in `style.css` | Zeigt die neuesten 6 Einträge auf der Startseite (neuester zuerst) |

Der **öffentliche Teil funktioniert sofort** – auch schon auf GitHub Pages. Nur
das **Bearbeiten** über `/admin/` braucht die einmalige Netlify-Einrichtung unten.

---

## Einmalige Einrichtung (ca. 15 Minuten)

### 1. Seite auf Netlify deployen
1. Konto anlegen auf <https://app.netlify.com> (z. B. mit dem GitHub-Login).
2. **Add new site → Import an existing project → GitHub** und dieses Repo wählen.
3. Build-Einstellungen:
   - **Build command:** *(leer lassen)*
   - **Publish directory:** `/` (das Repo-Root)
4. **Deploy** klicken. Die Seite ist danach unter `https://<name>.netlify.app` live.

### 2. Login aktivieren (Netlify Identity + Git Gateway)
1. Im Netlify-Dashboard: **Site configuration → Identity → Enable Identity**.
2. Unter **Registration preferences** → **Invite only** wählen
   (nur eingeladene Personen können sich einloggen).
3. Unter **Services → Git Gateway → Enable Git Gateway**.
   (Das erlaubt Decap, im Namen des eingeloggten Nutzers ins Repo zu committen.)

### 3. Einladungs-Link auf `/admin/` zeigen lassen  ← wichtig
Standardmäßig führt Netlifys Einladungs-E-Mail auf die Startseite `/`. Dort liegt
aber kein Login-Widget (bewusst – wegen der gehärteten CSP). Deshalb einmal das
E-Mail-Template anpassen, damit der Link direkt auf `/admin/` zeigt:

1. **Identity → Emails → Invitation template → Edit**.
2. Als **Custom template path** eine eigene Vorlage hinterlegen **oder** – der
   einfachste Weg – die Aktions-URL im Template so setzen, dass sie auf
   `/admin/` verweist:
   ```
   {{ .SiteURL }}/admin/#invite_token={{ .Token }}
   ```
3. Dasselbe für **Recovery** (Passwort vergessen):
   ```
   {{ .SiteURL }}/admin/#recovery_token={{ .Token }}
   ```
Der Link landet dann auf `/admin/`, wo das Login-Widget den Token automatisch
erkennt und den Kunden sein Passwort setzen lässt.

> Alternative, falls du das Template nicht anpassen willst: das
> Netlify-Identity-Widget zusätzlich auf der Startseite laden. Das erfordert
> aber `https://identity.netlify.com` in der öffentlichen CSP (`script-src`,
> `connect-src`, `frame-src`). Der `/admin/`-Weg oben hält die öffentliche Seite
> sauber – empfohlen.

### 4. Kunden einladen
1. **Identity → Invite users** → E-Mail-Adresse des Kunden eingeben.
2. Der Kunde bekommt eine E-Mail, klickt den Link, landet auf `/admin/`,
   setzt sein Passwort – fertig.

### 5. Domain umziehen (von GitHub Pages zu Netlify)
1. In Netlify: **Domain management → Add a domain** → `www.infoycco.com`
   (und `infoycco.com`) hinzufügen.
2. Beim Domain-Registrar die DNS-Einträge auf Netlify umstellen. Netlify zeigt
   die genauen Werte an (i. d. R. `CNAME www → <name>.netlify.app` und für die
   Apex-Domain einen A-/ALIAS-Eintrag). Alternativ die Netlify-DNS nutzen.
3. Netlify stellt automatisch ein kostenloses HTTPS-Zertifikat aus.

> Hinweis: Die Datei `CNAME` im Repo ist GitHub-Pages-spezifisch und auf Netlify
> wirkungslos – sie kann bleiben oder gelöscht werden.

---

## So benutzt der Kunde es

1. `https://www.infoycco.com/admin/` aufrufen und einloggen.
2. **News & Events** öffnen → Eintrag hinzufügen/bearbeiten/löschen
   (Titel, Datum, Bild optional, Kurztext, optionaler Link).
3. **Publish** klicken. Netlify baut neu → nach ~1 Minute ist es live.

Angezeigt werden die **6 neuesten** Einträge, automatisch nach Datum sortiert
(neuester zuerst). Bilder werden nach `images/news/` hochgeladen (max. ~3 MB).

## Fallback: ohne CMS bearbeiten
Man kann `content/news.json` auch direkt im Editor/GitHub bearbeiten – dieselbe
Struktur, ein Objekt pro Eintrag im `items`-Array.

## Später erweitern
Wenn daraus ein vollwertiger Blog mit eigenen Unterseiten pro Beitrag (eigene
URLs, besseres SEO) werden soll, ist der nächste Schritt ein Static Site
Generator (z. B. Eleventy) mit einer Ordner-Collection in Decap.
