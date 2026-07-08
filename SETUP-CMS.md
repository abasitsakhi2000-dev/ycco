# CMS-Einrichtung (Decap CMS auf Netlify, GitHub-Login)

Damit der Kunde **News & Events** selbst auf der Website pflegen kann, wurde ein
Git-basiertes CMS (**Decap CMS**) eingebaut. Der Kunde bearbeitet Inhalte über
eine einfache Weboberfläche unter `/admin/`; Decap speichert die Änderungen
direkt im Git-Repo und Netlify veröffentlicht die Seite automatisch neu.

- **Kostenlos** (Netlify Free-Tier + Functions, Decap ist Open Source)
- **Kein Build-Framework** – die Seite bleibt reines HTML/CSS/JS
- Der öffentliche Teil der Seite und die gehärtete CSP bleiben unverändert

> **Hinweis zum Login:** Netlify hat den früheren „Identity"-Login für neue
> Projekte abgeschaltet. Der Login läuft deshalb über **GitHub** – abgewickelt
> von zwei kleinen Serverless-Funktionen (`netlify/functions/auth.js` und
> `callback.js`) auf derselben Netlify-Site. Die editierende Person braucht
> dadurch einen **GitHub-Account mit Schreibzugriff** aufs Repo (siehe Schritt 4).

---

## Was bereits im Code liegt

| Datei | Zweck |
|-------|-------|
| `admin/index.html` | Login + Editor-Oberfläche (`/admin/`) |
| `admin/config.yml` | Inhaltsmodell „News & Events", GitHub-Backend |
| `netlify/functions/auth.js` + `callback.js` | GitHub-OAuth-Login |
| `content/news.json` | Die Inhaltsdatei (enthält einen Beispiel-Eintrag) |
| `images/news/` | Hier landen vom Kunden hochgeladene Bilder |
| `netlify.toml` | Deploy- + Functions-Konfiguration |
| News-Section in `index.html` + Styles in `style.css` | Zeigt die neuesten 6 Einträge auf der Startseite |

Der **öffentliche Teil funktioniert sofort**. Nur das **Bearbeiten** über
`/admin/` braucht die einmalige Einrichtung unten.

---

## Einmalige Einrichtung

### 1. Seite auf Netlify deployen  ✅ (erledigt)
Site läuft unter `https://dashing-begonia-7fb7cb.netlify.app`.
Publish-Verzeichnis und Functions sind durch `netlify.toml` schon gesetzt.

### 2. GitHub OAuth App anlegen
1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   (<https://github.com/settings/developers>).
2. Werte:
   - **Application name:** `YCCO CMS`
   - **Homepage URL:** `https://dashing-begonia-7fb7cb.netlify.app`
   - **Authorization callback URL:**
     `https://dashing-begonia-7fb7cb.netlify.app/.netlify/functions/callback`
3. **Register application** → **Client ID** kopieren.
4. **Generate a new client secret** → **Client secret** kopieren
   (wird nur einmal angezeigt).

### 3. Zugangsdaten als Environment-Variablen in Netlify hinterlegen
1. Netlify: **Site configuration → Environment variables → Add a variable**.
2. Zwei Variablen anlegen:
   - `OAUTH_GITHUB_CLIENT_ID`  = die Client ID aus Schritt 2
   - `OAUTH_GITHUB_CLIENT_SECRET` = das Client Secret aus Schritt 2
3. **Deploys → Trigger deploy → Deploy site**, damit die Funktionen die neuen
   Variablen bekommen.

### 4. Editor-Zugang zum Repo geben
Die editierende Person braucht einen GitHub-Account mit Schreibrecht auf das
Repo `abasitsakhi2000-dev/ycco`. Zwei Wege:

- **Empfohlen (am einfachsten für den Kunden):** einen eigenen „Redakteur"-
  GitHub-Account anlegen (z. B. `ycco-content`), diesen als Collaborator
  hinzufügen und dem Kunden die Zugangsdaten geben. Er sieht nur den
  Decap-Editor, nie Code.
- **Alternativ:** den vorhandenen GitHub-Account des Kunden als Collaborator
  hinzufügen.

Collaborator hinzufügen: Repo → **Settings → Collaborators → Add people**.
Die eingeladene Person muss die E-Mail-Einladung annehmen.

### 5. Domain umziehen (von GitHub Pages zu Netlify)
1. Netlify: **Domain management → Add a domain** → `www.infoycco.com`
   (und `infoycco.com`) hinzufügen.
2. Beim Domain-Registrar die von Netlify angezeigten DNS-Einträge setzen
   (i. d. R. `CNAME www → dashing-begonia-7fb7cb.netlify.app` und für die
   Apex-Domain einen A-/ALIAS-Eintrag). Netlify stellt HTTPS automatisch aus.
3. **Nach dem Domain-Wechsel** noch anpassen, damit der Login weiter geht:
   - In `admin/config.yml` `base_url` auf `https://www.infoycco.com` ändern.
   - In der GitHub OAuth App (Schritt 2) die Callback-URL auf
     `https://www.infoycco.com/.netlify/functions/callback` ergänzen/ändern.

> Hinweis: Die Datei `CNAME` im Repo ist GitHub-Pages-spezifisch und auf Netlify
> wirkungslos – sie kann bleiben oder gelöscht werden.

---

## So benutzt der Kunde es

1. `https://www.infoycco.com/admin/` (bzw. vorerst die `.netlify.app`-Adresse)
   aufrufen → **Login with GitHub** → mit dem Redakteur-Account einloggen.
2. **News & Events** öffnen → Eintrag hinzufügen/bearbeiten/löschen
   (Titel, Datum, Bild optional, Kurztext, optionaler Link).
3. **Publish** klicken. Netlify baut neu → nach ~1 Minute ist es live.

Angezeigt werden die **6 neuesten** Einträge, automatisch nach Datum sortiert.
Bilder werden nach `images/news/` hochgeladen (max. ~3 MB).

## Fallback: ohne CMS bearbeiten
Man kann `content/news.json` auch direkt im Editor/GitHub bearbeiten – dieselbe
Struktur, ein Objekt pro Eintrag im `items`-Array.

## Später erweitern
Wenn daraus ein vollwertiger Blog mit eigenen Unterseiten pro Beitrag (eigene
URLs, besseres SEO) werden soll, ist der nächste Schritt ein Static Site
Generator (z. B. Eleventy) mit einer Ordner-Collection in Decap.
