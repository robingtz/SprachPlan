# SprachPlan Backend - Spring Boot REST API

## Überblick

Dies ist das Backend für die SprachPlan WebApp. Es bietet eine REST API für die Kursverwaltung und Benutzer-Authentifizierung.

## Technologie-Stack

- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Data JPA**
- **Spring Security**
- **H2 Database** (File-basiert für persistente Speicherung)
- **Maven**

## Voraussetzungen

- Java 17 oder höher installiert
- Keine separate Datenbank-Installation nötig (H2 embedded)

## Installation & Start

### 1. Backend starten

```bash
cd backend
./mvnw spring-boot:run
```

Das Backend startet auf **Port 8080**.

### 2. Erste Anmeldung

Das Backend wird automatisch mit Testdaten initialisiert:

**Benutzer:**
- Email: `max.mustermann@email.com`
- Passwort: `test123`

**Kurse:** 7 Kurse werden automatisch dem Benutzer zugewiesen (gleiche wie die Mock-Daten im Frontend).

### 3. Frontend starten (in separatem Terminal)

```bash
cd ..
npm run dev
```

Das Frontend startet auf **Port 3000** und leitet API-Requests automatisch an Port 8080 weiter.

## API Endpoints

### Authentifizierung

| Methode | Endpoint | Beschreibung | Request Body |
|---------|----------|--------------|--------------|
| `POST` | `/api/auth/login` | Login | `{ "email": "...", "password": "..." }` |
| `POST` | `/api/auth/logout` | Logout | - |
| `GET` | `/api/auth/me` | Aktueller User | - |

### Kurse

| Methode | Endpoint | Beschreibung | Query Params |
|---------|----------|--------------|--------------|
| `GET` | `/api/courses` | Alle Kurse des Users | `?language=Englisch` (optional) |
| `GET` | `/api/courses/{id}` | Einzelner Kurs | - |

## Datenbank

### H2 Console (optional)

Die H2 Console ist aktiviert und kann unter folgender URL aufgerufen werden:

```
http://localhost:8080/h2-console
```

**Zugangsdaten:**
- JDBC URL: `jdbc:h2:file:./data/sprachplandb`
- Username: `sa`
- Password: _(leer lassen)_

### Daten-Persistenz

Die Datenbank wird im Ordner `/backend/data/` gespeichert. Die Daten bleiben erhalten, auch wenn das Backend neu gestartet wird.

**Datenbank zurücksetzen:**

```bash
cd backend
rm -rf data/
./mvnw spring-boot:run
```

Die Datenbank wird beim nächsten Start neu initialisiert.

## Projekt-Struktur

```
backend/
├── src/main/java/de/sprachplan/
│   ├── SprachplanApplication.java       # Hauptanwendung
│   ├── config/
│   │   ├── WebConfig.java               # CORS Konfiguration
│   │   ├── SecurityConfig.java          # Spring Security
│   │   └── DataLoader.java              # Initiale Daten
│   ├── controller/
│   │   ├── AuthController.java          # Auth Endpoints
│   │   └── CourseController.java        # Kurs Endpoints
│   ├── model/
│   │   ├── User.java                    # User Entity
│   │   ├── Course.java                  # Course Entity
│   │   └── LanguageLevel.java           # Enum (A1-C2)
│   ├── repository/
│   │   ├── UserRepository.java          # User DB Access
│   │   └── CourseRepository.java        # Course DB Access
│   ├── service/
│   │   ├── AuthService.java             # Auth Business Logic
│   │   └── CourseService.java           # Course Business Logic
│   └── dto/
│       ├── LoginRequest.java            # Login Request DTO
│       └── UserResponse.java            # User Response DTO
├── src/main/resources/
│   └── application.properties           # Konfiguration
├── pom.xml                              # Maven Dependencies
└── README.md
```

## Entwicklung

### Maven Wrapper nutzen

Das Projekt enthält einen Maven Wrapper (`mvnw`), sodass Maven nicht separat installiert werden muss.

**Windows:**
```bash
mvnw.cmd spring-boot:run
```

**Mac/Linux:**
```bash
./mvnw spring-boot:run
```

### Hot Reload

Spring Boot DevTools ist aktiviert. Änderungen am Code werden automatisch neu geladen.

### Logs

Logs werden in der Konsole ausgegeben. Das Log-Level für das SprachPlan-Paket ist auf `DEBUG` gesetzt.

## ⚠️ WICHTIG: Absichtliche Fehler für Unterrichtszwecke

**Diese WebApp wurde speziell für den Berufsschulunterricht entwickelt und enthält ABSICHTLICH eingebaute Fehler!**

Die Fehler dienen dazu, dass Schülerinnen und Schüler verschiedene Testverfahren (Black-Box, White-Box, Unit-Tests, Systemtests) anwenden und professionelle Fehlerberichte erstellen können.

### Im Backend implementierte Fehler

| Fehler-ID | Beschreibung | Datei | Zeile |
|-----------|--------------|-------|-------|
| **V-03** | Passwort "12" wird akzeptiert (zu kurz) | `AuthService.java` | ~32 |
| **V-04** | SQL-Injection möglich: `' OR '1'='1` umgeht Login | `AuthService.java` | ~23-27 |
| **F-06** | Zeitformat falsch: "8:0" statt "08:00" | `DataLoader.java` | ~41-72 |

### Im Frontend implementierte Fehler

Siehe `CLAUDE.md` für die vollständige Liste aller 18 Fehler.

**Wichtige Fehler:**
- **A-01**: Nach Login muss F5 gedrückt werden (App.tsx)
- **F-01**: Logout-Button funktioniert nicht (App.tsx)
- **P-01**: Login dauert 6,7 Sekunden (authService.ts)
- **A-02**: Alle Kurse sind grau statt farbcodiert (constants.ts)
- Weitere 11 Fehler in verschiedenen Komponenten

### Alternative Login-Möglichkeiten (wegen Bugs)

**Standard-Login:**
- Email: `max.mustermann@email.com`
- Passwort: `test123`

**Alternative (wegen Validierungsfehlern):**
- Passwort: `12` funktioniert auch (**Fehler V-03**)
- Passwort: `' OR '1'='1` umgeht komplett die Authentifizierung (**Fehler V-04**)

## Sicherheit

**WICHTIG:** Diese Anwendung ist nur für Demonstrationszwecke!

- Passwörter werden im **Klartext** gespeichert (NICHT für Produktion geeignet!)
- CSRF-Schutz ist deaktiviert
- Enthält **absichtliche Sicherheitslücken** für Unterrichtszwecke
- Für eine Produktionsumgebung sollte BCrypt-Hashing verwendet werden

## Troubleshooting

### Port 8080 bereits belegt

Ändere den Port in `src/main/resources/application.properties`:

```properties
server.port=8081
```

Passe dann auch den Proxy im Frontend (`vite.config.ts`) an.

### Datenbank-Fehler

Lösche den `data/` Ordner und starte das Backend neu:

```bash
rm -rf backend/data/
cd backend && ./mvnw spring-boot:run
```

### CORS-Fehler

Stelle sicher, dass:
1. Das Backend auf Port 8080 läuft
2. Das Frontend auf Port 3000 läuft
3. Der Vite-Proxy korrekt konfiguriert ist

## Support

Bei Problemen oder Fragen, siehe die Hauptdokumentation im Projekt-Root (`CLAUDE.md`).
