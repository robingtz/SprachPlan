# SprachPlan WebApp - Vollständige Projektdokumentation für Berufsschule

## Inhaltsverzeichnis
1. [Projektübersicht](#projektübersicht)
2. [Projektzweck für den Unterricht](#projektzweck-für-den-unterricht)
3. [Technische Umsetzung](#technische-umsetzung)
4. [Login-Daten und Zugang](#login-daten-und-zugang)
5. [Eingebaute Fehler - Übersicht](#eingebaute-fehler---übersicht)
6. [Detaillierte Fehlerbeschreibungen](#detaillierte-fehlerbeschreibungen)
7. [Funktionale Anforderungen](#funktionale-anforderungen)
8. [Datenmodell](#datenmodell)
9. [User Stories](#user-stories)
10. [Unterrichtshinweise](#unterrichtshinweise)
11. [Bewertungskriterien](#bewertungskriterien)

---

## Projektübersicht

### Was ist SprachPlan?

**SprachPlan** ist eine einfache WebApp für die fiktive Sprachschule "LanguageHub International". Die App ermöglicht Sprachschülern den Zugriff auf ihren persönlichen Kursplan mit Informationen zu:
- Kurszeiten (Montag bis Freitag, 08:00 - 20:00 Uhr)
- Raumnummern
- Lehrkräften
- Sprachniveaus (A1, A2, B1, B2, C1, C2)

### Zielgruppe
- Primär: Erwachsene Sprachschüler (18-65 Jahre)
- Geräte: Desktop-PC, Tablet, Smartphone
- Internationales Publikum (einfache Bedienung wichtig)

### Technologie-Stack
- **Frontend:** React mit TypeScript
- **Styling:** Tailwind CSS
- **Datenbank:** Simuliert mit JSON-Mock-Daten (keine echte Datenbank)
- **Authentifizierung:** Einfache Simulation ohne Backend

---

## Projektzweck für den Unterricht

Diese WebApp wurde speziell für den Berufsschulunterricht entwickelt und enthält **absichtlich eingebaute Fehler**, die Schülerinnen und Schüler finden sollen.

### Lernziele
- Anwendung verschiedener Testverfahren (Black-Box, White-Box, Unit-Tests, Systemtests)
- Erstellen von professionellen Fehlerberichten
- Verständnis für Software-Testing und Quality Assurance
- Praktische Erfahrung mit realistischen Software-Bugs
- Teamarbeit und eduScrum-Methodik

### Schwierigkeitsgrad
Die App ist bewusst einfach gehalten - ohne komplexe Backend-Logik oder echte Datenbank - damit sich Schüler auf das Testen konzentrieren können, nicht auf das Verstehen komplexer Technologien.

---

## Technische Umsetzung

### Projektstruktur
```
sprachplan/
├── src/
│   ├── App.tsx                 # Hauptkomponente
│   ├── constants.ts            # Mock-Daten (JSON-"Datenbank")
│   ├── components/
│   │   ├── Login.tsx          # Login-Formular
│   │   ├── Schedule.tsx       # Stundenplan-Anzeige
│   │   └── CourseDetailModal.tsx  # Detailansicht für Kurse
│   └── services/
│       └── authService.ts     # Login-Logik
├── public/
└── package.json
```

### Datenbank-Simulation

**Es gibt keine echte externe Datenbank!** Die Daten sind direkt im Code hinterlegt:

**Datei: `constants.ts`**
- `MOCK_USER`: Benutzerdaten (Max Mustermann)
- `MOCK_COURSES`: Liste aller Kurse
- `LEVEL_COLORS`: Farbzuordnung für Sprachniveaus

**Datenfluss:**
1. `App.tsx` importiert die Daten aus `constants.ts`
2. Die Daten werden an die Komponente `Schedule.tsx` übergeben
3. `Schedule.tsx` zeigt die Kurse als farbige Kacheln an

**Session Storage:**
- Beim Login wird der User im `sessionStorage` des Browsers gespeichert
- So bleibt der Login auch nach einem Seitenreload erhalten
- Löschen des Session Storage = Logout

---

## Login-Daten und Zugang

### Standard-Zugangsdaten

```
E-Mail:    max.mustermann@email.com
Passwort:  test123
```

### Wichtige Hinweise zum Login (wegen eingebauter Fehler!)

#### 1. Lange Ladezeit (Fehler P-01)
Nach Klick auf "Anmelden" passiert **6,7 Sekunden lang nichts**. Das ist der eingebaute Performance-Fehler. **Warte geduldig ab!**

#### 2. Keine automatische Weiterleitung (Fehler A-01)
Nach den 6,7 Sekunden verschwindet der Ladebalken, aber du bleibst auf der Login-Seite. Du musst die Seite **manuell neu laden (F5)**, um den Stundenplan zu sehen.

#### 3. Alternative Login-Möglichkeiten (wegen Validierungsfehlern)

**Wegen Fehler V-03:**
- Passwort `12` funktioniert auch (zu kurz, sollte blockiert werden)

**Wegen Fehler V-04 (SQL-Injection):**
- Passwort `' OR '1'='1` umgeht die Authentifizierung komplett

**Wegen Fehler V-01:**
- Leere Felder werden akzeptiert (sollten blockiert werden)

**Wegen Fehler V-02:**
- Ungültige E-Mails wie `maxmustermann` (ohne @) werden akzeptiert

---

## Eingebaute Fehler - Übersicht

### Fehler-Statistik

| Kategorie | Anzahl | Schwierigkeit | Testverfahren |
|-----------|--------|---------------|---------------|
| Anzeigeprobleme (A-XX) | 5 | Leicht-Mittel | Black-Box |
| Funktionsdefekte (F-XX) | 5 | Mittel | Black-Box + Unit-Test |
| Validierungsfehler (V-XX) | 4 | Leicht-Mittel | Black-Box |
| Responsive-Fehler (R-XX) | 3 | Mittel | System-Test |
| Performance-Probleme (P-XX) | 1 | Mittel-Schwer | System-Test |
| **GESAMT** | **18** | - | - |

### Fehler nach Severity

| Severity | Anzahl | Fehler-IDs |
|----------|--------|------------|
| **KRITISCH** | 1 | V-04 (SQL-Injection) |
| **HOCH** | 4 | A-01, A-05, F-01, R-03 |
| **MITTEL** | 9 | A-02, A-04, F-03, F-04, F-05, V-01, V-03, R-01, R-02 |
| **NIEDRIG** | 4 | A-03, F-06, V-02, P-01 |

### Empfohlene Fehlersets für den Unterricht

#### Basis-Set (2-3 Unterrichtsstunden) - 8 Fehler
Leicht zu finden, für Anfänger:
- A-01: Liste aktualisiert sich nicht nach Login
- A-02: Farben werden nicht korrekt angezeigt
- A-05: Modal schließt nicht beim X-Klick
- F-01: Logout-Button funktioniert nicht
- F-03: Filter zeigt falsche Ergebnisse
- V-01: Login akzeptiert leere Felder
- V-02: Ungültige E-Mails werden akzeptiert
- V-03: Zu kurze Passwörter werden akzeptiert

#### Fortgeschrittenen-Set (4-5 Unterrichtsstunden) - 14 Fehler
Basis-Set + zusätzlich:
- A-03: Raumnummer abgeschnitten auf Mobile
- A-04: Überschneidende Kurse falsch dargestellt
- F-04: PDF-Export erstellt leere Datei
- F-05: Detailansicht zeigt falsche Lehrkraft
- F-06: Zeitformat falsch
- R-01: Layout bricht auf Tablets

#### Experten-Set (6-9 Unterrichtsstunden) - Alle 18 Fehler
Fortgeschrittenen-Set + zusätzlich:
- V-04: SQL-Injection möglich (nur wenn Thema behandelt!)
- R-02: Buttons zu klein auf Mobile
- R-03: Horizontales Scrollen auf Mobile
- P-01: Ladezeit über 5 Sekunden

---

## Detaillierte Fehlerbeschreibungen

### KATEGORIE 1: ANZEIGEPROBLEME (UI-BUGS)

#### Fehler A-01: Liste aktualisiert sich nicht nach Login
**Severity:** 🔴 HOCH

**Beschreibung:**
Nach erfolgreichem Login wird der Stundenplan nicht automatisch angezeigt. Erst nach manuellem Neuladen (F5) erscheint der Stundenplan.

**Ort im Code:**
`App.tsx`, Zeile mit `// setUser(loggedUser);` (auskommentiert)

**Wie finden:**
```
Testfall A-01: Stundenplan-Anzeige nach Login
1. Login-Seite öffnen
2. Korrekte Zugangsdaten eingeben (max.mustermann@email.com / test123)
3. "Anmelden"-Button klicken
4. 6,7 Sekunden warten (Performance-Bug)
5. Erwartetes Ergebnis: Stundenplan wird sofort angezeigt
6. Tatsächliches Ergebnis: Leere Seite, erst nach F5 sichtbar
7. Status: FEHLER
```

**Testverfahren:** Black-Box-Test

---

#### Fehler A-02: Farben der Kurse werden nicht korrekt angezeigt
**Severity:** 🟠 MITTEL

**Beschreibung:**
Alle Kurse haben die gleiche Farbe (grau #CCCCCC) statt unterschiedlicher Farben je nach Sprachniveau.

**Ort im Code:**
`constants.ts`, `LEVEL_COLORS` - alle auf `'#CCCCCC'` gesetzt

**Wie finden:**
```
Testfall A-02: Farbcodierung nach Sprachniveau
1. Stundenplan öffnen (nach F5)
2. Kurse verschiedener Niveaus ansehen
3. Erwartetes Ergebnis:
   - A1 = Hellgrün (#90EE90)
   - B2 = Blau (#4169E1)
   - C1 = Orange (#FFA500)
4. Tatsächliches Ergebnis: Alle Kurse grau (#CCCCCC)
5. Status: FEHLER
```

**Sollwerte laut Spezifikation:**
| Niveau | Farbe | Hex-Code |
|--------|-------|----------|
| A1 | Hellgrün | #90EE90 |
| A2 | Grün | #32CD32 |
| B1 | Hellblau | #87CEEB |
| B2 | Blau | #4169E1 |
| C1 | Orange | #FFA500 |
| C2 | Rot | #FF6347 |

**Testverfahren:** Black-Box-Test (Visuelle Inspektion)

---

#### Fehler A-03: Raumnummer wird abgeschnitten auf Mobile
**Severity:** 🟢 NIEDRIG

**Beschreibung:**
Auf Smartphones wird die Raumnummer nicht vollständig angezeigt ("Raum 2..." statt "Raum 204").

**Ort im Code:**
`components/Schedule.tsx`, Zeile mit `<span className="w-12 truncate block">{course.room}</span>`

**Wie finden:**
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

**Testverfahren:** Responsive-Test

---

#### Fehler A-04: Überschneidende Kurse werden nicht korrekt dargestellt
**Severity:** 🟠 MITTEL

**Beschreibung:**
Wenn zwei Kurse zeitgleich stattfinden, überlagern sie sich visuell. Nur ein Kurs ist sichtbar, der andere verdeckt.

**Ort im Code:**
- `constants.ts`: Kurs `C001_OVERLAP` wurde hinzugefügt (zeitgleich mit C001)
- `components/Schedule.tsx`: Keine Logik für überlappende Kurse

**Wie finden:**
```
Testfall A-04: Überschneidende Kurse
1. Stundenplan öffnen
2. Montag 08:00 Uhr ansehen
3. Erwartetes Ergebnis: Beide Kurse nebeneinander oder Warnung
4. Tatsächliches Ergebnis: Nur ein Kurs sichtbar
5. Status: FEHLER
```

**Testverfahren:** Black-Box-Test mit speziellen Testdaten

---

#### Fehler A-05: Modal schließt nicht beim Klick auf "X"
**Severity:** 🔴 HOCH

**Beschreibung:**
Das Detailansicht-Modal kann nicht über den X-Button geschlossen werden. Nutzer ist "gefangen".

**Ort im Code:**
`components/CourseDetailModal.tsx`, onClick-Handler führt nur `console.log` aus, ruft aber nicht `onClose` auf

**Wie finden:**
```
Testfall A-05: Modal schließen
1. Beliebigen Kurs im Stundenplan anklicken
2. Detailansicht (Modal) öffnet sich
3. Auf "X"-Button oben rechts klicken
4. Erwartetes Ergebnis: Modal schließt sich
5. Tatsächliches Ergebnis: Nichts passiert, Modal bleibt offen
6. Status: FEHLER
```

**Workaround für Tester:** Seite neu laden (F5)

**Testverfahren:** Black-Box-Test

---

### KATEGORIE 2: FUNKTIONSDEFEKTE

#### Fehler F-01: Logout-Button funktioniert nicht
**Severity:** 🔴 HOCH (Sicherheitsrisiko)

**Beschreibung:**
Klick auf Logout-Button führt nicht zur Abmeldung. Nutzer bleibt eingeloggt.

**Ort im Code:**
`App.tsx`, `handleLogout` führt nur `console.log` aus, `AuthService.logout()` ist auskommentiert

**Wie finden:**
```
Testfall F-01: Logout-Funktion
1. Einloggen mit max.mustermann@email.com / test123
2. F5 drücken, um Stundenplan zu sehen
3. Auf "Logout"-Button (oben rechts) klicken
4. Erwartetes Ergebnis: Weiterleitung zur Login-Seite
5. Tatsächliches Ergebnis: Nichts passiert, User bleibt eingeloggt
6. Status: FEHLER
```

**Testverfahren:** Black-Box-Test

---

#### Fehler F-03: Filter-Funktion zeigt falsche Ergebnisse
**Severity:** 🟠 MITTEL

**Beschreibung:**
Filter-Dropdown zeigt alle Kurse, egal welche Auswahl getroffen wird.

**Ort im Code:**
`components/Schedule.tsx`, Zeile `const filteredCourses = courses;` ignoriert Filter

**Wie finden:**
```
Testfall F-03: Filterfunktion testen
1. Stundenplan öffnen (mit mehreren verschiedenen Sprachen)
2. Filter auf "Nur Englisch" setzen
3. Erwartetes Ergebnis: Nur Englisch-Kurse sichtbar
4. Tatsächliches Ergebnis: Alle Kurse weiterhin sichtbar
5. Filter auf "Nur Deutsch" ändern
6. Erwartetes Ergebnis: Nur Deutsch-Kurse sichtbar
7. Tatsächliches Ergebnis: Wieder alle Kurse sichtbar
8. Status: FEHLER
```

**Testverfahren:** Black-Box-Test

---

#### Fehler F-04: PDF-Export erstellt leere Datei
**Severity:** 🟠 MITTEL

**Beschreibung:**
"Als PDF speichern"-Button zeigt nur ein Alert mit "PDF wurde erstellt (0 KB)", erstellt aber keine Datei.

**Ort im Code:**
`components/Schedule.tsx`, Button löst nur `alert("PDF wurde erstellt (0 KB)")` aus

**Wie finden:**
```
Testfall F-04: PDF-Export
1. Stundenplan vollständig laden
2. Auf "Als PDF speichern"-Button klicken
3. Erwartetes Ergebnis: PDF-Datei wird heruntergeladen
4. Tatsächliches Ergebnis: Nur Alert-Meldung, keine Datei
5. Downloads-Ordner prüfen
6. Erwartetes Ergebnis: Neue PDF-Datei vorhanden
7. Tatsächliches Ergebnis: Keine Datei
8. Status: FEHLER
```

**Testverfahren:** Black-Box-Test

---

#### Fehler F-05: Detailansicht zeigt falsche Lehrkraft
**Severity:** 🟠 MITTEL

**Beschreibung:**
Modal zeigt immer "Sarah Miller" als Lehrkraft, auch für Kurse anderer Lehrkräfte.

**Ort im Code:**
`components/CourseDetailModal.tsx`, Zeile `<p className="font-medium">Sarah Miller</p>` ist hardcoded

**Wie finden:**
```
Testfall F-05: Korrekte Lehrkraft-Anzeige
1. Kurs "Deutsch A1" anklicken (Lehrkraft laut Daten: Thomas Schmidt)
2. Detailansicht prüfen
3. Erwartetes Ergebnis: "Thomas Schmidt" angezeigt
4. Tatsächliches Ergebnis: "Sarah Miller" angezeigt
5. Modal schließen (F5 drücken, wegen Bug A-05)
6. Anderen Kurs anklicken (z.B. Spanisch)
7. Erwartetes Ergebnis: Korrekte Lehrkraft für diesen Kurs
8. Tatsächliches Ergebnis: Wieder "Sarah Miller"
9. Status: FEHLER
```

**Testverfahren:** Black-Box-Test + Unit-Test (Datenbank-Abfrage)

---

#### Fehler F-06: Uhrzeit wird im falschen Format angezeigt
**Severity:** 🟢 NIEDRIG

**Beschreibung:**
Zeiten werden als "8:0" statt "08:00" angezeigt (fehlende führende Nullen).

**Ort im Code:**
`constants.ts`, in `MOCK_COURSES` sind Zeiten wie `'8:0'` statt `'08:00'` hinterlegt

**Wie finden:**
```
Testfall F-06: Zeitformat prüfen
1. Stundenplan öffnen
2. Alle Zeitangaben durchsehen
3. Erwartetes Format: "08:00 - 09:30" (mit führenden Nullen)
4. Tatsächliches Format: "8:0 - 9:30" (ohne führende Nullen)
5. Status: FEHLER
```

**Testverfahren:** Black-Box-Test (Visuelle Inspektion) + Unit-Test (Formatierungsfunktion)

---

### KATEGORIE 3: VALIDIERUNGSFEHLER

#### Fehler V-01: Login akzeptiert leere Felder
**Severity:** 🟠 MITTEL

**Beschreibung:**
"Anmelden"-Button funktioniert auch ohne Eingabe von E-Mail oder Passwort.

**Ort im Code:**
`components/Login.tsx`, `required`-Attribut aus Input-Feldern entfernt

**Wie finden:**
```
Testfall V-01: Login ohne Eingabe
1. Login-Seite öffnen
2. Felder für E-Mail und Passwort LEER lassen
3. Auf "Anmelden"-Button klicken
4. Erwartetes Ergebnis: Fehlermeldung "Bitte alle Felder ausfüllen"
5. Tatsächliches Ergebnis: Login-Versuch wird durchgeführt
6. Status: FEHLER
```

**Testverfahren:** Black-Box-Test

---

#### Fehler V-02: Ungültige E-Mail-Adressen werden akzeptiert
**Severity:** 🟢 NIEDRIG

**Beschreibung:**
E-Mails ohne "@" oder Domain-Endung werden als gültig akzeptiert.

**Ort im Code:**
`components/Login.tsx`, Input-Feld ist `type="text"` statt `type="email"`

**Wie finden:**
```
Testfall V-02: E-Mail-Formatprüfung

Test 1:
1. E-Mail-Feld: "maxmustermann" (ohne @)
2. Passwort: "test123"
3. Anmelden klicken
4. Erwartetes Ergebnis: Fehlermeldung "Ungültige E-Mail"
5. Tatsächliches Ergebnis: Wird akzeptiert

Test 2:
1. E-Mail-Feld: "max@test" (ohne .com/.de)
2. Passwort: "test123"
3. Anmelden klicken
4. Erwartetes Ergebnis: Fehlermeldung "Ungültige E-Mail"
5. Tatsächliches Ergebnis: Wird akzeptiert

6. Status: FEHLER
```

**Testverfahren:** Black-Box-Test mit Grenzwertanalyse

---

#### Fehler V-03: Passwort-Feld akzeptiert zu kurze Passwörter
**Severity:** 🟠 MITTEL (Sicherheitsrisiko)

**Beschreibung:**
Sehr kurze Passwörter (z.B. "12" mit nur 2 Zeichen) werden akzeptiert.

**Ort im Code:**
`services/authService.ts`, Validierung erlaubt explizit Passwort `'12'`

**Wie finden:**
```
Testfall V-03: Passwort-Mindestlänge
1. E-Mail: "max.mustermann@email.com"
2. Passwort: "12" (nur 2 Zeichen)
3. Anmelden klicken
4. Erwartetes Ergebnis: Fehlermeldung "Passwort muss mindestens 6 Zeichen haben"
5. Tatsächliches Ergebnis: Login erfolgreich
6. Status: FEHLER
```

**Best Practice:** Mindestens 8-12 Zeichen, Kombination aus Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen

**Testverfahren:** Black-Box-Test

---

#### Fehler V-04: SQL-Injection möglich im Login-Formular
**Severity:** 🔴 KRITISCH (Sicherheitslücke!)

**Beschreibung:**
Eingabe von `' OR '1'='1` im Passwort-Feld umgeht die Authentifizierung komplett.

**Ort im Code:**
`services/authService.ts`, explizite Abfrage: `if (... || password.includes("' OR '1'='1"))`

**Wie finden:**
```
Testfall V-04: SQL-Injection-Test
1. E-Mail: "beliebig@test.com" (egal was)
2. Passwort: ' OR '1'='1
3. Anmelden klicken
4. Erwartetes Ergebnis: Login fehlgeschlagen
5. Tatsächliches Ergebnis: Login erfolgreich (!)
6. Status: FEHLER (KRITISCH!)
```

**Hinweis für Lehrkraft:**
Dieser Fehler sollte nur eingebaut werden, wenn SQL-Injection im Unterricht thematisiert wird. Er ist komplex und setzt Verständnis von Datenbankabfragen voraus.

**Testverfahren:** White-Box-Test (fortgeschritten) oder Black-Box-Test mit Security-Fokus

---

### KATEGORIE 4: RESPONSIVE-FEHLER

#### Fehler R-01: Layout bricht auf Tablets (768px)
**Severity:** 🟠 MITTEL

**Beschreibung:**
Stundenplan-Grid wird auf iPad/Tablets unlesbar (überlappende Elemente).

**Ort im Code:**
`components/Schedule.tsx`, Grid nutzt `minmax(200px, 1fr)` für 6 Spalten = mind. 1200px Breite nötig, aber Tablets haben nur 768px

**Wie finden:**
```
Testfall R-01: Tablet-Ansicht (768px)
1. Browser-Entwicklertools öffnen (F12)
2. Responsive Design Mode aktivieren
3. Breite auf 768px (iPad) einstellen
4. Stundenplan öffnen
5. Erwartetes Ergebnis: Grid passt sich an, bleibt lesbar
6. Tatsächliches Ergebnis: Elemente überlappen, Text unleserlich
7. Status: FEHLER
```

**Testverfahren:** Responsive-Test / System-Test

---

#### Fehler R-02: Buttons zu klein auf Mobile (<44px)
**Severity:** 🟠 MITTEL (Usability-Problem)

**Beschreibung:**
Beide Buttons im Modal (X-Button und Schließen-Button) sind auf dem Smartphone viel zu klein und schwer zu treffen.

**Ort im Code:**
`components/CourseDetailModal.tsx`
- X-Button (oben rechts): `w-4 h-4` (16x16px)
- Schließen-Button (unten): `px-2 py-1 text-xs` (~60x24px)

**Wie finden:**
```
Testfall R-02: Button-Größe auf Mobile
1. Mobile-Ansicht aktivieren (375px - iPhone SE)
2. Detailansicht öffnen (Kurs anklicken)
3. Versuche, auf den "X"-Button oben rechts zu klicken
4. Erwartetes Ergebnis: Klick wird sofort registriert
5. Tatsächliches Ergebnis: Sehr schwer zu treffen, Button ist winzig (nur 16x16px)
6. Größe des "X"-Buttons mit Entwicklertools prüfen (Element inspizieren)
7. Erwartetes Ergebnis: Mind. 44x44px (WCAG 2.1 Standard)
8. Tatsächliches Ergebnis: Nur 16x16px (36% der empfohlenen Größe!)
9. Auch den "Schließen"-Button unten prüfen
10. Erwartetes Ergebnis: Mind. 44x44px
11. Tatsächliches Ergebnis: Nur ~60x24px (Höhe zu gering)
12. Status: FEHLER
```

**Accessibility-Standard:** WCAG 2.1 Level AAA empfiehlt mindestens 44x44 CSS-Pixel für Touch-Targets. Beide Buttons liegen deutlich darunter!

**Testverfahren:** Responsive-Test + Accessibility-Test

---

#### Fehler R-03: Horizontales Scrollen nötig auf Smartphone
**Severity:** 🔴 HOCH

**Beschreibung:**
Stundenplan-Tabelle ist breiter als Smartphone-Bildschirm, horizontales Scrollen erforderlich.

**Ort im Code:**
`components/Schedule.tsx`, Wrapper hat `min-w-[500px]`, aber Smartphones sind nur ~375px breit

**Wie finden:**
```
Testfall R-03: Kein horizontales Scrollen
1. Mobile-Ansicht (375px) aktivieren
2. Stundenplan öffnen
3. Erwartetes Ergebnis: Kompletter Inhalt ohne horizontales Scrollen sichtbar
4. Tatsächliches Ergebnis: Tabelle zu breit, Scrollen nach rechts nötig
5. Status: FEHLER
```

**UX-Regel:** Auf Mobile sollte NIEMALS horizontales Scrollen erforderlich sein (außer bei Bildergalerien).

**Testverfahren:** Responsive-Test / System-Test

---

### KATEGORIE 5: PERFORMANCE-PROBLEME

#### Fehler P-01: Ladezeit über 5 Sekunden
**Severity:** 🟢 NIEDRIG (aber sehr nervig)

**Beschreibung:**
WebApp braucht 6,7 Sekunden zum Laden (künstlicher Delay).

**Ort im Code:**
`services/authService.ts`, künstlicher Delay `setTimeout(resolve, 6700)` (6,7 Sekunden)

**Wie finden:**
```
Testfall P-01: Ladezeit der WebApp
1. Browser-Entwicklertools öffnen (F12)
2. "Network"-Tab auswählen
3. Login durchführen
4. Ladezeit beobachten
5. Erwartetes Ergebnis: < 2 Sekunden (Google-Standard)
6. Tatsächliches Ergebnis: 6,7 Sekunden
7. Status: FEHLER
```

**Performance-Standard:**
- Google PageSpeed: < 2,5 Sekunden als "gut"
- Nutzer verlieren Geduld nach 3 Sekunden

**Testverfahren:** System-Test + Performance-Test (fortgeschritten)

---

## Funktionale Anforderungen

### Must-Have-Funktionen (Prio 1)

| ID | Anforderung | Beschreibung |
|----|-------------|--------------|
| F-01 | Login | Schüler können sich mit E-Mail und Passwort einloggen |
| F-02 | Fehleranzeige | Bei falscher Eingabe erscheint Fehlermeldung |
| F-03 | Stundenplan-Woche | Wochenübersicht zeigt Mo-Fr in Spalten |
| F-04 | Zeitraster | Zeitraster von 08:00-20:00 Uhr |
| F-05 | Kurskacheln | Kurse als farbige Kacheln im Zeitslot |
| F-06 | Farbcodierung | Farben nach Sprachniveau (A1-C2) |
| F-07 | Detailansicht | Klick auf Kurs öffnet Modal mit Details |
| F-08 | Kursinfos | Anzeige: Name, Raum, Lehrkraft, Uhrzeit, Niveau |
| F-09 | Logout | Logout-Button oben rechts |
| F-10 | Responsive | Funktioniert auf Desktop, Tablet, Smartphone |

### Nice-to-Have-Funktionen (Prio 2)

| ID | Anforderung | Status in aktueller Version |
|----|-------------|----------------------------|
| F-11 | PDF-Export | ❌ Nicht implementiert (nur Dummy-Button) |
| F-12 | Filter | ⚠️ Implementiert, aber defekt (Fehler F-03) |
| F-13 | Notizfeld | ❌ Nicht implementiert |

### Ausschlusskriterien (NICHT Teil der App)

- ❌ Buchungsfunktion (Kurse werden durch Verwaltung zugewiesen)
- ❌ Chat-Funktion zwischen Schülern
- ❌ Hausaufgaben-/Lernmaterial-Verwaltung
- ❌ Echte Datenbank oder Backend-API
- ❌ Passwort zurücksetzen (nur Info-Text)

---

## Datenmodell

### User (Benutzer)

```json
{
  "userId": "12345",
  "email": "max.mustermann@email.com",
  "password": "test123",
  "firstName": "Max",
  "lastName": "Mustermann"
}
```

**Speicherort:** `constants.ts` als `MOCK_USER`

---

### Course (Kurs)

```json
{
  "courseId": "C001",
  "courseName": "Englisch B2",
  "language": "Englisch",
  "level": "B2",
  "teacher": "Sarah Miller",
  "room": "204",
  "dayOfWeek": "Monday",
  "startTime": "08:00",
  "endTime": "09:30",
  "color": "#4169E1"
}
```

**Speicherort:** `constants.ts` als `MOCK_COURSES` (Array)

**Beispiel-Kurse in der App:**
- C001: Englisch B2 (Montag + Mittwoch, 08:00-09:30, Raum 204, Sarah Miller)
- C002: Deutsch A1 (Dienstag + Donnerstag, 10:00-11:30, Raum 101, Thomas Schmidt)
- C003: Spanisch B1 (Mittwoch + Freitag, 14:00-15:30, Raum 305, Maria Garcia)
- C004: Französisch A2 (Montag + Donnerstag, 16:00-17:30, Raum 202, Pierre Dubois)

---

### Farbschema für Sprachniveaus

| Niveau | Beschreibung | Farbe | Hex-Code |
|--------|--------------|-------|----------|
| A1 | Anfänger | Hellgrün | #90EE90 |
| A2 | Grundlagen | Grün | #32CD32 |
| B1 | Mittelstufe | Hellblau | #87CEEB |
| B2 | Fortgeschritten | Blau | #4169E1 |
| C1 | Kompetent | Orange | #FFA500 |
| C2 | Meisterschaft | Rot | #FF6347 |

**Aktuell im Code:** Alle auf `#CCCCCC` (Grau) gesetzt - **das ist Fehler A-02!**

---

## User Stories

### Sprint 1: Grundfunktionen

**US-01:** Als Sprachschüler möchte ich mich mit E-Mail und Passwort einloggen können, um meinen persönlichen Stundenplan zu sehen.

**US-02:** Als Sprachschüler möchte ich eine Wochenübersicht sehen, um alle meine Kurse auf einen Blick zu haben.

**US-03:** Als Sprachschüler möchte ich Kurse farblich nach Niveau unterscheiden, um leichter zwischen meinen verschiedenen Sprachkursen zu unterscheiden.

### Sprint 2: Detailfunktionen & Interaktivität

**US-04:** Als Sprachschüler möchte ich auf einen Kurs klicken können, um Details wie Raumnummer und Lehrkraft zu sehen.

**US-05:** Als Sprachschüler möchte ich mich ausloggen können, um meine Daten zu schützen.

**US-06:** Als Sprachschüler möchte ich die App auf meinem Smartphone nutzen können, um unterwegs meinen Stundenplan zu checken.

### Sprint 3: Responsive & Extras

**US-07:** Als Sprachschüler möchte ich die App auf Tablet und Desktop verwenden können, mit optimaler Darstellung.

**US-08:** Als Sprachschüler möchte ich Kurse nach Sprache filtern können, wenn ich nur meine Englischkurse sehen will.

---

## Unterrichtshinweise

### Empfohlene Unterrichtsstruktur

#### Phase 1: Einführung (1 UE = Unterrichtseinheit)
- Vorstellung des Projekts und der fiktiven Sprachschule
- Erklärung der Testverfahren (Black-Box, White-Box, Unit-Tests, Systemtests)
- Live-Demo der WebApp (mit Fehlern)
- Ausgabe der Login-Daten
- Bildung von Testteams (2-3 Personen pro Team)

#### Phase 2: Testphase (2-4 UE)
- Teams testen die WebApp systematisch
- Verwendung des Testprotokolls (siehe unten)
- Dokumentation gefundener Fehler mit Screenshots
- Optional: Konkurrenzmodus (Welches Team findet die meisten Fehler?)

#### Phase 3: Auswertung (1 UE)
- Teams präsentieren ihre gefundenen Fehler
- Vergleich mit Musterlösung
- Diskussion: Welche Fehler waren am schwersten zu finden?
- Reflexion: Was haben wir über Testing gelernt?

#### Phase 4: Behebung (Optional, 2-3 UE)
- Fortgeschrittene Schüler versuchen, Fehler im Code zu beheben
- Pair Programming
- Code Review

### Differenzierung nach Leistungsniveau

#### Schwache Schüler / Anfänger
**Fehler-Set:** Nur 5-8 leichte Fehler aus Kategorie "Anzeigeprobleme"
- A-01, A-02, A-05
- F-01, F-03
- V-01, V-02

**Fokus:** Black-Box-Testing, visuelle Inspektion

**Hilfsmittel:** Detaillierte Checkliste mit Testschritten

---

#### Mittlere Schüler
**Fehler-Set:** 10-14 Fehler aus Kategorien Anzeige + Funktionen + Validierung
- Alle aus "Anfänger" +
- A-03, A-04
- F-04, F-05, F-06
- V-03, R-03

**Fokus:** Black-Box + erste Responsive-Tests

**Hilfsmittel:** Testprotokoll-Vorlage

---

#### Starke Schüler / Fortgeschrittene
**Fehler-Set:** Alle 18 Fehler inklusive kritischer Sicherheitslücke
- Alle Fehler +
- V-04 (SQL-Injection)
- R-01, R-02
- P-01

**Fokus:** Alle Testverfahren inkl. White-Box, Security-Tests, Performance-Tests

**Zusatzaufgabe:** Fehler beheben und Code verbessern

---

### Testprotokoll-Vorlage für Schüler

```
═══════════════════════════════════════════════════════
TESTPROTOKOLL - SprachPlan WebApp
═══════════════════════════════════════════════════════

ALLGEMEINE INFORMATIONEN
─────────────────────────────────────────────────────
Tester/Team:        ______________________________
Datum:              ______________________________
Testumgebung:       [ ] Desktop  [ ] Tablet  [ ] Smartphone
Browser:            ______________________________
Bildschirmauflösung: ______________________________

═══════════════════════════════════════════════════════
FEHLER-DOKUMENTATION
═══════════════════════════════════════════════════════

FEHLER #1
─────────────────────────────────────────────────────
Fehler-ID:          ________ (z.B. A-01)
Titel:              _____________________________________

Schweregrad:        [ ] Kritisch  [ ] Hoch  [ ] Mittel  [ ] Niedrig

Beschreibung:
__________________________________________________________
__________________________________________________________
__________________________________________________________

Schritte zur Reproduktion:
1. ______________________________________________________
2. ______________________________________________________
3. ______________________________________________________
4. ______________________________________________________

Erwartetes Ergebnis:
__________________________________________________________
__________________________________________________________

Tatsächliches Ergebnis:
__________________________________________________________
__________________________________________________________

Screenshot:         [ ] Angehängt  [ ] Nicht verfügbar

Testverfahren:      [ ] Black-Box-Test
                    [ ] White-Box-Test
                    [ ] Unit-Test
                    [ ] Integrationstest
                    [ ] Systemtest
                    [ ] Responsive-Test
                    [ ] Performance-Test
                    [ ] Security-Test

─────────────────────────────────────────────────────

[Weitere Fehler auf separaten Blättern oder kopiere diese Vorlage]

═══════════════════════════════════════════════════════
ZUSAMMENFASSUNG
═══════════════════════════════════════════════════════

Gesamt gefundene Fehler:     ________

Davon:
  - Kritisch:                ________
  - Hoch:                    ________
  - Mittel:                  ________
  - Niedrig:                 ________

Testdauer:                   ________ Stunden

Besondere Beobachtungen:
__________________________________________________________
__________________________________________________________
__________________________________________________________

Unterschrift(en):            ______________________________
```

---

### Tipps für die Lehrkraft

#### Vorbereitung
1. ✅ App selbst einmal komplett durchspielen
2. ✅ Alle 18 Fehler kennen und verstehen
3. ✅ Login-Daten an Tafel schreiben
4. ✅ Testprotokolle ausdrucken (oder digital bereitstellen)
5. ✅ Browser-Entwicklertools kurz demonstrieren (F12)

#### Während des Unterrichts
1. **Start mit Live-Demo**: App zeigen, Login durchführen, Hauptfunktionen zeigen
2. **Tipp-System**: Bei jedem Sprint ein paar Hinweise geben
   - Sprint 1: "Schaut euch die Farben genau an..."
   - Sprint 2: "Versucht, das Modal zu schließen..."
   - Sprint 3: "Testet auf verschiedenen Bildschirmgrößen..."
3. **Konkurrenz fördern**: "Wer findet als erstes 5 Fehler?"
4. **Hilfestellung**: Bei schwachen Schülern konkrete Testfälle vorgeben

#### Häufige Fragen von Schülern

**"Warum passiert nach dem Login nichts?"**
→ Das ist ein Fehler! Drückt F5 zum Neuladen.

**"Wie kann ich das Modal schließen?"**
→ Das ist auch ein Fehler! Dokumentiert das.

**"Soll die App wirklich so lange laden?"**
→ Nein, das ist ein Performance-Fehler.

**"Darf ich den Code ansehen?"**
→ Ja, für fortgeschrittene Tests (White-Box) ist das sogar wichtig.

---

## Bewertungskriterien

### Vorschlag für Notenvergabe

#### Bewertungsrubrik pro Fehler (0-10 Punkte)

| Kriterium | Punkte | Beschreibung |
|-----------|---------|--------------|
| **Vollständigkeit** | 0-3 | Alle relevanten Infos erfasst? (Titel, Beschreibung, Schritte) |
| **Reproduzierbarkeit** | 0-3 | Kann ein anderer den Fehler nachvollziehen? |
| **Schweregrad korrekt** | 0-2 | Richtige Priorisierung (Kritisch/Hoch/Mittel/Niedrig)? |
| **Screenshot/Beweis** | 0-2 | Visueller Beweis oder Erklärung vorhanden? |

**Maximalpunktzahl pro Fehler:** 10 Punkte

---

#### Notenskala (Beispiel für Basis-Set mit 8-10 Fehlern)

| Punkte | Gefundene Fehler | Note |
|--------|------------------|------|
| 80-100 | 8-10 (alle gut dokumentiert) | 1 (Sehr gut) |
| 60-79 | 6-7 (meiste gut dokumentiert) | 2 (Gut) |
| 40-59 | 4-5 (Basis-Dokumentation) | 3 (Befriedigend) |
| 20-39 | 2-3 (wenige Fehler gefunden) | 4 (Ausreichend) |
| 0-19 | 0-1 (kaum Fehler gefunden) | 5 (Mangelhaft) |

---

#### Zusatzpunkte (Bonus)

| Kriterium | Bonus-Punkte |
|-----------|--------------|
| Besonders schwierige Fehler gefunden (V-04, P-01, R-01) | +10 pro Fehler |
| Performance-Tests mit Entwicklertools durchgeführt | +15 |
| Verbesserungsvorschläge formuliert | +10 |
| Code-Analyse (White-Box) durchgeführt | +20 |
| Fehler im Code behoben | +30 |

---

#### Bewertung nach Kompetenzen (Alternative)

| Kompetenz | Gewichtung | Beschreibung |
|-----------|------------|--------------|
| **Fachkompetenz** | 40% | Anzahl und Qualität gefundener Fehler |
| **Methodenkompetenz** | 30% | Anwendung verschiedener Testverfahren |
| **Sozialkompetenz** | 20% | Teamarbeit, Kommunikation |
| **Selbstkompetenz** | 10% | Selbstständigkeit, Sorgfalt |

---

### Definition of Done (für eduScrum)

Ein Fehler gilt als korrekt dokumentiert, wenn:

- ✅ Titel ist präzise und beschreibt das Problem
- ✅ Schritte zur Reproduktion sind vollständig
- ✅ Erwartetes und tatsächliches Ergebnis sind klar beschrieben
- ✅ Schweregrad ist logisch begründet
- ✅ Mindestens ein Testverfahren ist genannt
- ✅ Screenshot oder detaillierte Beschreibung liegt vor

---

## Checkliste für Lehrkraft

### Vor Projektstart

- [ ] WebApp lokal oder auf Server bereitstellen
- [ ] Login-Daten testen (max.mustermann@email.com / test123)
- [ ] Alle 18 Fehler selbst einmal durchgehen
- [ ] Testprotokolle vorbereiten (ausdrucken oder digital)
- [ ] Browser-Entwicklertools-Tutorial vorbereiten
- [ ] Teams einteilen (2-3 Personen pro Team)
- [ ] Zeitplan festlegen (2-4 Unterrichtseinheiten für Testphase)

### Während der Sprints

- [ ] Daily Standup moderieren (5 Min. am Anfang jeder Stunde)
  - Was haben wir gestern erreicht?
  - Was machen wir heute?
  - Gibt es Hindernisse?
- [ ] Sprint Review nach jedem Sprint (15-20 Min.)
  - Teams präsentieren gefundene Fehler
- [ ] Sprint Retrospektive (10 Min.)
  - Was lief gut?
  - Was können wir verbessern?
- [ ] Definition of Done prüfen

### Nach Projektende

- [ ] Testprotokolle einsammeln und bewerten
- [ ] Fehler-Rangliste erstellen (Wer fand die meisten?)
- [ ] Reflexion: Was haben die Schüler über Testing gelernt?
- [ ] Feedback zur eduScrum-Methode einholen
- [ ] Optional: Code-Review-Session für Fortgeschrittene

---

## Technische Installation (für Lehrkraft)

### Voraussetzungen
- Node.js (Version 16 oder höher)
- npm oder yarn
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# 1. In das Projektverzeichnis wechseln
cd sprachplan

# 2. Abhängigkeiten installieren
npm install

# 3. Entwicklungsserver starten
npm run dev

# 4. Browser öffnen
# Die App läuft auf: http://localhost:5173
```

### Deployment (optional)

```bash
# Produktions-Build erstellen
npm run build

# Der "dist"-Ordner kann dann auf einem Webserver bereitgestellt werden
```

### Häufige Probleme

**Problem:** "Module not found"
**Lösung:** `npm install` erneut ausführen

**Problem:** Port 5173 bereits belegt
**Lösung:** Anderen Port verwenden: `npm run dev -- --port 5174`

**Problem:** Seite lädt nicht
**Lösung:** Browser-Cache leeren (Strg + Shift + R)

---

## Lernziele und Kompetenzen

### Fachliche Kompetenzen

Die Schülerinnen und Schüler können...

- [ ] verschiedene Testverfahren unterscheiden und anwenden (Black-Box, White-Box, System-Tests)
- [ ] Fehler systematisch identifizieren und reproduzieren
- [ ] Fehlerberichte nach professionellem Standard erstellen
- [ ] Schweregrade von Bugs einschätzen und priorisieren
- [ ] Browser-Entwicklertools für Tests einsetzen
- [ ] Responsive Design auf verschiedenen Geräten testen
- [ ] Sicherheitslücken (wie SQL-Injection) erkennen
- [ ] Performance-Probleme identifizieren

### Methodische Kompetenzen

Die Schülerinnen und Schüler können...

- [ ] selbstständig Testfälle entwickeln und durchführen
- [ ] Testergebnisse strukturiert dokumentieren
- [ ] Testprotokolle nach Vorgaben erstellen
- [ ] Screenshots zur Fehlerdarstellung nutzen
- [ ] eduScrum-Methodik im Team anwenden
- [ ] Sprint-Reviews und Retrospektiven durchführen

### Soziale Kompetenzen

Die Schülerinnen und Schüler können...

- [ ] im Team kommunizieren und kooperieren
- [ ] Arbeitsergebnisse vor der Klasse präsentieren
- [ ] konstruktives Feedback geben und annehmen
- [ ] Aufgaben im Team verteilen
- [ ] gemeinsam Probleme lösen

### Selbstkompetenzen

Die Schülerinnen und Schüler können...

- [ ] ihre Arbeit selbstständig organisieren
- [ ] sorgfältig und genau arbeiten
- [ ] Frustrationstoleranz zeigen (bei schwer findbaren Fehlern)
- [ ] ihre eigenen Testergebnisse kritisch reflektieren

---

## Erweiterungsmöglichkeiten

### Für fortgeschrittene Klassen

1. **Code-Behebung:** Schüler versuchen, die Fehler im Code zu finden und zu beheben
2. **Neue Features entwickeln:** PDF-Export wirklich implementieren
3. **Eigene Testfälle schreiben:** Mit Testing-Frameworks (Jest, Vitest)
4. **API-Anbindung:** Echte Backend-API erstellen (z.B. mit Express.js)
5. **Datenbank einbinden:** SQLite oder MongoDB für echte Datenpersistenz
6. **CI/CD-Pipeline:** Automatisierte Tests bei jedem Commit

### Projektvarianten

1. **Andere Domäne:** Fitnessstudio-Kursplan, Schulstundenplan, Bibliotheksreservierung
2. **Mehr Komplexität:** Buchungsfunktion, Benachrichtigungen, Admin-Panel
3. **Andere Technologie:** Vue.js statt React, plain JavaScript ohne Framework

---

## Reflexionsfragen für Schüler

### Nach der Testphase

1. Welcher Fehler war am einfachsten zu finden? Warum?
2. Welcher Fehler war am schwierigsten? Warum?
3. Welches Testverfahren fandet ihr am nützlichsten?
4. Warum ist Testing in der Software-Entwicklung wichtig?
5. Was passiert, wenn solche Fehler in echten Apps vorkommen?
6. Wie fühlt es sich an, als "Tester" zu arbeiten?
7. Was würdet ihr anders machen, wenn ihr die App selbst entwickeln müsstet?

### Nach der Code-Analyse (für Fortgeschrittene)

1. Waren die Fehler schwer zu beheben?
2. Wie kann man solche Fehler in Zukunft vermeiden?
3. Was habt ihr über Code-Qualität gelernt?
4. Welche Fehler wären durch automatisierte Tests vermeidbar?

---

## Zusammenfassung

Die WebApp **SprachPlan** ist ein realistisches, aber bewusst einfach gehaltenes Projekt für den Berufsschulunterricht. Mit **18 absichtlich eingebauten Fehlern** in 5 Kategorien bietet sie:

✅ **Praxisnahe Übung** in Software-Testing
✅ **Verschiedene Schwierigkeitsgrade** für differenzierten Unterricht
✅ **Realistische Bugs** aus verschiedenen Kategorien
✅ **Einfache Technologie** ohne komplexes Backend
✅ **Klare Dokumentation** für Lehrkräfte und Schüler

Die App eignet sich hervorragend für:
- Einführung in Software-Testing
- eduScrum-Projekte
- Teamarbeit-Training
- Prüfungsvorbereitung im Bereich Quality Assurance

**Geschätzte Unterrichtszeit:** 4-9 Unterrichtseinheiten (je nach Klassenniveau)

---

## Anhang: Schnellreferenz

### Login-Daten
```
E-Mail:    max.mustermann@email.com
Passwort:  test123
```

### Wichtigste Fehler für Demo
- A-01: Nach Login F5 drücken
- A-02: Alle Kurse sind grau
- A-05: Modal schließt nicht
- F-01: Logout funktioniert nicht
- V-04: SQL-Injection mit `' OR '1'='1`

### Browser-Entwicklertools
- **Öffnen:** F12 oder Strg + Shift + I
- **Mobile-Ansicht:** Strg + Shift + M
- **Network-Tab:** Für Performance-Tests
- **Console-Tab:** Für JavaScript-Fehler

### Testverfahren - Kurzübersicht
- **Black-Box:** Testen ohne Code-Kenntnis (nur Bedienung)
- **White-Box:** Testen mit Code-Kenntnis (Code-Analyse)
- **Unit-Test:** Einzelne Funktionen testen
- **Integrationstest:** Zusammenspiel mehrerer Komponenten
- **Systemtest:** Gesamtes System End-to-End testen
- **Responsive-Test:** Verschiedene Bildschirmgrößen testen
- **Performance-Test:** Ladezeiten und Performance messen
- **Security-Test:** Sicherheitslücken suchen

---

**Viel Erfolg mit dem Projekt SprachPlan!**

Erstellt für: Berufsschulunterricht - Software-Testing und Quality Assurance
Version: 1.0
Letzte Aktualisierung: 2026-01-07
