# 📚 SprachPlan - Kursmanagement für Sprachschulen

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.3-61dafb.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-6db33f.svg)

**SprachPlan** ist eine moderne WebApp für das Kursmanagement von Sprachschulen. Die Anwendung ermöglicht es Sprachschülern, ihren persönlichen Stundenplan einzusehen, Kursdetails abzurufen und ihre Lernzeiten optimal zu planen.

Entwickelt für **LanguageHub International** - Ihre internationale Sprachschule für Erwachsenenbildung.

---

## 🎯 Features

### ✨ Hauptfunktionen

- **📅 Wochenübersicht** - Übersichtlicher Stundenplan von Montag bis Freitag
- **🎨 Farbcodierung** - Visuelle Unterscheidung nach Sprachniveau (A1-C2)
- **📱 Responsive Design** - Optimiert für Desktop, Tablet und Smartphone
- **🔒 Sichere Authentifizierung** - Session-basiertes Login mit Spring Security
- **ℹ️ Detailansicht** - Umfassende Kursinformationen auf Knopfdruck
- **🔍 Filter-Funktion** - Kurse nach Sprache filtern
- **💾 Datenpersistenz** - H2-Datenbank für zuverlässige Datenspeicherung

### 🎓 Sprachniveaus

| Niveau | Bezeichnung | Farbe |
|--------|-------------|-------|
| **A1** | Anfänger | 🟢 Hellgrün |
| **A2** | Grundlagen | 🟢 Grün |
| **B1** | Mittelstufe | 🔵 Hellblau |
| **B2** | Fortgeschritten | 🔵 Blau |
| **C1** | Kompetent | 🟠 Orange |
| **C2** | Meisterschaft | 🔴 Rot |

---

## 🚀 Schnellstart

### Voraussetzungen

Stellen Sie sicher, dass folgende Software installiert ist:

- **Node.js** (Version 16+)
- **npm** oder **yarn**
- **Java 17** oder höher
- **Maven** (wird über Maven Wrapper bereitgestellt)

### Installation

```bash
# Repository klonen
git clone https://github.com/languagehub/sprachplan.git
cd sprachplan

# Frontend-Abhängigkeiten installieren
npm install

# Backend-Abhängigkeiten installieren
cd backend
./mvnw clean install
cd ..
```

### Anwendung starten

**Terminal 1 - Backend starten:**
```bash
cd backend
./mvnw spring-boot:run
```

Das Backend läuft auf: **http://localhost:8080**

**Terminal 2 - Frontend starten:**
```bash
npm run dev
```

Das Frontend läuft auf: **http://localhost:3000**

### Login

Öffnen Sie Ihren Browser und navigieren Sie zu **http://localhost:3000**

**Demo-Zugangsdaten:**
```
E-Mail:    max.mustermann@email.com
Passwort:  test123
```

---

## 📦 Technologie-Stack

### Frontend
- **React 19.2.3** - Moderne UI-Bibliothek
- **TypeScript 5.8.2** - Typsicherheit und bessere Developer Experience
- **Vite 6.2.0** - Ultraschneller Build-Tool
- **Tailwind CSS** - Utility-First CSS Framework (via inline classes)
- **Lucide React** - Moderne Icon-Bibliothek

### Backend
- **Spring Boot 3.2.1** - Enterprise-Grade Java Framework
- **Spring Data JPA** - Vereinfachte Datenbankzugriffe
- **Spring Security** - Authentifizierung und Autorisierung
- **H2 Database** - Embedded File-Based Database
- **Lombok** - Reduzierung von Boilerplate-Code
- **Maven** - Dependency Management und Build Tool

### Architektur
```
┌─────────────────┐      REST API       ┌──────────────────┐      JPA       ┌──────────┐
│  React Frontend │ ◄─────────────────► │ Spring Boot      │ ◄─────────────► │ H2 DB    │
│  (Port 3000)    │    JSON/HTTP        │ Backend          │   SQL Queries  │ (File)   │
└─────────────────┘                     │  (Port 8080)     │                └──────────┘
                                        └──────────────────┘
```

---

## 🗂️ Projektstruktur

```
sprachplan/
├── backend/                              # Java Spring Boot Backend
│   ├── src/main/java/de/sprachplan/
│   │   ├── SprachplanApplication.java   # Hauptanwendung
│   │   ├── config/                      # Konfiguration & DataLoader
│   │   ├── controller/                  # REST API Endpoints
│   │   ├── model/                       # JPA Entities (User, Course)
│   │   ├── repository/                  # Datenbank-Zugriff
│   │   ├── service/                     # Business Logic
│   │   └── dto/                         # Data Transfer Objects
│   ├── src/main/resources/
│   │   └── application.properties       # Backend-Konfiguration
│   ├── data/                            # H2 Datenbank (wird erstellt)
│   └── pom.xml                          # Maven Dependencies
├── src/
│   ├── components/
│   │   ├── Login.tsx                    # Login-Formular
│   │   ├── Schedule.tsx                 # Stundenplan-Anzeige
│   │   ├── CourseDetailModal.tsx        # Detailansicht
│   │   └── Button.tsx                   # Wiederverwendbare Button-Komponente
│   ├── services/
│   │   └── authService.ts               # API-Kommunikation
│   ├── App.tsx                          # Hauptkomponente
│   ├── constants.ts                     # App-Konstanten
│   └── main.tsx                         # App-Einstiegspunkt
├── vite.config.ts                       # Vite-Konfiguration mit Proxy
├── package.json                         # Frontend-Dependencies
└── README.md                            # Diese Datei
```

Detaillierte Informationen zur Architektur finden Sie in [`Projektstruktur.md`](./Projektstruktur.md).

---

## 📊 Datenmodell

### User (Benutzer)

```typescript
interface User {
  userId: string;           // Eindeutige Benutzer-ID
  email: string;            // E-Mail-Adresse (Login)
  password: string;         // Passwort (gehashed)
  firstName: string;        // Vorname
  lastName: string;         // Nachname
}
```

### Course (Kurs)

```typescript
interface Course {
  courseId: string;         // Eindeutige Kurs-ID (z.B. "C001")
  courseName: string;       // Kursname (z.B. "Englisch B2")
  language: string;         // Sprache (z.B. "Englisch")
  level: string;            // Niveau (A1, A2, B1, B2, C1, C2)
  teacher: string;          // Name der Lehrkraft
  room: string;             // Raumnummer (z.B. "204")
  dayOfWeek: string;        // Wochentag (Monday-Friday)
  startTime: string;        // Startzeit (z.B. "08:00")
  endTime: string;          // Endzeit (z.B. "09:30")
  color: string;            // Hex-Farbcode für UI
}
```

### Demo-Daten

Die Anwendung wird mit folgendem Demo-Benutzer ausgeliefert:

**Benutzer: Max Mustermann**
```json
{
  "userId": "12345",
  "email": "max.mustermann@email.com",
  "password": "test123",
  "firstName": "Max",
  "lastName": "Mustermann"
}
```

**Zugewiesene Kurse:**

| Kurs-ID | Kursname | Sprache | Niveau | Lehrkraft | Raum | Tag | Zeit |
|---------|----------|---------|--------|-----------|------|-----|------|
| C001 | Englisch B2 | Englisch | B2 | Sarah Miller | 204 | Montag | 08:00-09:30 |
| C001_2 | Englisch B2 | Englisch | B2 | Sarah Miller | 204 | Mittwoch | 08:00-09:30 |
| C001_OVERLAP | Business English | Englisch | C1 | John Doe | 205 | Montag | 08:00-09:30 |
| C002 | Deutsch A1 | Deutsch | A1 | Thomas Schmidt | 101 | Dienstag | 10:00-11:30 |
| C002_2 | Deutsch A1 | Deutsch | A1 | Thomas Schmidt | 101 | Donnerstag | 10:00-11:30 |
| C003 | Spanisch C1 | Spanisch | C1 | Maria Garcia | 305 | Freitag | 14:00-15:30 |
| C004 | Französisch A2 | Französisch | A2 | Jean Dupont | 108 | Montag | 16:00-17:30 |

---

## 🔌 API-Endpunkte

### Authentifizierung

**POST** `/api/auth/login`
```json
// Request Body
{
  "email": "max.mustermann@email.com",
  "password": "test123"
}

// Response (200 OK)
{
  "userId": "12345",
  "email": "max.mustermann@email.com",
  "firstName": "Max",
  "lastName": "Mustermann"
}
```

**POST** `/api/auth/logout`
```json
// Response (200 OK)
{
  "message": "Logout successful"
}
```

### Kurse

**GET** `/api/courses`
```json
// Response (200 OK)
[
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
  },
  // ... weitere Kurse
]
```

**GET** `/api/courses/{courseId}`
```json
// Response (200 OK)
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

Vollständige API-Dokumentation: [`Projektstruktur.md`](./Projektstruktur.md)

---

## 🛠️ Entwicklung

### Produktions-Build erstellen

```bash
# Frontend bauen
npm run build

# Der "dist"-Ordner enthält die produktionsreifen Dateien
```

### Backend-JAR erstellen

```bash
cd backend
./mvnw clean package

# JAR-Datei wird erstellt in: target/sprachplan-backend-1.0.0.jar
java -jar target/sprachplan-backend-1.0.0.jar
```

### Umgebungsvariablen

**Backend** (`backend/src/main/resources/application.properties`):
```properties
# Server Configuration
server.port=8080

# H2 Database Configuration
spring.datasource.url=jdbc:h2:file:./data/sprachplan
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# Security
spring.security.user.name=admin
spring.security.user.password=admin123
```

**Frontend** (`vite.config.ts`):
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
```

---

## 🧪 Testing

### Frontend-Tests

```bash
# Unit-Tests ausführen
npm test

# Test-Coverage
npm run test:coverage
```

### Backend-Tests

```bash
cd backend

# Tests ausführen
./mvnw test

# Mit Coverage-Report
./mvnw test jacoco:report
```

---

## 📱 Responsive Design

Die Anwendung ist optimiert für folgende Breakpoints:

| Gerät | Breite | Optimierung |
|-------|--------|-------------|
| **Smartphone** | < 640px | Kompakte Ansicht, Touch-optimierte Buttons |
| **Tablet** | 640px - 1024px | 2-Spalten-Layout |
| **Desktop** | > 1024px | Vollständige Wochenansicht |

---

## 🎨 Design-System

### Farbpalette

```css
/* Primärfarben */
--color-primary: #3B82F6;      /* Blau */
--color-secondary: #8B5CF6;    /* Violett */
--color-accent: #10B981;       /* Grün */

/* Sprachniveaus */
--level-a1: #90EE90;           /* Hellgrün */
--level-a2: #32CD32;           /* Grün */
--level-b1: #87CEEB;           /* Hellblau */
--level-b2: #4169E1;           /* Blau */
--level-c1: #FFA500;           /* Orange */
--level-c2: #FF6347;           /* Rot */

/* Neutral */
--color-gray-100: #F3F4F6;
--color-gray-800: #1F2937;
```

### Typografie

- **Schriftart:** System Font Stack (optimale Performance)
- **Überschriften:** 2xl - 4xl, font-bold
- **Fließtext:** base - lg, font-normal

---

## 🔐 Sicherheit

### Implementierte Sicherheitsmaßnahmen

- ✅ **Session-basierte Authentifizierung** mit Spring Security
- ✅ **Passwort-Hashing** (BCrypt)
- ✅ **CSRF-Protection** für Formular-Submissions
- ✅ **Input-Validierung** auf Frontend und Backend
- ✅ **Prepared Statements** (JPA) gegen SQL-Injection
- ✅ **HTTP-Only Cookies** für Session-Management

### Best Practices

```typescript
// Frontend: Input-Validierung
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Backend: Password-Policy
@Min(8, message = "Passwort muss mindestens 8 Zeichen haben")
private String password;
```

---

## 🚢 Deployment

### Docker (Optional)

```dockerfile
# Dockerfile für Production
FROM node:18 AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM eclipse-temurin:17-jdk AS backend-build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/src ./src
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre
COPY --from=backend-build /app/target/*.jar app.jar
COPY --from=frontend-build /app/dist /static
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
# Container bauen und starten
docker build -t sprachplan:1.0.0 .
docker run -p 8080:8080 sprachplan:1.0.0
```

---

## 📄 Lizenz

Dieses Projekt steht unter der **MIT-Lizenz**.

```
MIT License

Copyright (c) 2024 LanguageHub International

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Team & Kontakt

**LanguageHub International**  
Entwicklungsabteilung  

📧 E-Mail: dev@languagehub.international  
🌐 Website: https://www.languagehub.international  
💼 LinkedIn: [LanguageHub International](https://linkedin.com/company/languagehub)

### Projektverantwortliche

- **Product Owner:** Anna Schmidt
- **Tech Lead:** Marcus Weber  
- **Frontend Development:** Sarah Meyer
- **Backend Development:** Thomas Bauer

---

## 🤝 Beitragen

Wir freuen uns über Beiträge! Bitte beachten Sie folgende Guidelines:

1. **Fork** das Repository
2. **Branch** erstellen (`git checkout -b feature/AmazingFeature`)
3. **Commit** mit aussagekräftiger Nachricht (`git commit -m 'Add: Amazing Feature'`)
4. **Push** zum Branch (`git push origin feature/AmazingFeature`)
5. **Pull Request** erstellen

### Code-Standards

- **TypeScript:** ESLint + Prettier
- **Java:** Google Java Style Guide
- **Commits:** Conventional Commits (feat, fix, docs, style, refactor, test, chore)

---

## 📚 Weitere Dokumentation

- [Projektstruktur & API](./Projektstruktur.md)
- [Backend-Dokumentation](./backend/README.md)
- [User Guide](./docs/USER_GUIDE.md) *(in Arbeit)*
- [Deployment Guide](./docs/DEPLOYMENT.md) *(in Arbeit)*

---

## 🙏 Danksagungen

Besonderer Dank an:

- **React Team** für das großartige UI-Framework
- **Spring Boot Community** für das robuste Backend-Framework
- **Tailwind CSS** für das moderne CSS-Framework
- **LanguageHub International** für die Möglichkeit, dieses Projekt zu realisieren

---

## 📝 Changelog

### Version 1.0.0 (2024-01-15)

**Initiales Release**

- ✨ Benutzer-Authentifizierung mit Session-Management
- ✨ Wochenansicht für Kurspläne
- ✨ Detailansicht für einzelne Kurse
- ✨ Farbcodierung nach Sprachniveau
- ✨ Responsive Design für alle Geräte
- ✨ Filter nach Sprache
- ✨ H2-Datenbank mit Persistent Storage
- ✨ REST API mit Spring Boot
- 📦 Demo-Daten für schnellen Einstieg

---

**Gebaut mit ❤️ von LanguageHub International**

---

## 🆘 Support & Troubleshooting

### Häufige Probleme

**Problem:** Port 3000 ist bereits belegt
```bash
# Lösung: Anderen Port verwenden
npm run dev -- --port 3001
```

**Problem:** Port 8080 ist bereits belegt (Backend)
```bash
# Lösung: Prozess beenden
# Mac/Linux
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Problem:** Datenbank nicht gefunden
```bash
# Lösung: Data-Ordner erstellen
mkdir backend/data
```

**Problem:** Module not found
```bash
# Lösung: Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
```

---

**Status:** ✅ Production Ready  
**Letzte Aktualisierung:** 2024-01-15  
**Maintainer:** LanguageHub Development Team
