# Trinkgeld-Rechner

Ein einfacher, statischer Trinkgeld-Rechner als Single-Page-Web-App. Der Nutzer
gibt einen Rechnungsbetrag, einen Trinkgeld-Prozentsatz und die Personenzahl ein
und sieht Trinkgeld, Gesamtsumme und Betrag pro Person sofort berechnet.

## Tech-Stack

- **Sprache**: JavaScript (Vanilla, ES-Module)
- **Markup**: HTML5
- **Styling**: CSS3
- **Build**: kein Build-Tool
- **Tests**: `node:test`

## Installation

Keine Abhängigkeiten, kein Build-Schritt. Einfach das Repository klonen und die
Seite über einen lokalen Webserver öffnen.

## Starten

Die Seite wird über einen lokalen HTTP-Server ausgeliefert (notwendig, da
ES-Module über `file://` nicht geladen werden):

```bash
python -m http.server 8000
```

Danach im Browser öffnen: <http://localhost:8000>

## Bedienung

1. **Betrag in Euro** eingeben (z. B. `100`).
2. **Trinkgeld-Prozent** eingeben (z. B. `10`).
3. **Personenzahl** eingeben (z. B. `2`).

Die Werte werden beim Tippen sofort aktualisiert. Bei leerer oder ungültiger
Eingabe zeigt der Ergebnisbereich einen Platzhalter (`–`) anstatt eines falschen
Ergebnisses.

## Features

- Drei beschriftete Eingabefelder (Betrag, Trinkgeld-Prozent, Personenzahl).
- Ergebnisbereich mit Trinkgeld, Gesamtsumme und Betrag pro Person.
- Live-Aktualisierung beim Tippen.
- Responsives, mobiles Layout ohne horizontales Scrollen.
- Sichere Ausgabe ausschließlich über `textContent` (kein `innerHTML`).
