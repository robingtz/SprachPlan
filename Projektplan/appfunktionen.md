1. Die Login-Daten
   Basierend auf der Datei constants.ts und services/authService.ts sind dies die korrekten Standard-Zugangsdaten:
   E-Mail: max.mustermann@email.com
   Passwort: test123
   ⚠️ Wichtige Hinweise zum Login (wegen der eingebauten Fehler):
   Lange Ladezeit (Fehler P-01): Wenn du auf "Anmelden" klickst, passiert für 6,7 Sekunden gar nichts. Das ist der eingebaute Performance-Fehler. Warte geduldig ab.
   Keine Weiterleitung (Fehler A-01): Nach den 6,7 Sekunden verschwindet der Ladebalken, aber du bleibst auf der Login-Seite stehen. Du musst die Seite manuell neu laden (F5), um den Stundenplan zu sehen.
   Alternative Logins (wegen Fehler V-03 & V-04):
   Du kannst auch das Passwort 12 nutzen.
   Du kannst im Passwortfeld ' OR '1'='1 eingeben, um dich ohne echtes Passwort einzuhacken (SQL Injection Simulation).

2. Funktionsweise der "Datenbank" (JSON)
   In dieser WebApp gibt es keine echte externe Datenbank (wie MySQL oder MongoDB) und auch keine externe JSON-Datei, die über eine API geladen wird. Die Datenbank wird im Code simuliert.
   So funktioniert es technisch:
   A. Die Datenquelle (
   Die Datei constants.ts fungiert als deine Datenbank. Dort sind die Daten fest als JavaScript-Objekte (JSON-Format) hinterlegt:
   MOCK_USER: Enthält die Benutzerdaten von Max Mustermann.
   MOCK_COURSES: Enthält die Liste aller Kurse.
   B. Der Datenfluss
   Import: Die Datei App.tsx importiert die Daten:
   codeTypeScript
   import { MOCK_COURSES } from './constants';

Übergabe: Die App.tsx gibt diese Daten dann direkt an die Komponente Schedule weiter:
codeTypeScript
<Schedule courses={MOCK_COURSES} />

Anzeige: Die Schedule.tsx nimmt diese Liste und erstellt daraus die visuellen Kacheln.
C. Die Sitzungsspeicherung (
Damit sich die App merkt, dass du eingeloggt bist (auch wenn du die Seite neu lädst), nutzt sie den Session Storage des Browsers.
Beim Login speichert sie: sessionStorage.setItem('sprachplan_user', ...)
Beim Laden der App prüft sie: sessionStorage.getItem('sprachplan_user')
Möchtest du also die Daten ändern (z.B. einen Kurs hinzufügen), musst du direkt den Code in der Datei constants.ts bearbeiten und die Seite neu laden.
