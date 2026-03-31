# SprachPlan - Stundenplan-WebApp mit absichtlichen Bugs

## Projektzweck

SprachPlan ist eine **Lehr-WebApp** für den Berufsschulunterricht (Software-Testing / QA). Die App enthält **18 absichtlich eingebaute Fehler**, die Schülerinnen und Schüler finden und dokumentieren sollen.

**WICHTIG:** Bugs NICHT fixen, es sei denn explizit angefragt. Die Fehler sind das Feature.

## Tech-Stack

- **Frontend:** React + TypeScript + Tailwind CSS (Vite, Port 3000)
- **Backend:** Java Spring Boot 3.2.1 + H2-Datenbank (Maven, Port 8080)
- **Architektur:** Frontend → REST API → H2 (file-basiert, persistent)

## Starten

```bash
# Terminal 1: Backend
cd backend && ./mvnw spring-boot:run

# Terminal 2: Frontend
npm run dev
```

Login: `max.mustermann@email.com` / `test123`

## Projektstruktur (Kurzfassung)

```
sprachplan/
├── App.tsx                    # Hauptkomponente (Bugs: A-01, F-01)
├── constants.ts               # UI-Konstanten (Bug: A-02)
├── components/
│   ├── Login.tsx              # Login-Formular (Bugs: V-01, V-02)
│   ├── Schedule.tsx           # Stundenplan (Bugs: A-03, A-04, F-03, F-04, R-01, R-03)
│   ├── CourseDetailModal.tsx  # Detailansicht (Bugs: A-05, F-05, R-02)
│   └── Button.tsx
├── services/
│   └── authService.ts         # API-Calls (Bug: P-01)
├── backend/                   # Java Spring Boot Backend
│   └── src/main/java/de/sprachplan/
│       ├── config/DataLoader.java     # Testdaten-Init (Bug: F-06)
│       ├── service/AuthService.java   # Auth-Logik (Bugs: V-03, V-04)
│       ├── controller/                # REST-Endpoints
│       ├── model/                     # JPA-Entities
│       └── repository/               # DB-Zugriff
└── docs/                      # Detail-Dokumentation
    ├── FEHLER.md              # Alle 18 Bugs im Detail
    ├── BACKEND.md             # Backend-Architektur erklärt
    └── UNTERRICHT.md          # Unterrichtsplanung & Bewertung
```

## Bug-Übersicht (18 Fehler)

| ID | Bug | Wo | Severity |
|----|-----|----|----------|
| **A-01** | Stundenplan erscheint nicht nach Login (F5 nötig) | App.tsx | HOCH |
| **A-02** | Alle Kurse grau statt farbcodiert | constants.ts | MITTEL |
| **A-03** | Raumnummer abgeschnitten auf Mobile | Schedule.tsx | NIEDRIG |
| **A-04** | Überschneidende Kurse überlagern sich | Schedule.tsx | MITTEL |
| **A-05** | Modal X-Button schließt nicht | CourseDetailModal.tsx | HOCH |
| **F-01** | Logout funktioniert nicht | App.tsx | HOCH |
| **F-03** | Filter zeigt immer alle Kurse | Schedule.tsx | MITTEL |
| **F-04** | PDF-Export erzeugt leere Datei | Schedule.tsx | MITTEL |
| **F-05** | Detailansicht zeigt immer "Sarah Miller" | CourseDetailModal.tsx | MITTEL |
| **F-06** | Zeitformat "8:0" statt "08:00" | DataLoader.java | NIEDRIG |
| **V-01** | Login akzeptiert leere Felder | Login.tsx | MITTEL |
| **V-02** | Ungültige E-Mails akzeptiert (kein @) | Login.tsx | NIEDRIG |
| **V-03** | Passwort "12" funktioniert (zu kurz) | AuthService.java | MITTEL |
| **V-04** | SQL-Injection `' OR '1'='1` umgeht Login | AuthService.java | KRITISCH |
| **R-01** | Layout bricht auf Tablets (768px) | Schedule.tsx | MITTEL |
| **R-02** | Buttons zu klein auf Mobile (<44px) | CourseDetailModal.tsx | MITTEL |
| **R-03** | Horizontales Scrollen auf Mobile | Schedule.tsx | HOCH |
| **P-01** | 6,7 Sekunden künstlicher Delay beim Login | authService.ts | NIEDRIG |

## Weiterführende Docs

- [`docs/FEHLER.md`](./docs/FEHLER.md) - Detaillierte Fehlerbeschreibungen mit Testfällen und Code-Orten
- [`docs/BACKEND.md`](./docs/BACKEND.md) - Backend-Architektur, API-Endpoints, Datenmodell
- [`docs/UNTERRICHT.md`](./docs/UNTERRICHT.md) - Unterrichtsplanung, Fehlersets, Bewertungskriterien, Testprotokoll
- [`Projektstruktur.md`](./Projektstruktur.md) - Technischer Verzeichnisbaum und DB-Schema
