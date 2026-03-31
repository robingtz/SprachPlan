# Unterrichtsplanung & Bewertung

## Fehlersets nach Schwierigkeitsgrad

### Basis-Set (2-3 UE, 8 Fehler) — Anfänger
A-01, A-02, A-05, F-01, F-03, V-01, V-02, V-03
→ Fokus: Black-Box-Testing, visuelle Inspektion

### Fortgeschrittenen-Set (4-5 UE, 14 Fehler)
Basis + A-03, A-04, F-04, F-05, F-06, R-01
→ Fokus: Black-Box + Responsive-Tests

### Experten-Set (6-9 UE, alle 18 Fehler)
Alle Fehler inkl. V-04 (SQL-Injection), R-02, R-03, P-01
→ Fokus: Alle Testverfahren inkl. Security + Performance

## Unterrichtsstruktur

1. **Einführung (1 UE):** Demo der App, Testverfahren erklären, Teams bilden (2-3 Personen)
2. **Testphase (2-4 UE):** Systematisch testen, Fehler dokumentieren
3. **Auswertung (1 UE):** Teams präsentieren, Vergleich mit Musterlösung
4. **Optional: Behebung (2-3 UE):** Code-Fehler fixen (Pair Programming)

## Login-Hinweise für Schüler

- Login: `max.mustermann@email.com` / `test123`
- Nach Login **6,7 Sekunden warten** (Bug P-01), dann **F5 drücken** (Bug A-01)
- Beide Server müssen laufen (Backend Port 8080 + Frontend Port 3000)

## Bewertung

### Pro Fehler (0-10 Punkte)

| Kriterium | Punkte |
|-----------|--------|
| Vollständigkeit (Titel, Beschreibung, Schritte) | 0-3 |
| Reproduzierbarkeit | 0-3 |
| Schweregrad korrekt | 0-2 |
| Screenshot/Beweis | 0-2 |

### Notenskala (Basis-Set, 8 Fehler)

| Punkte | Note |
|--------|------|
| 80-100 | 1 (Sehr gut) |
| 60-79 | 2 (Gut) |
| 40-59 | 3 (Befriedigend) |
| 20-39 | 4 (Ausreichend) |
| 0-19 | 5 (Mangelhaft) |

### Bonus-Punkte

| Leistung | Bonus |
|----------|-------|
| Schwierige Fehler (V-04, P-01, R-01) | +10/Fehler |
| Performance-Tests mit DevTools | +15 |
| Verbesserungsvorschläge | +10 |
| White-Box Code-Analyse | +20 |
| Fehler im Code behoben | +30 |

## Testprotokoll-Vorlage

```
TESTPROTOKOLL - SprachPlan WebApp
──────────────────────────────────
Tester/Team:         ______________________________
Datum:               ______________________________
Browser:             ______________________________
Testumgebung:        [ ] Desktop  [ ] Tablet  [ ] Smartphone

FEHLER #___
──────────────────────────────────
Fehler-ID:           ________
Titel:               ________________________________________
Schweregrad:         [ ] Kritisch  [ ] Hoch  [ ] Mittel  [ ] Niedrig

Schritte zur Reproduktion:
1. ___________________________________________________
2. ___________________________________________________
3. ___________________________________________________

Erwartetes Ergebnis:  ________________________________________
Tatsächliches Ergebnis: ______________________________________

Testverfahren: [ ] Black-Box  [ ] White-Box  [ ] Responsive
               [ ] Performance  [ ] Security  [ ] Unit-Test

Screenshot:    [ ] Angehängt  [ ] Nicht verfügbar
```

## Definition of Done

Ein Fehler ist korrekt dokumentiert wenn:
- Titel beschreibt das Problem präzise
- Schritte zur Reproduktion sind vollständig
- Erwartetes vs. tatsächliches Ergebnis klar beschrieben
- Schweregrad logisch begründet
- Testverfahren genannt
- Screenshot oder Beschreibung vorhanden

## Testverfahren-Kurzübersicht

| Verfahren | Beschreibung |
|-----------|--------------|
| **Black-Box** | Testen ohne Code-Kenntnis (nur Bedienung) |
| **White-Box** | Testen mit Code-Kenntnis (Code-Analyse) |
| **Responsive** | Verschiedene Bildschirmgrößen testen |
| **Performance** | Ladezeiten messen (DevTools Network-Tab) |
| **Security** | Sicherheitslücken suchen (z.B. SQL-Injection) |
