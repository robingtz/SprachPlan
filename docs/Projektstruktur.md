# SprachPlan - Projektstruktur

## Inhaltsverzeichnis
1. [Projektübersicht](#projektübersicht)
2. [Technologie-Stack](#technologie-stack)
3. [Verzeichnisstruktur](#verzeichnisstruktur)
4. [Quick Start](#quick-start)
5. [API Endpoints](#api-endpoints)
6. [Datenbank](#datenbank)
7. [Fehler-Übersicht](#fehler-übersicht)

---

## Projektübersicht

**SprachPlan** ist eine WebApp für die fiktive Sprachschule "LanguageHub International". Die Anwendung ermöglicht Sprachschülern den Zugriff auf ihren persönlichen Kursplan.

### Architektur

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │  HTTP   │   Backend   │  JPA    │  Datenbank  │
│   (React)   │ ──────> │  (Spring)   │ ──────> │    (H2)     │
│   Port 3000 │         │  Port 8080  │         │  File-based │
└─────────────┘         └─────────────┘         └─────────────┘
```

**Kommunikation:**
- Frontend → Backend: REST API (`/api/*`)
- Backend → Datenbank: Spring Data JPA
- Proxy: Vite leitet `/api` Anfragen an `localhost:8080` weiter

---

## Technologie-Stack

### Frontend

| Technologie | Version | Zweck |
|-------------|---------|-------|
| **React** | 19.2.3 | UI Framework |
| **TypeScript** | 5.8.2 | Type Safety |
| **Vite** | 6.2.0 | Build Tool & Dev Server |
| **Lucide React** | 0.562.0 | Icon Library |
| **Port** | 3000 | Development Server |

**Styling:** Inline Tailwind CSS Classes

### Backend

| Technologie | Version | Zweck |
|-------------|---------|-------|
| **Java** | 17 LTS | Programmiersprache |
| **Spring Boot** | 3.2.1 | Backend Framework |
| **Spring Data JPA** | (in Spring Boot) | Datenbank-Zugriff |
| **Spring Security** | (in Spring Boot) | Authentifizierung |
| **H2 Database** | (embedded) | Persistente Speicherung |
| **Maven** | (Wrapper) | Build Tool |
| **Port** | 8080 | Backend Server |

**Build:** Maven Wrapper (`mvnw`)

---

## Verzeichnisstruktur

### Gesamtübersicht

```
sprachplan/
│
├── backend/                           # Java Spring Boot Backend
│   ├── src/main/java/de/sprachplan/
│   │   ├── SprachplanApplication.java      # Hauptanwendung
│   │   │
│   │   ├── config/                         # Konfiguration
│   │   │   ├── SecurityConfig.java         # Spring Security (CORS, Auth)
│   │   │   ├── WebConfig.java              # CORS Konfiguration
│   │   │   └── DataLoader.java             # Initiale Daten + FEHLER F-06
│   │   │
│   │   ├── controller/                     # REST API Endpoints
│   │   │   ├── AuthController.java         # /api/auth/* Endpoints
│   │   │   └── CourseController.java       # /api/courses/* Endpoints
│   │   │
│   │   ├── model/                          # JPA Entities
│   │   │   ├── User.java                   # User Entity
│   │   │   ├── Course.java                 # Course Entity
│   │   │   └── LanguageLevel.java          # Enum (A1-C2)
│   │   │
│   │   ├── repository/                     # Datenbank-Zugriff
│   │   │   ├── UserRepository.java         # User DB Access
│   │   │   └── CourseRepository.java       # Course DB Access
│   │   │
│   │   ├── service/                        # Business Logic
│   │   │   ├── AuthService.java            # Auth Logic + FEHLER V-03, V-04
│   │   │   └── CourseService.java          # Course Logic
│   │   │
│   │   └── dto/                            # Data Transfer Objects
│   │       ├── LoginRequest.java           # Login Request DTO
│   │       └── UserResponse.java           # User Response DTO
│   │
│   ├── src/main/resources/
│   │   └── application.properties          # Backend-Konfiguration
│   │
│   ├── data/                               # H2 Datenbank (wird erstellt)
│   │   └── sprachplandb.mv.db
│   │
│   ├── pom.xml                             # Maven Dependencies
│   ├── mvnw / mvnw.cmd                     # Maven Wrapper
│   └── README.md                           # Backend-Dokumentation
│
├── components/                        # React Komponenten
│   ├── Login.tsx                      # Login-Formular + FEHLER V-01, V-02
│   ├── Schedule.tsx                   # Stundenplan + FEHLER A-03, A-04, F-03, F-04, R-01, R-03
│   ├── CourseDetailModal.tsx          # Kurs-Details + FEHLER A-05, F-05, R-02
│   └── Button.tsx                     # Button-Komponente
│
├── services/                          # Frontend Services
│   └── authService.ts                 # API Calls + FEHLER P-01
│
├── App.tsx                            # Hauptkomponente + FEHLER A-01, F-01
├── index.tsx                          # React Entry Point
├── constants.ts                       # Konstanten + FEHLER A-02
├── types.ts                           # TypeScript Types
│
├── vite.config.ts                     # Vite Konfiguration (Proxy)
├── package.json                       # NPM Dependencies
├── tsconfig.json                      # TypeScript Konfiguration
├── index.html                         # HTML Entry Point
│
├── Projektstruktur.md                 # Diese Datei
├── Claude.md                          # Vollständige Projektdokumentation
└── README.md                          # Projekt-README
```

---

## Quick Start

### Voraussetzungen

- **Java 17** oder höher installiert
- **Node.js 16+** und **npm** installiert
- **Git** (optional)

### 1. Backend starten

```bash
cd backend
./mvnw spring-boot:run
```

**Hinweis:** Beim ersten Start werden Maven-Dependencies heruntergeladen (1-2 Minuten).

**Backend läuft auf:** http://localhost:8080

**Initiale Daten:** Beim ersten Start wird automatisch ein Benutzer (Max Mustermann) mit 7 Kursen angelegt.

### 2. Frontend starten (neues Terminal)

```bash
npm install  # Nur beim ersten Mal
npm run dev
```

**Frontend läuft auf:** http://localhost:3000

### 3. Login

**Standard-Zugangsdaten:**
```
E-Mail:    max.mustermann@email.com
Passwort:  test123
```

**⚠️ WICHTIG:** Nach dem Login passiert 6,7 Sekunden lang nichts (Fehler P-01). Danach bleibt die Seite leer (Fehler A-01). **Drücke F5** zum Neuladen, dann siehst du den Stundenplan!

**Alternative Logins (wegen Bugs):**
```
Passwort:  12                    (Fehler V-03: zu kurz, wird trotzdem akzeptiert)
Passwort:  ' OR '1'='1           (Fehler V-04: SQL-Injection umgeht Login)
```

---

## API Endpoints

Das Backend stellt folgende REST API Endpoints bereit:

### Authentifizierung

| Methode | Endpoint | Beschreibung | Request Body | Response |
|---------|----------|--------------|--------------|----------|
| **POST** | `/api/auth/login` | Login | `{ "email": "...", "password": "..." }` | `{ "userId": "...", "email": "...", "firstName": "...", "lastName": "..." }` |
| **POST** | `/api/auth/logout` | Logout | - | `200 OK` |
| **GET** | `/api/auth/me` | Aktueller User | - | `{ "userId": "...", "email": "...", "firstName": "...", "lastName": "..." }` |

**Session-Management:** Der Login erstellt eine HTTP-Session. Das Session-Cookie wird automatisch vom Browser gespeichert.

### Kurse

| Methode | Endpoint | Beschreibung | Query Params | Response |
|---------|----------|--------------|--------------|----------|
| **GET** | `/api/courses` | Alle Kurse des Users | `?language=Englisch` (optional) | Array von Kurs-Objekten |
| **GET** | `/api/courses/{id}` | Einzelner Kurs | - | Einzelnes Kurs-Objekt |

**Beispiel Kurs-Objekt:**
```json
{
  "courseId": "C001",
  "courseName": "Englisch B2",
  "language": "Englisch",
  "level": "B2",
  "teacher": "Sarah Miller",
  "room": "204",
  "dayOfWeek": "Monday",
  "startTime": "8:0",
  "endTime": "9:30",
  "color": "#CCCCCC"
}
```

**Authentifizierung erforderlich:** Alle `/api/courses` Endpoints benötigen eine aktive Session.

### Beispiel API-Aufrufe mit curl

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "max.mustermann@email.com", "password": "test123"}' \
  -c cookies.txt
```

**Kurse abrufen:**
```bash
curl http://localhost:8080/api/courses \
  -b cookies.txt
```

**Gefilterte Kurse:**
```bash
curl http://localhost:8080/api/courses?language=Englisch \
  -b cookies.txt
```

---

## Datenbank

### H2 Datenbank

SprachPlan nutzt eine **H2 File-based Datenbank** für persistente Speicherung. Die Daten bleiben auch nach Backend-Neustart erhalten.

**Speicherort:** `backend/data/sprachplandb.mv.db`

### H2 Console

Du kannst die Datenbank im Browser anschauen:

```
URL: http://localhost:8080/h2-console
```

**Zugangsdaten:**
| Feld | Wert |
|------|------|
| JDBC URL | `jdbc:h2:file:./data/sprachplandb` |
| Username | `sa` |
| Password | _(leer lassen)_ |

### Datenbank-Schema

#### Tabelle: `users`

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `user_id` | VARCHAR(255) | Primary Key |
| `email` | VARCHAR(255) | E-Mail (Unique) |
| `password` | VARCHAR(255) | Passwort (Klartext!) |
| `first_name` | VARCHAR(255) | Vorname |
| `last_name` | VARCHAR(255) | Nachname |

#### Tabelle: `courses`

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `course_id` | VARCHAR(255) | Primary Key |
| `course_name` | VARCHAR(255) | Kursname |
| `language` | VARCHAR(255) | Sprache |
| `level` | VARCHAR(10) | Niveau (A1-C2) |
| `teacher` | VARCHAR(255) | Lehrkraft |
| `room` | VARCHAR(50) | Raumnummer |
| `day_of_week` | VARCHAR(50) | Wochentag |
| `start_time` | VARCHAR(10) | Startzeit |
| `end_time` | VARCHAR(10) | Endzeit |
| `color` | VARCHAR(7) | Farbcode (Hex) |
| `user_id` | VARCHAR(255) | Foreign Key → `users.user_id` |

### Initiale Daten

Beim ersten Start werden folgende Daten angelegt:

**1 User:**
- Max Mustermann (max.mustermann@email.com / test123)

**7 Kurse:**
- C001: Englisch B2 (Mo + Mi, 08:00-09:30)
- C002: Deutsch A1 (Di + Do, 10:00-11:30)
- C003: Spanisch B1 (Mi + Fr, 14:00-15:30)
- C004: Französisch A2 (Mo + Do, 16:00-17:30)
- C005: Italienisch C1 (Di, 18:00-19:30)
- C006: Chinesisch A1 (Fr, 10:00-11:30)
- C001_OVERLAP: Englisch A1 (Mo, 08:00-09:30) ← Fehler A-04!

### Datenbank zurücksetzen

```bash
cd backend
rm -rf data/
./mvnw spring-boot:run
```

Die Datenbank wird beim nächsten Start neu initialisiert.

---

## Fehler-Übersicht

**⚠️ WICHTIG:** Diese WebApp wurde speziell für den Berufsschulunterricht entwickelt und enthält **absichtlich 18 eingebaute Fehler**!

Die Fehler dienen dazu, dass Schülerinnen und Schüler verschiedene Testverfahren anwenden können.

### Fehler-Statistik

| Kategorie | Anzahl | Schwierigkeit |
|-----------|--------|---------------|
| Anzeigeprobleme (A-XX) | 5 | Leicht-Mittel |
| Funktionsdefekte (F-XX) | 5 | Mittel |
| Validierungsfehler (V-XX) | 4 | Leicht-Mittel |
| Responsive-Fehler (R-XX) | 3 | Mittel |
| Performance-Probleme (P-XX) | 1 | Mittel-Schwer |
| **GESAMT** | **18** | - |

### Backend-Fehler (3)

| Fehler-ID | Beschreibung | Severity | Datei | Zeile |
|-----------|--------------|----------|-------|-------|
| **V-03** | Passwort "12" wird akzeptiert (zu kurz) | 🟠 MITTEL | `backend/src/main/java/de/sprachplan/service/AuthService.java` | ~32 |
| **V-04** | SQL-Injection: `' OR '1'='1` umgeht Login | 🔴 KRITISCH | `backend/src/main/java/de/sprachplan/service/AuthService.java` | ~23-27 |
| **F-06** | Zeitformat falsch: "8:0" statt "08:00" | 🟢 NIEDRIG | `backend/src/main/java/de/sprachplan/config/DataLoader.java` | ~41-72 |

### Frontend-Fehler (15)

| Fehler-ID | Beschreibung | Severity | Datei |
|-----------|--------------|----------|-------|
| **A-01** | Nach Login muss F5 gedrückt werden | 🔴 HOCH | `App.tsx:43-52` |
| **A-02** | Farben werden nicht korrekt angezeigt (alle grau) | 🟠 MITTEL | `constants.ts` |
| **A-03** | Raumnummer wird abgeschnitten auf Mobile | 🟢 NIEDRIG | `components/Schedule.tsx` |
| **A-04** | Überschneidende Kurse werden nicht korrekt dargestellt | 🟠 MITTEL | `components/Schedule.tsx` + `DataLoader.java` |
| **A-05** | Modal schließt nicht beim Klick auf "X" | 🔴 HOCH | `components/CourseDetailModal.tsx` |
| **F-01** | Logout-Button funktioniert nicht | 🔴 HOCH | `App.tsx:54-58` |
| **F-03** | Filter-Funktion zeigt falsche Ergebnisse | 🟠 MITTEL | `components/Schedule.tsx` |
| **F-04** | PDF-Export erstellt leere Datei | 🟠 MITTEL | `components/Schedule.tsx` |
| **F-05** | Detailansicht zeigt falsche Lehrkraft | 🟠 MITTEL | `components/CourseDetailModal.tsx` |
| **V-01** | Login akzeptiert leere Felder | 🟠 MITTEL | `components/Login.tsx` |
| **V-02** | Ungültige E-Mail-Adressen werden akzeptiert | 🟢 NIEDRIG | `components/Login.tsx` |
| **R-01** | Layout bricht auf Tablets (768px) | 🟠 MITTEL | `components/Schedule.tsx` |
| **R-02** | Buttons zu klein auf Mobile (<44px) | 🟠 MITTEL | `components/CourseDetailModal.tsx` |
| **R-03** | Horizontales Scrollen nötig auf Smartphone | 🔴 HOCH | `components/Schedule.tsx` |
| **P-01** | Ladezeit über 5 Sekunden (6,7s) | 🟢 NIEDRIG | `services/authService.ts:6` |

### Fehler nach Severity

| Severity | Anzahl | Fehler-IDs |
|----------|--------|------------|
| **🔴 KRITISCH** | 1 | V-04 |
| **🔴 HOCH** | 4 | A-01, A-05, F-01, R-03 |
| **🟠 MITTEL** | 9 | A-02, A-04, F-03, F-04, F-05, V-01, V-03, R-01, R-02 |
| **🟢 NIEDRIG** | 4 | A-03, F-06, V-02, P-01 |

### Detaillierte Fehler-Dokumentation

Siehe **`Claude.md`** für detaillierte Beschreibungen aller 18 Fehler mit:
- Reproduktionsschritten
- Erwartetes vs. tatsächliches Ergebnis
- Testverfahren
- Workarounds

---

## Entwicklung

### Backend neu starten

```bash
cd backend
./mvnw spring-boot:run
```

**Hot Reload:** Spring Boot DevTools ist aktiviert. Code-Änderungen werden automatisch neu geladen.

### Frontend neu starten

```bash
npm run dev
```

**Hot Module Replacement (HMR):** Änderungen werden sofort im Browser sichtbar.

### Build für Produktion

**Backend:**
```bash
cd backend
./mvnw clean package
java -jar target/sprachplan-backend-1.0.0.jar
```

**Frontend:**
```bash
npm run build
```

Der `dist/` Ordner kann dann auf einem Webserver bereitgestellt werden.

---

## Troubleshooting

### Backend startet nicht

**Problem:** Port 8080 bereits belegt

```bash
# Mac/Linux
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Alternative:** Port in `backend/src/main/resources/application.properties` ändern:
```properties
server.port=8081
```

### Frontend kann Backend nicht erreichen

1. ✅ Backend läuft? (`http://localhost:8080` im Browser öffnen)
2. ✅ Proxy konfiguriert? (Siehe `vite.config.ts`)
3. ✅ CORS-Fehler? (Backend-Logs prüfen)

### Datenbank-Fehler

Lösche `backend/data/` und starte Backend neu:

```bash
rm -rf backend/data/
cd backend && ./mvnw spring-boot:run
```

### Maven-Fehler

```bash
cd backend
./mvnw clean install
```

### npm-Fehler

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Sicherheitshinweise

**⚠️ WICHTIG:** Diese Anwendung ist **NUR für Demonstrationszwecke**!

- ❌ Passwörter im Klartext (NICHT für Produktion!)
- ❌ CSRF-Schutz deaktiviert
- ❌ Enthält absichtliche Sicherheitslücken (V-04: SQL-Injection)
- ❌ Session-Management vereinfacht

**Für Produktion sollte verwendet werden:**
- ✅ BCrypt für Passwort-Hashing
- ✅ JWT-Tokens statt Session
- ✅ PostgreSQL/MySQL statt H2
- ✅ HTTPS
- ✅ CSRF-Schutz
- ✅ Input-Validierung
- ✅ Rate Limiting

---

## Support & Dokumentation

- **Vollständige Doku:** `Claude.md` (mit allen 18 Fehlern)
- **Backend-Doku:** `backend/README.md`
- **Projekt-README:** `README.md`

---

**Viel Erfolg mit dem Projekt!** 🚀

Version: 1.0  
Letzte Aktualisierung: 2026-02-03
