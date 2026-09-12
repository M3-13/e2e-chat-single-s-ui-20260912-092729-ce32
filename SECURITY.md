VERDICT: APPROVED

## Sicherheitsbericht

Der Stand des Produkts ist aus Sicherheitssicht unbedenklich. Es wurden keine ausnutzbaren Schwachstellen gefunden.

### Geprüfte Bereiche

1. **Secrets**  
   Keine Hardcoded Schlüssel, Passwörter, Tokens oder vertraulichen URLs. Es gibt keine Logausgaben und keine serverseitigen Komponenten.

2. **Injection & Eingaben**  
   Keine SQL-, Command- oder Path-Injection möglich. XSS wird durch ausschließliche Nutzung von `textContent` in `app.js` verhindert; `innerHTML` oder `insertAdjacentHTML` werden nicht mit Eingabedaten verwendet. Es gibt keine serverseitige Auswertung von Eingaben.

3. **AuthN/AuthZ**  
   Nicht anwendbar: statische Single-Page-App ohne Serverzustand, Sessions oder Token-Verarbeitung.

4. **Dependencies**  
   `npm audit` meldet 0 Schwachstellen. `semgrep` wurde nicht ausgeführt (`[skipped]`); das ist als Scanner-Lücke dokumentiert und wurde nicht als Befund gewertet.

5. **Konfiguration & Transport**  
   Keine Server- oder Transportkonfiguration vorhanden. Keine riskanten CORS-, Debug- oder Berechtigungseinstellungen erkennbar.

### Erfüllte Sicherheitskriterien

- **AC-08**  
  `app.js` schreibt alle Ergebniswerte ausschließlich über `textContent`. Es gibt keine Verwendung von `innerHTML` oder `insertAdjacentHTML` mit Eingabedaten. Das Kriterium ist erfüllt.

- **AC-09**  
  `calc.js` prüft mit `Number.isFinite`, dass `amount`, `percent` und `people` endliche Zahlen sind. Zusätzlich wird sichergestellt, dass `amount` und `percent` nicht negativ sowie `people` ganzzahlig und mindestens 1 sind. Bei ungültigen Eingaben gibt die Funktion `null` zurück und liefert keinen berechneten Wert. Die vorhandenen Tests decken ungültige Eingaben umfassend ab. Das Kriterium ist erfüllt.

### Notes (non-blocking)

- **Laxe UI-Konvertierung mit `parseFloat`**  
  `app.js` verwendet `parseFloat` für die Eingabefelder. Dadurch wird eine Eingabe wie `10abc` als `10` interpretiert. Das ist kein Sicherheitsrisiko, kann aber je nach Auslegung von AC-05 funktional auffallen. Empfehlung: Eingaben vor der Übergabe an `calculateTip` strikt validieren, z. B. mit `Number(value)` oder einem regulären Ausdruck, und bei Abweichung den Platzhalter anzeigen.

- **Formatierung extrem großer Zahlen**  
  `formatEuro` nutzt `toFixed(2)`. Bei sehr großen, aber gemäß AC-09 zulässigen Zahlen (ab etwa 10²¹) liefert `toFixed` eine Exponentialdarstellung und verletzt potenziell AC-04. Dies ist kein Sicherheitsrisiko, sollte aber in der nächsten Planung berücksichtigt werden.

- **Scanner-Lücke semgrep**  
  `semgrep` war nicht installiert und wurde daher übersprungen. Es wurde keine Schwachstelle daraus abgeleitet, die Lücke ist hiermit dokumentiert.