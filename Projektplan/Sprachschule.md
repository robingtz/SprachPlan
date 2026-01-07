# WebApp-Projekt: "SprachPlan" - Stundenplanmanager für Sprachschulen

## 1. PROJEKTÜBERSICHT

### 1.1 Ausgangssituation

Die Sprachschule "LanguageHub International" benötigt eine einfache Web-Anwendung, mit der ihre Sprachschüler jederzeit ihren persönlichen Kursplan einsehen können. Aktuell werden die Stundenpläne als PDF per E-Mail verschickt, was häufig zu Verwirrung führt, wenn sich Räume oder Zeiten kurzfristig ändern.

### 1.2 Projektziel

Entwicklung einer responsiven WebApp, die Sprachschülern einen schnellen Überblick über ihre gebuchten Sprachkurse gibt - inklusive Kurszeiten, Räumen und Lehrpersonen.

### 1.3 Zielgruppe

- **Primär:** Erwachsene Sprachschüler (18-65 Jahre)
- **Geräte:** Desktop-PC, Tablet, Smartphone
- **Sprachniveau:** Internationale Teilnehmer (einfache, intuitive Bedienung wichtig)

---

## 2. KUNDENANFORDERUNGEN (Product Owner-Perspektive)

### 2.1 Must-Have-Funktionen (Prio 1)

1. **Kursübersicht als Wochenplan**

   - Darstellung Montag bis Freitag
   - Zeitraster von 08:00 - 20:00 Uhr
   - Farbcodierung nach Sprachniveau (A1, A2, B1, B2, C1, C2)

2. **Kursinformationen anzeigen**

   - Kursname (z.B. "Englisch B2")
   - Raumnummer (z.B. "Raum 204")
   - Lehrkraft (z.B. "Sarah Miller")
   - Uhrzeit (Start- und Endzeit)

3. **Responsive Design**

   - Funktioniert auf Desktop, Tablet und Smartphone
   - Automatische Anpassung der Darstellung

4. **Login-System**
   - Schüler können sich mit E-Mail und Passwort anmelden
   - Jeder Schüler sieht nur seinen eigenen Stundenplan

### 2.2 Nice-to-Have-Funktionen (Prio 2)

- Export-Funktion (Stundenplan als PDF/Bild speichern)
- Notizfeld für eigene Anmerkungen pro Kurs
- Filterfunktion (nur bestimmte Sprachen anzeigen)

### 2.3 Ausschlusskriterien

- **Keine** Buchungsfunktion (Kurse werden durch Verwaltung zugewiesen)
- **Keine** Chat-Funktion zwischen Schülern
- **Keine** Hausaufgaben-/Lernmaterial-Verwaltung

---

## 3. FUNKTIONALE ANFORDERUNGEN

### 3.1 Login & Authentifizierung

| Anforderung | Beschreibung                                                        |
| ----------- | ------------------------------------------------------------------- |
| F-01        | Schüler können sich mit E-Mail und Passwort einloggen               |
| F-02        | Bei falscher Eingabe erscheint Fehlermeldung "Login fehlgeschlagen" |
| F-03        | "Passwort vergessen"-Funktion (zeigt Info-Text, kein echter Reset)  |
| F-04        | Logout-Button oben rechts sichtbar                                  |

### 3.2 Stundenplan-Anzeige

| Anforderung | Beschreibung                                                          |
| ----------- | --------------------------------------------------------------------- |
| F-05        | Wochenübersicht zeigt Mo-Fr in Spalten                                |
| F-06        | Zeitraster von 08:00-20:00 Uhr in 2-Stunden-Schritten                 |
| F-07        | Kurse werden als farbige Kacheln in entsprechendem Zeitslot angezeigt |
| F-08        | Klick auf Kurskachel öffnet Detailansicht (Modal/Pop-up)              |

### 3.3 Kursdetails

| Anforderung | Beschreibung                                                          |
| ----------- | --------------------------------------------------------------------- |
| F-09        | Detailansicht zeigt: Kursname, Raum, Lehrkraft, Uhrzeit, Sprachniveau |
| F-10        | Schließen-Button zum Zurückkehren zur Übersicht                       |

### 3.4 Responsive Verhalten

| Anforderung | Beschreibung                                          |
| ----------- | ----------------------------------------------------- |
| F-11        | Desktop: Wochenansicht horizontal                     |
| F-12        | Tablet: Wochenansicht horizontal (kleinere Kacheln)   |
| F-13        | Smartphone: Tagesansicht vertikal mit Wechsel-Buttons |

---

## 4. TECHNISCHE ANFORDERUNGEN

### 4.1 Frontend

- **Technologie:** HTML5, CSS3, JavaScript (Vanilla oder React)
- **Framework:** Optional Bootstrap oder Tailwind CSS für Styling
- **Responsivität:** CSS Media Queries oder CSS Grid/Flexbox

### 4.2 Backend (vereinfacht für Testzwecke)

- **Datenbank:** Kann simuliert werden mit JSON-Datei oder LocalStorage
- **API:** Optional einfache REST-API (oder Mock-Daten im Frontend)
- **Authentifizierung:** Einfache Username/Passwort-Prüfung (kein echtes OAuth)

### 4.3 Hosting & Sicherheit

- **HTTPS:** WebApp sollte über SSL-verschlüsselte Verbindung laufen
- **Browser-Kompatibilität:** Chrome, Firefox, Safari, Edge (aktuelle Versionen)

---

## 5. UI/UX-KONZEPT

### 5.1 Farbschema für Sprachniveaus

| Niveau               | Farbe    | Hex-Code |
| -------------------- | -------- | -------- |
| A1 (Anfänger)        | Hellgrün | #90EE90  |
| A2 (Grundlagen)      | Grün     | #32CD32  |
| B1 (Mittelstufe)     | Hellblau | #87CEEB  |
| B2 (Fortgeschritten) | Blau     | #4169E1  |
| C1 (Kompetent)       | Orange   | #FFA500  |
| C2 (Meisterschaft)   | Rot      | #FF6347  |

### 5.2 Layout-Struktur

```
┌─────────────────────────────────────────────────┐
│  Header: [Logo] SprachPlan     [Logout-Button]  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Mein Stundenplan - Woche vom 13.01. - 17.01.  │
│                                                  │
│  ┌────┬───────┬───────┬───────┬───────┬───────┐│
│  │Zeit│  Mo   │  Di   │  Mi   │  Do   │  Fr   ││
│  ├────┼───────┼───────┼───────┼───────┼───────┤│
│  │08:00 [Englisch B2] [---] [Englisch B2] [---]││
│  │    │ Raum 204     │       │ Raum 204      │  ││
│  ├────┼───────┼───────┼───────┼───────┼───────┤│
│  │10:00 [---] [Deutsch A1] [---] [Deutsch A1]  ││
│  │    │       │ Raum 101 │       │ Raum 101 │  ││
│  └────┴───────┴───────┴───────┴───────┴───────┘│
│                                                  │
│  [Filter: Alle Sprachen ▼]  [Als PDF speichern]│
│                                                  │
└─────────────────────────────────────────────────┘
```

### 5.3 Detailansicht (Modal)

```
┌───────────────────────────────┐
│  Kursdetails          [X]     │
├───────────────────────────────┤
│                               │
│  📚 Englisch B2               │
│  🏠 Raum 204                  │
│  👤 Sarah Miller              │
│  🕐 Montag, 08:00 - 09:30     │
│  📊 Niveau: B2 (Fortgeschr.)  │
│                               │
│      [Schließen]              │
│                               │
└───────────────────────────────┘
```

---

## 6. DATENMODELL (vereinfacht)

### 6.1 User (Benutzer)

```json
{
  "userId": "12345",
  "email": "max.mustermann@email.com",
  "password": "test123",
  "firstName": "Max",
  "lastName": "Mustermann"
}
```

### 6.2 Course (Kurs)

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

### 6.3 User-Course-Zuordnung

```json
{
  "userId": "12345",
  "courseIds": ["C001", "C003", "C007"]
}
```

---

## 7. USER STORIES (für Product Backlog)

### Sprint 1: Grundfunktionen

- **US-01:** Als Sprachschüler möchte ich mich mit E-Mail und Passwort einloggen können, um meinen persönlichen Stundenplan zu sehen.
- **US-02:** Als Sprachschüler möchte ich eine Wochenübersicht sehen, um alle meine Kurse auf einen Blick zu haben.
- **US-03:** Als Sprachschüler möchte ich Kurse farblich nach Niveau unterscheiden, um leichter zwischen meinen verschiedenen Sprachkursen zu unterscheiden.

### Sprint 2: Detailfunktionen & Responsive

- **US-04:** Als Sprachschüler möchte ich auf einen Kurs klicken können, um Details wie Raumnummer und Lehrkraft zu sehen.
- **US-05:** Als Sprachschüler möchte ich die App auf meinem Smartphone nutzen können, um unterwegs meinen Stundenplan zu checken.
- **US-06:** Als Sprachschüler möchte ich mich ausloggen können, um meine Daten zu schützen.

### Sprint 3: Extras (Nice-to-Have)

- **US-07:** Als Sprachschüler möchte ich meinen Stundenplan als PDF exportieren können, um ihn auszudrucken.
- **US-08:** Als Sprachschüler möchte ich Kurse nach Sprache filtern können, wenn ich nur meine Englischkurse sehen will.

---

## 8. DEFINITION OF DONE (für eduScrum)

Ein Feature gilt als "Done", wenn:

- ✅ Code ist geschrieben und kommentiert
- ✅ Funktion wurde getestet (Unit-Tests + manuelle Tests)
- ✅ Funktion funktioniert auf Desktop UND Smartphone
- ✅ Keine kritischen Bugs vorhanden
- ✅ Dokumentation im Code vorhanden
- ✅ Product Owner hat Funktion abgenommen

---

## 9. SPRINT-PLANUNG (Vorschlag für 3 Sprints à 2-3 Unterrichtsstunden)

### Sprint 1: Login & Grundgerüst (2-3 UE)

**Ziel:** Funktionierende Login-Seite + statische Stundenplan-Anzeige

**Tasks:**

1. Login-Formular erstellen (HTML/CSS)
2. Login-Validierung implementieren (JavaScript)
3. Stundenplan-Grid mit statischen Daten erstellen
4. Farbschema für Sprachniveaus umsetzen

**Testaktivitäten:**

- Black-Box-Tests: Login mit falschen/richtigen Daten
- Unit-Tests: Validierungsfunktionen testen

---

### Sprint 2: Interaktivität & Details (2-3 UE)

**Ziel:** Klickbare Kurskacheln + Detailansicht

**Tasks:**

1. Modal/Pop-up für Kursdetails erstellen
2. Click-Events auf Kurskacheln implementieren
3. Daten aus JSON-Datei dynamisch laden
4. Logout-Funktion implementieren

**Testaktivitäten:**

- Integrationstests: Klick → Detailansicht → Schließen
- Black-Box-Tests: Werden alle Daten korrekt angezeigt?

---

### Sprint 3: Responsive Design & Fehlersuche (2-3 UE)

**Ziel:** App funktioniert auf allen Geräten + Fehler beheben

**Tasks:**

1. Media Queries für Tablet/Smartphone
2. Tagesansicht für Mobile entwickeln
3. Alle gefundenen Bugs fixen
4. Optional: PDF-Export-Funktion

**Testaktivitäten:**

- System-Tests: Kompletter Durchlauf Login → Stundenplan → Details → Logout
- Responsive-Tests: Auf verschiedenen Bildschirmgrößen testen
- Regressionstests: Funktioniert alles nach Bug-Fixes noch?

---

## 10. CHECKLISTE FÜR LEHRKRAFT

### Vor Projektstart:

- [ ] Demo-Version der WebApp vorbereiten (funktionierende Basis)
- [ ] Testdaten erstellen (min. 3 Benutzer mit unterschiedlichen Stundenplänen)
- [ ] Fehlerhafte Version vorbereiten (siehe separate Fehler-Dokumentation)
- [ ] Product Backlog ausdrucken/auf Kanban-Board vorbereiten
- [ ] Rollen verteilen: Product Owner (Lehrer oder Schüler), Scrum Master, Team

### Während der Sprints:

- [ ] Daily Scrum moderieren (5 Min. am Anfang jeder Stunde)
- [ ] Sprint Review nach jedem Sprint (15-20 Min.)
- [ ] Sprint Retrospektive (10 Min.)
- [ ] Definition of Done prüfen

### Nach Projektende:

- [ ] Testprotokolle einsammeln und bewerten
- [ ] Reflection: Was haben die Schüler über Testing gelernt?
- [ ] Feedback zur eduScrum-Methode einholen

---

## 11. TECHNISCHE UMSETZUNGSHINWEISE

### 11.1 Einfache Implementierung (für Anfänger)

```html
<!-- Beispiel: Login-Formular -->
<form id="loginForm">
  <input type="email" id="email" placeholder="E-Mail" required />
  <input type="password" id="password" placeholder="Passwort" required />
  <button type="submit">Anmelden</button>
  <p id="errorMsg" style="color:red; display:none;">Login fehlgeschlagen!</p>
</form>

<script>
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Einfache Validierung (für Demo-Zwecke)
    if (email === "max@test.com" && password === "test123") {
      window.location.href = "stundenplan.html";
    } else {
      document.getElementById("errorMsg").style.display = "block";
    }
  });
</script>
```

### 11.2 Datenhaltung (vereinfacht)

```javascript
// courses.json - Beispieldaten
const courses = [
  {
    id: 1,
    name: "Englisch B2",
    room: "204",
    teacher: "Sarah Miller",
    day: "Monday",
    startTime: "08:00",
    endTime: "09:30",
    level: "B2",
    color: "#4169E1",
  },
  {
    id: 2,
    name: "Deutsch A1",
    room: "101",
    teacher: "Thomas Schmidt",
    day: "Tuesday",
    startTime: "10:00",
    endTime: "11:30",
    level: "A1",
    color: "#90EE90",
  },
  // ... weitere Kurse
];
```

---

## 12. BEWERTUNGSKRITERIEN (Vorschlag)

### Technische Umsetzung (40%)

- Funktionalität der Kernfunktionen
- Code-Qualität und Struktur
- Responsive Design umgesetzt

### Testdokumentation (30%)

- Vollständigkeit der Testprotokolle
- Qualität der Bug-Reports
- Anwendung verschiedener Testverfahren

### Teamarbeit & eduScrum (20%)

- Nutzung des Kanban-Boards
- Beteiligung an Scrum-Events
- Definition of Done eingehalten

### Abschlusspräsentation (10%)

- Qualität der Präsentation vor dem Kunden
- Professionelles Auftreten
- Abnahmeprotokoll vollständig

---

## ZUSAMMENFASSUNG

Die WebApp "SprachPlan" ist bewusst einfach gehalten, damit Berufsschüler sie in 6-9 Unterrichtsstunden verstehen, testen und dokumentieren können. Der Fokus liegt auf:

- **Überschaubare Komplexität:** Nur 3-4 Hauptfunktionen
- **Realitätsnähe:** Echter Kundenkontext (Sprachschule)
- **Testbarkeit:** Viele verschiedene Testverfahren anwendbar
- **Motivation:** Praktischer Nutzen erkennbar

Die nächste Dokumentation zeigt, welche gezielten Fehler für die Testphase eingebaut werden können.
