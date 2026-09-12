VERDICT: CHANGES_REQUESTED

## Spec-Konformität (tragend für das Verdict)

### AC-01 — Seite startet nicht durch direktes Öffnen der index.html (hoch)
**Befund:** `index.html` bindet die Anwendung über `<script type="module" src="./app.js"></script>` ein, und `app.js` importiert `calc.js` per ES-Modul (`import { calculateTip } from './calc.js';`). Beim direkten Öffnen der Datei über `file://` blockieren Browser den Modul-Import aus Sicherheitsgründen (CORS). Die Seite zeigt dann nur die statischen Felder, aber keine Berechnung; AC-01 ist damit verletzt.

**Abhilfe:**  
- `index.html`: Modul-Skripte durch klassische Skripte ersetzen:  
  `<script src="./calc.js"></script>` vor `<script src="./app.js"></script>`.  
- `calc.js`: `export function calculateTip` durch eine klassische Funktionsdefinition ersetzen und am Ende für Node-Tests exportieren, z. B.  
  `if (typeof module !== 'undefined' && module.exports) { module.exports = { calculateTip }; }`.  
- `app.js`: den Import entfernen und die globale Funktion `calculateTip` verwenden.  
- `tests/calc.test.mjs`: den Import an das CommonJS-Muster anpassen (`import { calculateTip } from '../calc.js'` entfällt; stattdessen z. B. `const { calculateTip } = require('../calc.js')` in einer `.cjs`-Testdatei oder Tests auf das UMD-Muster umstellen).

**Begründung der Einstufung:** Der Kern der Anwendung ist ohne lokalen Webserver nicht nutzbar, obwohl AC-01 ausdrücklich das direkte Öffnen der `index.html` verlangt. Es handelt sich um eine klar behebbare Umsetzungslücke, keinen fundamentalen Rechtsverstoß.

### AC-05 — Ungültige Eingaben wie „12abc“ führen zu einem falschen Rechenergebnis (mittel)
**Befund:** `app.js` parst Eingaben mit `parseFloat`. Dadurch wird eine Eingabe wie `12abc` als Zahl `12` interpretiert, und die App zeigt ein Trinkgeld-Ergebnis an, statt den geforderten neutralen Platzhalter zu setzen. AC-05 verlangt, dass bei ungültigen Werten ein Platzhalter erscheint; das ist für teilweise ungültige Eingaben verletzt. Die Berechnungsfunktion `calc.js` selbst erfüllt AC-09, aber die vorgelagerte UI-Validierung ist zu tolerant.

**Abhilfe:**  
- `app.js`: `parseFloat` durch eine strikte Validierung ersetzen, z. B.:
  ```js
  function parseEuro(value) {
    const raw = value.trim();
    if (raw === '') return null;
    if (!/^\d+([.,]\d+)?$/.test(raw)) return null;
    return Number(raw.replace(',', '.'));
  }
  ```
  Für alle drei Felder anwenden und bei `null` den bestehenden Platzhalterpfad nutzen.  
- Optional: Tests um einen Fall `calculateTip(Number('12abc'), 10, 2)` bzw. UI-Test ergänzen, um die Lücke abzusichern.

**Begründung der Einstufung:** Die Anforderung ist funktional-sicherheitsrelevant, aber nicht fundamental rechtswidrig; die Behebung ist lokal begrenzt.

---

## GDPR / Datenschutzrecht

**Keine Befunde im sichtbaren Code.**  
Die Anwendung verarbeitet keine personenbezogenen Daten im Sinne von Art. 4 Nr. 1 DSGVO: Es gibt keine Übermittlung an einen Server, kein `localStorage`, keine Cookies, kein Tracking und keine Logging-Aufrufe im Code. Die Eingaben (Betrag, Prozent, Personenzahl) sind für sich genommen keine personenbezogenen Daten. Eine Datenschutzerklärung ist für diese rein clientseitige Verarbeitung nicht zwingend erforderlich; ein Consent-Banner ist mangels Cookies/Tracking nicht nötig.

## EU Cyber Resilience Act (CRA)

**Hinweise (non-blocking):**  
- `package.json` enthält kein `license`-Feld (sichtbar als „project license: unspecified“). Für SBOM/Lizenz-Konformität sollte das Feld gesetzt werden, z. B. `"license": "MIT"` oder eine andere gewählte Lizenz.  
- Security by Design/Default ist mit AC-08 (`textContent`) und AC-09 (Eingabevalidierung in `calc.js`) umgesetzt.  
- Es gibt keine externen Abhängigkeiten (`package-lock.json` minimal, kein `dependencies`-Eintrag sichtbar), daher ist ein SBOM trivial.  
- Ein Update-/Patch-Mechanismus ist bei einer statischen Web-App nicht erforderlich; die Dateien können durch Austausch aktualisiert werden.

Diese Punkte verletzen kein Kriterium der Spec und tragen daher nicht zum Verdict bei.

## EU AI Act

**Nicht anwendbar.** Die Anwendung enthält keine KI-Funktion.

## Pflichttexte & UI

**Hinweise (non-blocking):**  
- Ein Impressum fehlt in `index.html`. Ob es nach § 5 DDG erforderlich ist, hängt vom Betreiber ab (z. B. geschäftsmäßiger Betrieb); die Spec enthält keine Impressums-Anforderung.  
- Eine Datenschutzerklärung ist mangels personenbezogener Datenverarbeitung im Client nicht zwingend. Beim Hosting entstehende Server-Logs (IP-Adressen) liegen außerhalb des sichtbaren Codes; der Betreiber sollte dies separat klären.  
- Ein Cookie-Banner ist nicht erforderlich, da keine Cookies gesetzt werden.  
- Eine Widerrufsbelehrung ist nicht relevant, da kein Verbrauchervertrag geschlossen wird.

Diese Punkte verletzen kein AC und tragen nicht zum Verdict bei.

## Barrierefreiheit (WCAG / BITV / EAA)

**Hinweise (non-blocking):**  
- Die Ergebnisaktualisierung ist nicht per `aria-live` ausgezeichnet. Für Screenreader-Nutzer wäre ein `aria-live="polite"` auf dem Ergebniscontainer (`section.results.card`) sinnvoll.  
- Die Farbe `--color-muted: #78716C` für Labels hat auf `--color-bg: #FAF9F7` voraussichtlich ein Kontrastverhältnis unter 4,5:1 (WCAG AA für normalen Text). Eine dunklere Farbe, z. B. `#57534E`, würde die Anforderung erfüllen.  
- Labels und `aria-label` sind vorhanden; Fokus ist sichtbar. Diese Punkte sind solide umgesetzt.

Diese Punkte verletzen kein AC der Spec und tragen nicht zum Verdict bei.

---

**Zusammenfassung:** Die Anwendung ist in den Sicherheitskriterien AC-08/AC-09 sauber umgesetzt und verarbeitet keine personenbezogenen Daten. Tragend sind zwei Spec-Verstöße: das ES-Modul-Problem (AC-01) und die zu tolerante Eingabeparsung (AC-05). Beide sind lokal behebbar; daher `CHANGES_REQUESTED`.