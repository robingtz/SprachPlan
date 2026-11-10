# SprachPlan — Stundenplan-WebApp mit absichtlichen Bugs

Übergeordneter Einstieg (Arbeitsweise, Daten-Lanes, Werkzeuge): `/Users/gruetzner/.claude-shared/vault/index.md`

Issue-Tracker: GitHub -> Link: https://github.com/robingtz/SprachPlan/issues
Vault (lokal, nicht in Git): [vault/README.md](vault/README.md) — Detail-Wissen, das nicht in diese Datei passt.

## Projektzweck

SprachPlan (LanguageHub) ist eine **Lehr-WebApp** für den Berufsschulunterricht (Software-Testing / QA).
Die App enthält **18 absichtlich eingebaute Fehler**, die Schülerinnen und Schüler finden und dokumentieren
sollen. Sie zeigt Kurspläne responsiv im Browser (löst den PDF-Versand ab).

**WICHTIG:** Bugs NICHT fixen, es sei denn explizit angefragt. Die Fehler sind das Feature.

## Tech-Stack

- **Frontend:** React 19 + TypeScript + Tailwind CSS (Vite 6, Port 3000), Icons via `lucide-react`.
- **Backend:** Java Spring Boot 3.2.1 + H2-Datenbank (Maven, Port 8080).
- **Architektur:** Frontend → REST API (Vite-Proxy `/api` → `localhost:8080`) → H2 (file-basiert, persistent).

## Setup & Starten

```bash
npm install                          # Frontend-Deps (einmalig)

# Terminal 1: Backend
cd backend && ./mvnw spring-boot:run

# Terminal 2: Frontend
npm run dev        # Dev-Server (Port 3000)
npm run build      # Production-Build (vite build)
npm run preview    # Build lokal previewen
```

Login: `max.mustermann@email.com` / `test123`

## Projektstruktur (Kurzfassung)

```
SprachPlan/
├── App.tsx                    # Hauptkomponente (Bugs: A-01, F-01)
├── index.tsx                  # React-Entry
├── constants.ts               # UI-Konstanten (Bug: A-02)
├── types.ts                   # Shared Types
├── components/
│   ├── Login.tsx              # Login-Formular (Bugs: V-01, V-02)
│   ├── Schedule.tsx           # Stundenplan (Bugs: A-03, A-04, F-03, F-04, R-01, R-03)
│   ├── CourseDetailModal.tsx  # Detailansicht (Bugs: A-05, F-05, R-02)
│   └── Button.tsx
├── services/
│   └── authService.ts         # API-Calls (Bug: P-01)
├── backend/                   # Java Spring Boot Backend (Maven: pom.xml, mvnw)
│   └── src/main/java/de/sprachplan/
│       ├── config/DataLoader.java     # Testdaten-Init (Bug: F-06)
│       ├── service/AuthService.java   # Auth-Logik (Bugs: V-03, V-04)
│       ├── controller/                # REST-Endpoints
│       ├── model/                     # JPA-Entities
│       └── repository/                # DB-Zugriff
├── Projektplan/               # Konzept-/Planungs-Notizen (appfunktionen, appfehler, Sprachschule)
└── docs/                      # Detail-Dokumentation
    ├── FEHLER.md              # Alle 18 Bugs im Detail
    ├── BACKEND.md             # Backend-Architektur erklärt
    ├── UNTERRICHT.md          # Unterrichtsplanung & Bewertung
    └── Projektstruktur.md     # Technischer Verzeichnisbaum und DB-Schema
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

## Gotchas

- **18 Bugs sind Absicht** — nicht „aufräumen". Der QA-Lerneffekt hängt daran.
- **V-04 (SQL-Injection) ist KRITISCH und gewollt** — keine Sanitization einbauen ohne Auftrag.
- **`process.env.API_KEY`/`GEMINI_API_KEY`** werden in `vite.config.ts` aus `.env` (`GEMINI_API_KEY`) injiziert.
- Backend-Daten liegen unter `backend/data/` (gitignored), H2 ist persistent über Neustarts.

## Weiterführende Docs

- [`docs/FEHLER.md`](./docs/FEHLER.md) — Detaillierte Fehlerbeschreibungen mit Testfällen und Code-Orten
- [`docs/BACKEND.md`](./docs/BACKEND.md) — Backend-Architektur, API-Endpoints, Datenmodell
- [`docs/UNTERRICHT.md`](./docs/UNTERRICHT.md) — Unterrichtsplanung, Fehlersets, Bewertungskriterien, Testprotokoll
- [`docs/Projektstruktur.md`](./docs/Projektstruktur.md) — Technischer Verzeichnisbaum und DB-Schema
