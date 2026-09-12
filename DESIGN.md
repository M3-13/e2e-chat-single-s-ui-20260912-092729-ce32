# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Minimalistisch-helles, ruhiges Finanz-Tool im Stil von Linear/Stripe: warmes Off-White, klare Typografie und ein satter Teal-Akzent für Fokus und Ergebnisse.

## Colors

- `--color-bg`: **#FAF9F7**
- `--color-fg`: **#1C1917**
- `--color-accent`: **#0F766E**
- `--color-border`: **#E7E5E4**
- `--color-muted`: **#78716C**
- `--color-surface`: **#FFFFFF**

## Typography

- `font_family`: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- `heading_weight`: 600
- `body_weight`: 400

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px

## Border-Radii

- `--radius-sm`: 6px
- `--radius-md`: 10px
- `--radius-lg`: 16px
- `--radius-pill`: 999px

## Components

### Button

padding 12px 24px, radius md (10px), bg=accent #0F766E, Textfarbe #FFFFFF, font-weight 600, min-height 44px, hover bg #115E59 (dunklerer Teal), active um 1px nach unten verschoben + bg #0D4F4B, disabled opacity 0.5 + cursor not-allowed, Fokusring 2px accent mit 2px Offset.

### Eingabefeld

Label 14px muted über dem Feld, Feld padding 12px 14px, bg #FFFFFF, border 1px solid #E7E5E4, radius md (10px), Text 16px fg, min-height 48px, focus border accent + 3px Ring rgba(15,118,110,0.15), bei leerer/ungültiger Eingabe neutral bleiben (kein rotes Blinken); inputmode decimal für Betrag/Prozent, numeric für Personenzahl.

### Ergebnis-Karte

Karte bg #FFFFFF, border 1px solid #E7E5E4, radius lg (16px), padding 20px 24px, Schatten 0 1px 2px rgba(28,25,23,0.06); Ergebniszeilen als Zeile mit Label muted links, Wert rechts in 20px/600, Zeilenabstand 12px; Trennlinie 1px solid #E7E5E4 zwischen den Zeilen.

### Platzhalter

Bei leerer/ungültiger Eingabe Wert als '–' in muted anzeigen, gleiche Schriftgröße und -stärke wie der normale Wert, damit kein Layout-Springen entsteht.

## Layout Principles

- Container max-width 480px, horizontal zentriert, padding 16px (mobil) bzw. 24px ab 640px.
- Mobile-first, einspaltig; Eingabefelder und Ergebnisblock stapeln mit 16px Abstand, Abschnitte mit 24px Abstand trennen.
- Breakpoints: 0–639px kompakt, ab 640px bleibt der Inhalt bei max. 480px; kein horizontales Scrollen.
- Eingabebereich und Ergebnis klar getrennt, Ergebnis als abgesetzte Karte direkt unter den Feldern.
- Zahlen rechtsbündig, Labels linksbündig für schnelles Überfliegen der Werte.
