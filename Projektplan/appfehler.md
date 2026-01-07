# FEHLER-KATALOG FÜR TESTPHASE
## WebApp "SprachPlan" - Gezielte Fehler für Berufsschüler-Testing

---

## ÜBERSICHT: FEHLERTYPEN & TESTVERFAHREN-ZUORDNUNG

| Fehlertyp | Anzahl | Testverfahren | Schwierigkeit |
|-----------|--------|---------------|---------------|
| Sicherheitsfehler (SSL) | 2 | System-Test | Mittel |
| Anzeigeprobleme | 5 | Black-Box-Test | Leicht |
| Funktionsdefekte | 6 | Black-Box + Unit-Test | Mittel |
| Validierungsfehler | 4 | Black-Box-Test | Leicht |
| Responsive-Fehler | 3 | System-Test | Mittel |
| Performance-Probleme | 2 | System-Test | Schwer |
| **GESAMT** | **22** | - | - |

---

## KATEGORIE 1: SICHERHEITSFEHLER (SSL/HTTPS)

### Fehler S-01: Fehlende SSL-Verschlüsselung
**Beschreibung:** Die WebApp läuft über `http://` statt `https://`

**Auswirkung:**
- Browser zeigt Warnung "Nicht sicher" in der Adressleiste
- Datenübertragung ist unverschlüsselt
- Passwörter werden im Klartext übertragen

**Wie Schüler es finden:**
- System-Test: Kompletten Login-Prozess durchführen
- Adressleiste im Browser überprüfen
- Browser-Entwicklertools öffnen → Console → Warnung sichtbar

**Testfall:**
```
Testfall S-01: SSL-Zertifikat prüfen
1. WebApp im Browser öffnen
2. Adressleiste überprüfen
3. Erwartetes Ergebnis: https:// mit Schloss-Symbol
4. Tatsächliches Ergebnis: http:// ohne Verschlüsselung
5. Status: FEHLER
```

**Severity:** KRITISCH (Sicherheitsrisiko)

---

### Fehler S-02: Ungültiges SSL-Zertifikat
**Beschreibung:** SSL-Zertifikat ist abgelaufen oder selbst-signiert

**Auswirkung:**
- Browser zeigt große Warnung "Ihre Verbindung ist nicht privat"
- Nutzer muss Sicherheitswarnung aktiv wegklicken
- Vertrauenswürdigkeit der Seite sinkt

**Wie Schüler es finden:**
- Beim ersten Öffnen der WebApp
- Browser zeigt automatisch Warnseite
- In Browser-Entwicklertools: Security-Tab zeigt Fehlerdetails

**Testfall:**
```
Testfall S-02: Gültigkeit des SSL-Zertifikats
1. WebApp aufrufen
2. Auf Schloss-Symbol in Adressleiste klicken
3. "Zertifikat anzeigen" auswählen
4. Gültigkeitsdatum prüfen
5. Erwartetes Ergebnis: Zertifikat gültig
6. Tatsächliches Ergebnis: Zertifikat abgelaufen
7. Status: FEHLER
```

**Severity:** HOCH (Sicherheitsrisiko)

---

## KATEGORIE 2: ANZEIGEPROBLEME (UI-BUGS)

### Fehler A-01: Liste aktualisiert sich nicht nach Login
**Beschreibung:** Nach erfolgreichem Login wird Stundenplan nicht automatisch geladen

**Auswirkung:**
- Benutzer sieht leeren Bildschirm oder alte Daten
- Erst nach manuellem Neuladen (F5) erscheint Stundenplan
- Schlechte User Experience

**Wie Schüler es finden:**
- Black-Box-Test: Login durchführen und beobachten
- Reproduzierbar bei jedem Login-Versuch

**Testfall:**
```
Testfall A-01: Stundenplan-Anzeige nach Login
1. Login-Seite öffnen
2. Korrekte Zugangsdaten eingeben
3. "Anmelden"-Button klicken
4. Erwartetes Ergebnis: Stundenplan wird sofort angezeigt
5. Tatsächliches Ergebnis: Leere Seite, erst nach F5 sichtbar
6. Status: FEHLER
```

**Severity:** HOCH (Kernfunktion betroffen)

---

### Fehler A-02: Farben der Kurse werden nicht korrekt angezeigt
**Beschreibung:** Alle Kurse haben die gleiche Farbe (grau) statt Niveau-spezifische Farben

**Auswirkung:**
- Farbcodierung nach Sprachniveau funktioniert nicht
- Keine visuelle Unterscheidung möglich
- Übersicht leidet stark

**Wie Schüler es finden:**
- Black-Box-Test: Visuelle Inspektion des Stundenplans
- Vergleich mit Spezifikation (Farbschema-Tabelle)

**Testfall:**
```
Testfall A-02: Farbcodierung nach Sprachniveau
1. Stundenplan öffnen
2. Kurse verschiedener Niveaus (A1, B2, C1) ansehen
3. Erwartetes Ergebnis: Unterschiedliche Farben laut Spezifikation
4. Tatsächliches Ergebnis: Alle Kurse grau (#CCCCCC)
5. Status: FEHLER
```

**Severity:** MITTEL (Usability-Problem)

---

### Fehler A-03: Raumnummer wird abgeschnitten auf Mobile
**Beschreibung:** Auf Smartphones wird die Raumnummer nicht vollständig angezeigt

**Auswirkung:**
- Statt "Raum 204" zeigt es nur "Raum 2..."
- Information unvollständig für Nutzer
- Nur auf kleinen Bildschirmen (< 400px Breite)

**Wie Schüler es finden:**
- Responsive-Test: WebApp auf Smartphone öffnen
- Browser-Entwicklertools: Mobile-Ansicht simulieren

**Testfall:**
```
Testfall A-03: Vollständige Anzeige auf Mobile
1. Browser-Entwicklertools öffnen (F12)
2. Mobile-Ansicht aktivieren (iPhone SE, 375px)
3. Stundenplan öffnen
4. Raumnummer in Kurskachel prüfen
5. Erwartetes Ergebnis: "Raum 204" vollständig sichtbar
6. Tatsächliches Ergebnis: "Raum 2..." abgeschnitten
7. Status: FEHLER
```

**Severity:** NIEDRIG (nur Mobile betroffen)

---

### Fehler A-04: Überschneidende Kurse werden nicht korrekt dargestellt
**Beschreibung:** Wenn zwei Kurse zeitgleich stattfinden, überlagern sie sich visuell

**Auswirkung:**
- Nur ein Kurs sichtbar, der andere verdeckt
- Nutzer sieht nicht alle gebuchten Kurse
- Datenverlust in Ansicht

**Wie Schüler es finden:**
- Black-Box-Test mit Testdaten, die Überschneidungen haben
- Visuelle Inspektion des Stundenplans

**Testfall:**
```
Testfall A-04: Überschneidende Kurse
1. Testuser "overlap_user@test.com" einloggen
2. Stundenplan für Montag 10:00 Uhr ansehen
3. Erwartetes Ergebnis: Beide Kurse nebeneinander oder Warnung
4. Tatsächliches Ergebnis: Nur ein Kurs sichtbar
5. Status: FEHLER
```

**Severity:** MITTEL (Datenverlust in UI)

---

### Fehler A-05: Modal schließt nicht beim Klick auf "X"
**Beschreibung:** Das Detailansicht-Modal kann nicht über den X-Button geschlossen werden

**Auswirkung:**
- Nutzer ist "gefangen" in der Detailansicht
- Nur Neuladen der Seite hilft
- Schlechte User Experience

**Wie Schüler es finden:**
- Black-Box-Test: Auf Kurs klicken → Modal öffnet → X klicken

**Testfall:**
```
Testfall A-05: Modal schließen
1. Beliebigen Kurs in Stundenplan anklicken
2. Detailansicht (Modal) öffnet sich
3. Auf "X"-Button oben rechts klicken
4. Erwartetes Ergebnis: Modal schließt sich
5. Tatsächliches Ergebnis: Nichts passiert, Modal bleibt offen
6. Status: FEHLER
```

**Severity:** HOCH (Kernfunktion betroffen)

---

## KATEGORIE 3: FUNKTIONSDEFEKTE

### Fehler F-01: Logout-Button funktioniert nicht
**Beschreibung:** Klick auf Logout-Button führt nicht zur Abmeldung

**Auswirkung:**
- Nutzer bleibt eingeloggt, auch nach Klick
- Sicherheitsrisiko (andere können Stundenplan sehen)
- Erst Browserfenster schließen hilft

**Wie Schüler es finden:**
- Black-Box-Test: Auf Logout klicken und Ergebnis prüfen

**Testfall:**
```
Testfall F-01: Logout-Funktion
1. Als beliebiger User einloggen
2. Stundenplan ansehen
3. Auf "Logout"-Button (oben rechts) klicken
4. Erwartetes Ergebnis: Weiterleitung zur Login-Seite
5. Tatsächliches Ergebnis: Nichts passiert, User bleibt eingeloggt
6. Status: FEHLER
```

**Severity:** HOCH (Sicherheitsrisiko)

---

### Fehler F-02: Passwort-Änderung speichert nicht
**Beschreibung:** Neue Passwörter werden nicht gespeichert (falls Funktion vorhanden)

**Auswirkung:**
- Nach Änderung funktioniert Login mit neuem Passwort nicht
- Nur altes Passwort funktioniert weiterhin
- Nutzer kann sich eventuell aussperren

**Wie Schüler es finden:**
- Black-Box-Test: Passwort ändern → Ausloggen → Mit neuem PW einloggen

**Testfall:**
```
Testfall F-02: Passwort ändern
1. Einloggen mit: user@test.com / test123
2. Zu Einstellungen navigieren
3. Passwort ändern auf "neuesPasswort456"
4. Bestätigung abwarten
5. Ausloggen
6. Einloggen mit: user@test.com / neuesPasswort456
7. Erwartetes Ergebnis: Login erfolgreich
8. Tatsächliches Ergebnis: Login fehlgeschlagen
9. Status: FEHLER
```

**Severity:** KRITISCH (Nutzer sperrt sich aus)

---

### Fehler F-03: Filter-Funktion zeigt falsche Ergebnisse
**Beschreibung:** Filter "Nur Englisch-Kurse" zeigt auch Deutsch-Kurse an

**Auswirkung:**
- Filterfunktion nutzlos
- Nutzer sieht trotzdem alle Kurse
- Keine echte Filterung

**Wie Schüler es finden:**
- Black-Box-Test: Filter setzen und Ergebnisse prüfen

**Testfall:**
```
Testfall F-03: Filterfunktion testen
1. Stundenplan mit gemischten Kursen (Englisch, Deutsch, Spanisch) öffnen
2. Filter auf "Nur Englisch" setzen
3. Erwartetes Ergebnis: Nur Englisch-Kurse sichtbar
4. Tatsächliches Ergebnis: Alle Kurse weiterhin sichtbar
5. Status: FEHLER
```

**Severity:** MITTEL (Feature funktioniert nicht)

---

### Fehler F-04: PDF-Export erstellt leere Datei
**Beschreibung:** "Als PDF speichern"-Button erstellt PDF, aber es ist leer/weiß

**Auswirkung:**
- Export-Funktion nutzlos
- Nutzer kann Stundenplan nicht ausdrucken
- Zeitverschwendung beim Download

**Wie Schüler es finden:**
- Black-Box-Test: PDF exportieren und öffnen

**Testfall:**
```
Testfall F-04: PDF-Export
1. Stundenplan vollständig laden
2. Auf "Als PDF speichern"-Button klicken
3. PDF-Datei wird heruntergeladen
4. PDF-Datei öffnen
5. Erwartetes Ergebnis: Stundenplan im PDF sichtbar
6. Tatsächliches Ergebnis: PDF ist komplett leer/weiß
7. Status: FEHLER
```

**Severity:** MITTEL (Nice-to-Have-Feature betroffen)

---

### Fehler F-05: Detailansicht zeigt falsche Lehrkraft
**Beschreibung:** Modal zeigt immer "Sarah Miller" als Lehrkraft, auch für andere Kurse

**Auswirkung:**
- Falsche Information für Nutzer
- Verwechslungsgefahr bei mehreren Kursen
- Datenbankabfrage fehlerhaft

**Wie Schüler es finden:**
- Black-Box-Test: Mehrere verschiedene Kurse anklicken
- Unit-Test: Datenbank-Abfragefunktion testen

**Testfall:**
```
Testfall F-05: Korrekte Lehrkraft-Anzeige
1. Kurs "Deutsch A1" anklicken (Lehrkraft: Thomas Schmidt)
2. Detailansicht prüfen
3. Erwartetes Ergebnis: "Thomas Schmidt" angezeigt
4. Tatsächliches Ergebnis: "Sarah Miller" angezeigt
5. Kurs "Spanisch B1" anklicken (Lehrkraft: Maria Garcia)
6. Detailansicht prüfen
7. Erwartetes Ergebnis: "Maria Garcia" angezeigt
8. Tatsächliches Ergebnis: "Sarah Miller" angezeigt
9. Status: FEHLER
```

**Severity:** MITTEL (Falsche Daten)

---

### Fehler F-06: Uhrzeit wird im falschen Format angezeigt
**Beschreibung:** Zeiten werden als "8:0" statt "08:00" angezeigt

**Auswirkung:**
- Unprofessionelle Darstellung
- Schlechte Lesbarkeit
- Formatierungsfehler

**Wie Schüler es finden:**
- Black-Box-Test: Visuelle Inspektion aller Zeitangaben
- Unit-Test: Formatierungsfunktion testen

**Testfall:**
```
Testfall F-06: Zeitformat prüfen
1. Stundenplan öffnen
2. Alle Zeitangaben durchsehen
3. Erwartetes Format: "08:00 - 09:30" (mit führenden Nullen)
4. Tatsächliches Format: "8:0 - 9:30" (ohne führende Nullen)
5. Status: FEHLER
```

**Severity:** NIEDRIG (nur Formatierung)

---

## KATEGORIE 4: VALIDIERUNGSFEHLER (EINGABEPRÜFUNG)

### Fehler V-01: Login akzeptiert leere Felder
**Beschreibung:** "Anmelden"-Button funktioniert auch ohne Eingabe von E-Mail/Passwort

**Auswirkung:**
- Keine Validierung der Eingaben
- Sicherheitslücke
- Unerwartetes Verhalten

**Wie Schüler es finden:**
- Black-Box-Test: Login mit leeren Feldern versuchen

**Testfall:**
```
Testfall V-01: Login ohne Eingabe
1. Login-Seite öffnen
2. Felder für E-Mail und Passwort LEER lassen
3. Auf "Anmelden"-Button klicken
4. Erwartetes Ergebnis: Fehlermeldung "Bitte alle Felder ausfüllen"
5. Tatsächliches Ergebnis: Login-Versuch wird durchgeführt
6. Status: FEHLER
```

**Severity:** MITTEL (Fehlende Validierung)

---

### Fehler V-02: Ungültige E-Mail-Adressen werden akzeptiert
**Beschreibung:** E-Mails ohne "@" oder ".com" werden als gültig akzeptiert

**Auswirkung:**
- Keine E-Mail-Formatprüfung
- Unsaubere Daten in Datenbank
- Spätere Probleme bei Kommunikation

**Wie Schüler es finden:**
- Black-Box-Test: Login mit falschen E-Mail-Formaten testen

**Testfall:**
```
Testfall V-02: E-Mail-Formatprüfung
Test 1:
1. E-Mail-Feld: "maxmustermann" (ohne @)
2. Passwort: "test123"
3. Anmelden klicken
4. Erwartetes Ergebnis: Fehlermeldung "Ungültige E-Mail"
5. Tatsächliches Ergebnis: Akzeptiert

Test 2:
1. E-Mail-Feld: "max@test" (ohne Domain-Endung)
2. Passwort: "test123"
3. Anmelden klicken
4. Erwartetes Ergebnis: Fehlermeldung "Ungültige E-Mail"
5. Tatsächliches Ergebnis: Akzeptiert
6. Status: FEHLER
```

**Severity:** NIEDRIG (Dateneingabe-Problem)

---

### Fehler V-03: Passwort-Feld akzeptiert nur 3 Zeichen
**Beschreibung:** Sehr kurze Passwörter (z.B. "123") werden akzeptiert

**Auswirkung:**
- Sicherheitsrisiko
- Keine Mindestlänge für Passwörter
- Leicht zu erraten

**Wie Schüler es finden:**
- Black-Box-Test: Login mit sehr kurzem Passwort

**Testfall:**
```
Testfall V-03: Passwort-Mindestlänge
1. E-Mail: "test@test.com"
2. Passwort: "12" (nur 2 Zeichen)
3. Anmelden klicken
4. Erwartetes Ergebnis: Fehlermeldung "Passwort muss mindestens 6 Zeichen haben"
5. Tatsächliches Ergebnis: Login-Versuch erfolgreich
6. Status: FEHLER
```

**Severity:** MITTEL (Sicherheitsrisiko)

---

### Fehler V-04: SQL-Injection möglich im Login-Formular
**Beschreibung:** Eingabe von `' OR '1'='1` im Passwort-Feld umgeht Login

**Auswirkung:**
- KRITISCHE Sicherheitslücke
- Jeder kann sich ohne Passwort einloggen
- Datenbank manipulierbar

**Wie Schüler es finden:**
- White-Box-Test (fortgeschritten): SQL-Injection testen
- Black-Box-Test: Spezielle Zeichen im Login eingeben

**Testfall:**
```
Testfall V-04: SQL-Injection-Test
1. E-Mail: "beliebig@test.com"
2. Passwort: ' OR '1'='1
3. Anmelden klicken
4. Erwartetes Ergebnis: Login fehlgeschlagen
5. Tatsächliches Ergebnis: Login erfolgreich (!)
6. Status: FEHLER (KRITISCH!)
```

**Severity:** KRITISCH (Sicherheitslücke!)

**Hinweis für Lehrkraft:** Dieser Fehler sollte nur eingebaut werden, wenn Sie SQL-Injection im Unterricht thematisieren möchten. Er ist komplex zu verstehen.

---

## KATEGORIE 5: RESPONSIVE-FEHLER (GERÄTE-KOMPATIBILITÄT)

### Fehler R-01: Layout bricht auf Tablets (768px)
**Beschreibung:** Stundenplan-Grid wird auf iPad unlesbar (überlappende Elemente)

**Auswirkung:**
- Auf Tablets (768px - 1024px) nicht nutzbar
- Layout "zerfällt" visuell
- Horizontales Scrollen nötig

**Wie Schüler es finden:**
- Responsive-Test: Browser auf Tablet-Größe stellen
- Physisches Tablet zum Testen nutzen

**Testfall:**
```
Testfall R-01: Tablet-Ansicht (768px)
1. Browser-Entwicklertools öffnen
2. Responsive Design Mode aktivieren
3. Breite auf 768px (iPad) einstellen
4. Stundenplan öffnen
5. Erwartetes Ergebnis: Grid passt sich an, lesbar
6. Tatsächliches Ergebnis: Elemente überlappen, unleserlich
7. Status: FEHLER
```

**Severity:** HOCH (ganze Geräte-Kategorie betroffen)

---

### Fehler R-02: Buttons zu klein auf Mobile (<40px)
**Beschreibung:** "Anmelden"- und "X"-Buttons auf Smartphone schwer zu treffen

**Auswirkung:**
- Schlechte Usability auf Smartphones
- Nutzer muss mehrfach klicken
- Touch-Targets zu klein (Richtlinie: min. 44x44px)

**Wie Schüler es finden:**
- Responsive-Test auf echtem Smartphone
- Mobile-Ansicht im Browser + Mausgröße beachten

**Testfall:**
```
Testfall R-02: Button-Größe auf Mobile
1. Mobile-Ansicht aktivieren (375px - iPhone SE)
2. Größe des "Anmelden"-Buttons messen (Entwicklertools)
3. Erwartetes Ergebnis: Mind. 44x44px (Accessibility-Standard)
4. Tatsächliches Ergebnis: 28x28px
5. Auf Button klicken (mit Maus Touch simulieren)
6. Erwartetes Ergebnis: Klick wird registriert
7. Tatsächliches Ergebnis: Mehrfaches Klicken nötig
8. Status: FEHLER
```

**Severity:** MITTEL (Usability-Problem)

---

### Fehler R-03: Horizontales Scrollen nötig auf Smartphone
**Beschreibung:** Stundenplan-Tabelle ist breiter als Bildschirm auf Mobile

**Auswirkung:**
- Nutzer muss horizontal scrollen (sehr nervig)
- Komplette Woche nicht auf einen Blick sichtbar
- Mobile-Konzept fehlt

**Wie Schüler es finden:**
- Responsive-Test: Auf Smartphone öffnen

**Testfall:**
```
Testfall R-03: Kein horizontales Scrollen
1. Mobile-Ansicht (375px) aktivieren
2. Stundenplan öffnen
3. Erwartetes Ergebnis: Kompletter Inhalt ohne horizontales Scrollen sichtbar
4. Tatsächliches Ergebnis: Tabelle zu breit, Scrollen nach rechts nötig
5. Status: FEHLER
```

**Severity:** HOCH (Mobile-Nutzung stark eingeschränkt)

---

## KATEGORIE 6: PERFORMANCE-PROBLEME

### Fehler P-01: Ladezeit über 5 Sekunden
**Beschreibung:** WebApp braucht sehr lange zum Laden (unnötig große Bilder/Dateien)

**Auswirkung:**
- Schlechte User Experience
- Hoher Datenverbrauch auf Mobile
- Nutzer verliert Geduld

**Wie Schüler es finden:**
- System-Test: Ladezeit messen
- Browser-Entwicklertools: Network-Tab

**Testfall:**
```
Testfall P-01: Ladezeit der WebApp
1. Browser-Entwicklertools öffnen (F12)
2. "Network"-Tab auswählen
3. WebApp neu laden (Strg + Shift + R)
4. Ladezeit ablesen (unten rechts)
5. Erwartetes Ergebnis: < 2 Sekunden
6. Tatsächliches Ergebnis: 6,7 Sekunden
7. Status: FEHLER
```

**Severity:** MITTEL (Performance)

**Hinweis:** Für Schüler fortgeschritten - benötigt Kenntnisse in Entwicklertools.

---

### Fehler P-02: Browser friert ein bei großen Stundenplänen
**Beschreibung:** Bei Nutzer mit 20+ Kursen wird Browser sehr langsam

**Auswirkung:**
- Extreme Verzögerung bei Interaktionen
- Browser kann sogar abstürzen
- Nur bei speziellen Testusern reproduzierbar

**Wie Schüler es finden:**
- System-Test mit Testuser "power_user@test.com" (hat 25 Kurse)
- Browser-Performance beobachten

**Testfall:**
```
Testfall P-02: Performance bei vielen Kursen
1. Als "power_user@test.com" einloggen (hat 25 Kurse)
2. Stundenplan laden
3. Erwartetes Ergebnis: Flüssige Darstellung, max. 2 Sek. Ladezeit
4. Tatsächliches Ergebnis: Browser "hängt", 8+ Sekunden Ladezeit
5. Auf Kurs klicken
6. Erwartetes Ergebnis: Sofortige Reaktion
7. Tatsächliches Ergebnis: 3 Sekunden Verzögerung
8. Status: FEHLER
```

**Severity:** NIEDRIG (Randfall, nur bei extremen Datenmengen)

---

## FEHLER-PRIORISIERUNG FÜR UNTERRICHT

### EMPFEHLUNG: Basis-Set (10 Fehler für 2-3 Unterrichtsstunden)

**Leicht zu finden (für Anfänger):**
- A-01: Liste aktualisiert sich nicht nach Login
- A-02: Farben werden nicht korrekt angezeigt
- A-05: Modal schließt nicht beim X-Klick
- F-01: Logout-Button funktioniert nicht
- V-01: Login akzeptiert leere Felder

**Mittel (für Fortgeschrittene):**
- S-01: Fehlende SSL-Verschlüsselung
- F-03: Filter zeigt falsche Ergebnisse
- F-05: Detailansicht zeigt falsche Lehrkraft
- R-01: Layout bricht auf Tablets
- R-03: Horizontales Scrollen auf Mobile

---

### ERWEITERT: Fortgeschrittenen-Set (+12 Fehler für 4-5 Unterrichtsstunden)

Zusätzlich zu Basis-Set:
- S-02: Ungültiges SSL-Zertifikat
- A-03: Raumnummer abgeschnitten auf Mobile
- A-04: Überschneidende Kurse falsch dargestellt
- F-02: Passwort-Änderung speichert nicht
- F-04: PDF-Export erstellt leere Datei
- F-06: Zeitformat falsch
- V-02: Ungültige E-Mails akzeptiert
- V-03: Zu kurze Passwörter akzeptiert
- R-02: Buttons zu klein
- P-01: Ladezeit zu hoch
- P-02: Browser friert ein bei vielen Kursen

---

### EXPERT: Vollständiges Set (alle 22 Fehler für 6-9 Unterrichtsstunden)

Zusätzlich zu Erweitert:
- V-04: SQL-Injection möglich (nur wenn Thema behandelt!)

---

## TESTPROTOKOLL-VORLAGE FÜR SCHÜLER

```
TESTPROTOKOLL - SprachPlan WebApp
===================================

Tester: ___________________________
Datum: ____________________________
Testumgebung: 
  [ ] Desktop (Auflösung: _______)
  [ ] Tablet (Modell: ___________)
  [ ] Smartphone (Modell: _______)
Browser: __________________________

GEFUNDENE FEHLER:
----------------------------------

Fehler-Nr.: ______
Titel: _____________________________
Schweregrad: [ ] Kritisch [ ] Hoch [ ] Mittel [ ] Niedrig

Beschreibung:
_________________________________________
_________________________________________

Schritte zur Reproduktion:
1. ______________________________________
2. ______________________________________
3. ______________________________________

Erwartetes Ergebnis:
_________________________________________

Tatsächliches Ergebnis:
_________________________________________

Screenshot: [ ] Angehängt [ ] Nicht verfügbar

Testverfahren verwendet:
[ ] Black-Box-Test
[ ] White-Box-Test
[ ] Unit-Test
[ ] Integrationstest
[ ] Systemtest
[ ] Regressionstest
[ ] Responsive-Test

---

[Weitere Fehler auf separaten Blättern dokumentieren]

ZUSAMMENFASSUNG:
Gesamt gefundene Fehler: ______
  - Kritisch: ______
  - Hoch: ______
  - Mittel: ______
  - Niedrig: ______

Unterschrift Tester: __________________
```

---

## BEWERTUNGSRUBRIK FÜR FEHLER-DOKUMENTATION

| Kriterium | Punkte | Beschreibung |
|-----------|---------|--------------|
| Vollständigkeit | 0-3 | Alle relevanten Infos erfasst? |
| Reproduzierbarkeit | 0-3 | Kann Fehler nachvollzogen werden? |
| Schweregrad korrekt | 0-2 | Richtige Priorisierung? |
| Screenshot/Beweis | 0-2 | Visueller Beweis vorhanden? |
| **GESAMT** | **0-10** | Pro gefundenem Fehler |

**Notenskala (Vorschlag):**
- 150+ Punkte (15+ gut dokumentierte Fehler): Note 1
- 100-149 Punkte (10-14 Fehler): Note 2
- 70-99 Punkte (7-9 Fehler): Note 3
- 50-69 Punkte (5-6 Fehler): Note 4
- < 50 Punkte: Note 5

---

## HINWEISE FÜR DIE LEHRKRAFT

### Vorbereitung:
1. **Funktionierende Version erstellen:** Zunächst eine saubere, funktionierende WebApp entwickeln
2. **Fehler gezielt einbauen:** Aus diesem Katalog passende Fehler auswählen und implementieren
3. **Dokumentation erstellen:** Eigene "Musterlösung" mit allen Fehlern und Fundstellen

### Tipps:
- Nicht alle 22 Fehler einbauen - 8-12 Fehler reichen für Anfänger
- Mit leichten Fehlern (Anzeigeprobleme) starten
- Kritische Fehler (SQL-Injection) nur für fortgeschrittene Gruppen
- Testprotokolle vorher mit Schülern besprechen

### Differenzierung:
- **Schwache Schüler:** Nur Kategorie 2 (Anzeigeprobleme) - 5 Fehler
- **Mittlere Schüler:** Kategorien 2+3 (Anzeige + Funktionen) - 10 Fehler
- **Starke Schüler:** Alle Kategorien - 15+ Fehler

---

## ZUSAMMENFASSUNG

Dieser Fehler-Katalog bietet 22 verschiedene, realitätsnahe Bugs für die WebApp "SprachPlan". Die Fehler sind nach Kategorien und Schwierigkeitsgrad sortiert, sodass Sie als Lehrkraft gezielt auswählen können, welche Fehler für Ihre Lerngruppe geeignet sind.

**Empfehlung:** Starten Sie mit dem Basis-Set (10 Fehler) und erweitern Sie bei Bedarf.

**Nächster Schritt:** Umsetzung der WebApp mit den ausgewählten Fehlern.