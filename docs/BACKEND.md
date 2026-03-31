# Backend-Architektur (Java Spring Boot)

## Überblick

```
Frontend (React, Port 3000)  →  REST API (Spring Boot, Port 8080)  →  H2 Datenbank (File: backend/data/)
```

Vite proxied alle `/api`-Requests automatisch an das Backend (konfiguriert in `vite.config.ts`).

## Verzeichnisstruktur

```
backend/src/main/java/de/sprachplan/
├── SprachplanApplication.java       # Main-Klasse (@SpringBootApplication)
├── config/
│   ├── DataLoader.java              # Testdaten beim ersten Start (CommandLineRunner)
│   ├── SecurityConfig.java          # Spring Security: CORS, CSRF disabled, alle /api/** offen
│   └── WebConfig.java               # Web-Konfiguration
├── controller/
│   ├── AuthController.java          # POST /api/auth/login, /logout, GET /me
│   └── CourseController.java        # GET /api/courses, /api/courses/{id}
├── service/
│   ├── AuthService.java             # Authentifizierung (mit absichtlichen Bugs V-03, V-04)
│   └── CourseService.java           # Kurs-Abfragen
├── model/
│   ├── User.java                    # JPA Entity: users-Tabelle
│   ├── Course.java                  # JPA Entity: courses-Tabelle
│   └── LanguageLevel.java           # Enum: A1, A2, B1, B2, C1, C2
├── dto/
│   ├── LoginRequest.java            # { email, password }
│   └── UserResponse.java            # { userId, email, firstName, lastName }
└── repository/
    ├── UserRepository.java          # JpaRepository<User, String>
    └── CourseRepository.java        # JpaRepository<Course, String>
```

## API-Endpoints

### Auth

| Methode | Pfad | Beschreibung |
|---------|------|--------------|
| POST | `/api/auth/login` | Login mit `{ email, password }` → UserResponse oder 401 |
| POST | `/api/auth/logout` | Session invalidieren |
| GET | `/api/auth/me` | Aktuell eingeloggten User abfragen |

### Kurse

| Methode | Pfad | Beschreibung |
|---------|------|--------------|
| GET | `/api/courses` | Alle Kurse des eingeloggten Users (Session-basiert) |
| GET | `/api/courses?language=Englisch` | Kurse nach Sprache filtern |
| GET | `/api/courses/{id}` | Einzelnen Kurs abfragen |

## Datenmodell

### User → Course (Many-to-Many)

```
users                    user_courses              courses
├── user_id (PK)    ←── user_id (FK)              ├── course_id (PK)
├── email (unique)       course_id (FK) ──→        ├── course_name
├── password                                       ├── language
├── first_name                                     ├── level (Enum)
└── last_name                                      ├── teacher
                                                   ├── room
                                                   ├── day_of_week
                                                   ├── start_time
                                                   └── end_time
```

### Testdaten (DataLoader.java)

**User:** Max Mustermann (`max.mustermann@email.com` / `test123`)

**Kurse:**

| ID | Kurs | Sprache | Level | Lehrer | Raum | Tag | Zeit |
|----|------|---------|-------|--------|------|-----|------|
| C001 | Englisch B2 | Englisch | B2 | Sarah Miller | 204 | Monday | 8:0-9:30 |
| C001_OVERLAP | Business English | Englisch | C1 | John Doe | 205 | Monday | 8:0-9:30 |
| C001_2 | Englisch B2 | Englisch | B2 | Sarah Miller | 204 | Wednesday | 8:0-9:30 |
| C002 | Deutsch A1 | Deutsch | A1 | Thomas Schmidt | 101 | Tuesday | 10:0-11:30 |
| C002_2 | Deutsch A1 | Deutsch | A1 | Thomas Schmidt | 101 | Thursday | 10:0-11:30 |
| C003 | Spanisch C1 | Spanisch | C1 | Maria Garcia | 305 | Friday | 14:0-15:30 |
| C004 | Französisch A2 | Französisch | A2 | Jean Dupont | 108 | Monday | 16:0-17:30 |

> Zeiten sind absichtlich im falschen Format (`8:0` statt `08:00`) — das ist Bug F-06.

## Datenbank

- **H2 File-basiert** unter `backend/data/sprachplandb`
- H2-Console erreichbar unter `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/sprachplandb`
- User: `sa`, Passwort: leer
- Schema wird per `spring.jpa.hibernate.ddl-auto=update` automatisch generiert
- Daten werden beim ersten Start via `DataLoader.java` initialisiert

## Security-Konfiguration

- CSRF deaktiviert (Demo-App)
- Alle `/api/**`-Endpoints öffentlich zugänglich (kein Token nötig)
- CORS erlaubt `localhost:3000` und `localhost:5173`
- Session-basierte Auth (Cookie wird vom Browser automatisch mitgesendet)
- Session-Timeout: 30 Minuten

## Absichtliche Backend-Bugs

| Bug | Datei | Was passiert |
|-----|-------|-------------|
| **V-03** | AuthService.java | Passwort `"12"` wird immer akzeptiert (Zeile: `password.equals("12")`) |
| **V-04** | AuthService.java | `' OR '1'='1` im Passwort gibt den ersten User zurück |
| **F-06** | DataLoader.java | Zeitangaben wie `"8:0"` statt `"08:00"` in den Testdaten |
