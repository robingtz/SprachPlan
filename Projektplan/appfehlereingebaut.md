Vorhanden Fehler in der WebApp

Hier ist eine Übersicht der Fehler, die aktuell im Code implementiert sind, basierend auf dem bereitgestellten Code und dem Fehler-Katalog:
Kategorie 1: Anzeigeprobleme (UI-Bugs)
A-01: Liste aktualisiert sich nicht nach Login
Ort: App.tsx
Code: // setUser(loggedUser); ist auskommentiert. Der State wird nach dem Login nicht gesetzt, der User bleibt auf dem Login-Screen hängen (oder sieht keine Daten), bis er neu lädt.

A-02: Farben der Kurse werden nicht korrekt angezeigt
Ort: constants.ts
Code: Alle LEVEL_COLORS sind auf '#CCCCCC' (Grau) gesetzt.

A-03: Raumnummer wird abgeschnitten auf Mobile
Ort: components/Schedule.tsx
Code: <span className="w-12 truncate block">{course.room}</span> begrenzt die Breite extrem.

A-04: Überschneidende Kurse werden nicht korrekt dargestellt
Ort: constants.ts (Daten) & components/Schedule.tsx (Logik)
Code: Es wurde ein Kurs C001_OVERLAP hinzugefügt, der zeitgleich mit C001 stattfindet. Die CSS-Grid-Logik hat keine Vorkehrung, um diese nebeneinander darzustellen; sie werden sich überlagern oder das Layout verschieben.

A-05: Modal schließt nicht beim Klick auf "X"
Ort: components/CourseDetailModal.tsx
Code: Der onClick-Handler des X-Buttons führt nur ein console.log aus, ruft aber nicht onClose auf.

Kategorie 2: Funktionsdefekte
F-01: Logout-Button funktioniert nicht
Ort: App.tsx
Code: Die handleLogout-Funktion führt nur ein console.log aus; die AuthService.logout() Zeile ist auskommentiert.

F-03: Filter-Funktion zeigt falsche Ergebnisse
Ort: components/Schedule.tsx
Code: const filteredCourses = courses; ignoriert die Auswahl im Dropdown komplett.

F-04: PDF-Export erstellt leere Datei
Ort: components/Schedule.tsx
Code: Der Button löst nur ein alert("PDF wurde erstellt (0 KB)"); aus.

F-05: Detailansicht zeigt falsche Lehrkraft
Ort: components/CourseDetailModal.tsx
Code: <p className="font-medium">Sarah Miller</p> ist fest einkodiert (hardcoded) und ignoriert die echten Kursdaten.

F-06: Uhrzeit wird im falschen Format angezeigt
Ort: constants.ts
Code: In MOCK_COURSES sind Zeiten wie '8:0' statt '08:00' hinterlegt.

Kategorie 3: Validierungsfehler
V-01: Login akzeptiert leere Felder
Ort: components/Login.tsx
Code: Das required-Attribut wurde aus den Input-Feldern entfernt.

V-02: Ungültige E-Mail-Adressen werden akzeptiert
Ort: components/Login.tsx
Code: Das Input-Feld ist type="text" statt type="email".

V-03: Passwort-Feld akzeptiert zu kurze Passwörter
Ort: services/authService.ts
Code: Die Validierung erlaubt explizit das Passwort '12'.

V-04: SQL-Injection möglich im Login-Formular
Ort: services/authService.ts
Code: Es gibt eine explizite Abfrage: if (... || password.includes("' OR '1'='1")), die den Login zulässt.

Kategorie 4: Responsive-Fehler
R-01: Layout bricht auf Tablets (768px)
Ort: components/Schedule.tsx
Code: Das Grid nutzt minmax(200px,1fr). Bei 5 Spalten + Zeitspalte benötigt das Grid mindestens ca. 1100px Platz. Auf einem Tablet (768px) wird dies das Layout sprengen/überlappen.

R-02: Buttons zu klein auf Mobile
Ort: components/CourseDetailModal.tsx
Code: Der Schließen-Button hat w-6 h-6 (24px) und p-1, was weit unter den empfohlenen 44px für Touch-Targets liegt.

R-03: Horizontales Scrollen nötig auf Smartphone
Ort: components/Schedule.tsx
Code: Der Wrapper für die Mobile-Ansicht hat die Klasse min-w-[500px], was auf den meisten Smartphones (ca. 375-390px breit) horizontales Scrollen erzwingt.
Kategorie 5: Performance-Probleme
P-01: Ladezeit über 5 Sekunden
Ort: services/authService.ts
Code: Ein künstlicher Delay setTimeout(resolve, 6700) (6,7 Sekunden) bremst den Login aus.
Nicht implementiert (da server-seitig oder spezifische Daten fehlend):
S-01/S-02 (SSL): Dies sind Infrastruktur-Einstellungen und nicht im React-Code sichtbar.
P-02 (Browser friert ein): Dafür fehlte im Mock-Datensatz die Masse an Daten (25+ Kurse), um den Browser wirklich zum Hängen zu bringen.
F-02 (Passwort ändern): Die Einstellungsseite existiert in dieser Demo nicht.
