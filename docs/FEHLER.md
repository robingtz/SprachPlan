# Eingebaute Fehler - Detaillierte Beschreibungen (17 aktive Bugs)

> **Legende:**
> - `[Frontend]` — Bug liegt nur im Frontend-Code
> - `[Backend]` — Bug liegt im Backend-Code
> - `[Frontend → Backend]` — Frontend-Bug mit Backend-Interaktion

---

## Kategorie 1: Anzeigeprobleme (A-XX)

### A-02: Alle Kurse haben gleiche Farbe (grau) `[Frontend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `constants.ts` (Zeile 5-10) — `LEVEL_COLORS` alle auf `'#CCCCCC'` gesetzt
- **Soll-Farben:** A1=#90EE90, A2=#32CD32, B1=#87CEEB, B2=#4169E1, C1=#FFA500, C2=#FF6347
- **Testfall:** Stundenplan öffnen → alle Kurse grau statt farbig nach Niveau

### A-03: Raumnummer abgeschnitten auf Mobile `[Frontend]`
- **Severity:** NIEDRIG
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `Schedule.tsx` (Zeile 203) — `className="w-12 truncate block"` auf Raumnummer
- **Testfall:** Mobile-Ansicht (375px) → "Raum 2..." statt "Raum 204"

### A-04: Überschneidende Kurse überlagern sich `[Frontend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `Schedule.tsx` (Zeile 123) — überlappende Kurse bekommen `absolute` Positionierung, keine Overlap-Logik
- **Testdaten:** C001 und C001_OVERLAP beide Montag 08:00
- **Testfall:** Montag 08:00 ansehen → nur ein Kurs sichtbar

### A-05: Modal schließt nicht beim X-Klick `[Frontend]`
- **Severity:** HOCH
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `CourseDetailModal.tsx` (Zeile 26-31) — X-Button führt nur `console.log("Close clicked but ignored (Bug A-05)")` aus, nicht `onClose`
- **Testfall:** Kurs anklicken → Modal öffnet → X klicken → nichts passiert
- **Workaround:** F5 drücken

---

## Kategorie 2: Funktionsdefekte (F-XX)

### F-03: Filter zeigt immer alle Kurse `[Frontend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `Schedule.tsx` (Zeile 22) — `const filteredCourses = courses;` ignoriert Filterwert (Zeile 23 mit korrekter Filterlogik ist auskommentiert)
- **Testfall:** Filter auf "Nur Englisch" → trotzdem alle Kurse sichtbar

### F-04: PDF-Export erstellt leere Datei `[Frontend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `Schedule.tsx` (Zeile 35-38) — Button zeigt nur `alert("PDF wurde erstellt (0 KB)")`, keine echte PDF-Erstellung
- **Testfall:** "Als PDF speichern" klicken → nur Alert, keine Datei im Downloads-Ordner

### F-05: Detailansicht zeigt immer "Sarah Miller" `[Frontend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `CourseDetailModal.tsx` (Zeile 66) — Lehrkraft ist hardcoded als `"Sarah Miller"` statt `course.teacher`
- **Testfall:** Deutsch A1 anklicken (Lehrer: Thomas Schmidt) → zeigt "Sarah Miller"

### F-07: Falscher Raum für Deutsch A1 `[Backend]`
- **Severity:** NIEDRIG
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `backend/.../config/DataLoader.java` (Zeile 56) — Kurs "Deutsch A1" (C002) hat Raum `"999"` statt `"101"`
- **Backend-Details:** Beim Anlegen der Testdaten wird der Kurs C002 mit dem nicht-existierenden Raum "999" gespeichert. Die API `/api/courses` gibt diesen falschen Wert weiter, das Frontend zeigt "Raum 999".
- **Testfall:** Deutsch A1 (Dienstag) anklicken → zeigt "Raum 999" statt "Raum 101"

### F-08: Logout löscht Session nicht `[Backend]`
- **Severity:** HOCH
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `backend/.../controller/AuthController.java` (Zeile 48-52) — `session.invalidate()` ist auskommentiert, Endpoint gibt trotzdem "Logged out successfully" zurück
- **Backend-Details:** Der POST `/api/auth/logout` gibt HTTP 200 mit Erfolgsmeldung zurück, aber die Session wird nicht invalidiert. Der User bleibt serverseitig eingeloggt und kann weiterhin `/api/courses` aufrufen.
- **Testfall:** Logout klicken → "Erfolgreich abgemeldet" → `/api/auth/me` aufrufen → User ist noch eingeloggt

### F-06: Zeitformat falsch ("8:0" statt "08:00") `[Backend]`
- **Severity:** NIEDRIG
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `backend/.../config/DataLoader.java` (Zeile 39-73) — Zeiten als `"8:0"`, `"10:0"`, `"14:0"`, `"16:0"` statt `"08:00"` etc.
- **Backend-Details:** Die fehlerhaften Zeiten werden direkt bei der Initialisierung der Testdaten in die H2-Datenbank geschrieben. Die REST-API `/api/courses` gibt diese Werte unverändert an das Frontend weiter.
- **Testfall:** Uhrzeiten im Stundenplan prüfen → "8:0" statt "08:00"

---

## Kategorie 3: Validierungsfehler (V-XX)

### V-01: Login akzeptiert leere Felder `[Frontend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `Login.tsx` (Zeile 66-73, 86-93) — `required`-Attribut fehlt auf beiden Input-Feldern
- **Testfall:** Felder leer lassen → Anmelden klicken → wird durchgeführt

### V-02: Ungültige E-Mails akzeptiert `[Frontend]`
- **Severity:** NIEDRIG
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `Login.tsx` (Zeile 68) — Input ist `type="text"` statt `type="email"`
- **Testfall:** "maxmustermann" (ohne @) eingeben → wird akzeptiert

### V-03: Zu kurze Passwörter akzeptiert `[Backend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `backend/.../service/AuthService.java` (Zeile 46) — `password.equals("12")` als Backdoor: Passwort "12" wird für JEDEN Benutzer akzeptiert
- **Backend-Details:** In der `authenticate()`-Methode wird neben dem normalen Passwort-Check auch `|| password.equals("12")` geprüft. Das bedeutet: Egal welcher User, mit Passwort "12" kommt man rein.
- **Testfall:** Passwort "12" eingeben → Login erfolgreich

### V-04: SQL-Injection umgeht Login `[Backend]`
- **Severity:** KRITISCH
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `backend/.../service/AuthService.java` (Zeile 27-34) — Simulierte SQL-Injection: wenn `password.contains("' OR '1'='1")`, wird der erste User aus der Datenbank zurückgegeben
- **Backend-Details:** Da Spring Data JPA Prepared Statements nutzt, ist echte SQL-Injection nicht möglich. Der Bug ist eine **Simulation** zu Lehrzwecken: Der Code prüft explizit auf den SQL-Injection-String und gibt dann ohne Passwortprüfung den ersten User zurück.
- **Testfall:** Beliebige E-Mail + Passwort `' OR '1'='1` → Login erfolgreich

---

## Kategorie 4: Responsive-Fehler (R-XX)

### R-01: Layout bricht auf Tablets (768px) `[Frontend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `Schedule.tsx` (Zeile 93) — Grid mit `grid-cols-[100px_repeat(5,minmax(200px,1fr))]` = mindestens 1100px bei nur 768px Viewport
- **Testfall:** DevTools → 768px Breite → Elemente überlappen

### R-02: Buttons zu klein auf Mobile `[Frontend]`
- **Severity:** MITTEL
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `CourseDetailModal.tsx` (Zeile 28) — X-Button nur `w-4 h-4` (16x16px), WCAG empfiehlt 44x44px
- **Testfall:** Mobile-Ansicht → Buttons schwer zu treffen

### R-03: Horizontales Scrollen auf Mobile `[Frontend]`
- **Severity:** HOCH
- **Status:** ✅ Verifiziert & aktiv
- **Datei:** `Schedule.tsx` (Zeile 156) — Wrapper mit `min-w-[500px]`, Smartphones nur ~375px breit
- **Testfall:** Mobile-Ansicht (375px) → horizontales Scrollen nötig

---

## Zusammenfassung

| ID | Bug | Bereich | Severity |
|----|-----|---------|----------|
| **A-02** | Alle Kurse grau statt farbcodiert | Frontend | MITTEL |
| **A-03** | Raumnummer abgeschnitten auf Mobile | Frontend | NIEDRIG |
| **A-04** | Überschneidende Kurse überlagern sich | Frontend | MITTEL |
| **A-05** | Modal X-Button schließt nicht | Frontend | HOCH |
| **F-03** | Filter zeigt immer alle Kurse | Frontend | MITTEL |
| **F-04** | PDF-Export erzeugt leere Datei | Frontend | MITTEL |
| **F-05** | Detailansicht zeigt immer "Sarah Miller" | Frontend | MITTEL |
| **F-06** | Zeitformat "8:0" statt "08:00" | **Backend** | NIEDRIG |
| **V-01** | Login akzeptiert leere Felder | Frontend | MITTEL |
| **V-02** | Ungültige E-Mails akzeptiert | Frontend | NIEDRIG |
| **V-03** | Passwort "12" funktioniert (Backdoor) | **Backend** | MITTEL |
| **V-04** | SQL-Injection umgeht Login (simuliert) | **Backend** | KRITISCH |
| **R-01** | Layout bricht auf Tablets (768px) | Frontend | MITTEL |
| **R-02** | Buttons zu klein auf Mobile (<44px) | Frontend | MITTEL |
| **F-07** | Falscher Raum für Deutsch A1 ("999") | **Backend** | NIEDRIG |
| **F-08** | Logout löscht Session nicht | **Backend** | HOCH |
| **R-03** | Horizontales Scrollen auf Mobile | Frontend | HOCH |

**Gesamt: 17 aktive Bugs** — davon 12 Frontend, 5 Backend
