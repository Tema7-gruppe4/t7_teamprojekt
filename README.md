# Teknisk dokumentation for Tema 7 gruppeprojekt
Når man er flere der bidrager til en kodebase, lærer man hurtigt, at ens sædvanlige måder at gøre tingene på ikke nødvendigvis er logisk for alle.

Skriv derfor jeres fælles retningslinjer for punkterne herunder(tilføj gerne flere selv), sådan som det giver bedst mening for jer som gruppe. Dokumentationen sikre, at jeres fælles kodebase forbliver overskuelig, er let at arbejde med og til at forstå for alle, og at I undgå konflikter, og har nemmere ved at hjælpe hinanden undervejs.

## Projektstruktur:
Beslut, hvordan I vil organisere jeres projekt – struktur for mapper og filer.
- Hvordan organiserer I billeder, fonte og andre ressourcer?
- Hvor placerer I boilerplate?(fx CSS- og JavaScript-filer, der bruges på tværs af projektet)
- Hvor placerer I HTML, CSS- og JavaScript-filer til fx detaljevisning og listevisning?

## Navngivning:
Beslutte hvordan i vil navngive filer og mapper for at sikre en ensartet struktur og undgå forvirring.
- Hvordan navngiver I filnavne? (fx små bogstaver, ingen mellemrum, brug af - eller _)
- Hvordan sikre I at det er til at forstå hvilke HTML-, CSS- og JavaScript-filer der høre sammen?

## Link til scripts:
- Hvor placerer I script referencer i HTML'en? (fx i <head> med defer attribute, eller sidst i <body>)

## Git branches:
- Hvordan navngiver I branches, så alle kan forstår hvem der arbejder i branchen og på hvad?(fx feature-lotte-formular)

## Arbejdsflow:
- Hvordan fordeler I arbejdet, så I undgår at flere arbejder i de samme filer samtidigt?
- Hvordan sikrer I, at commit-beskeder er beskrivende?
- Hvordan kommunikerer i om ændringer i main branchen når feature merges?

## Kode:
- Hvordan skriver i funktioner i JavaScript?(fx med function keyword eller som arrow functions)
- Beslut hvilken CSS selector i benyttes til referener i henholdsvis CSS og JavaScript(fx. id'er til JavaScript og Classes til CSS)
- Skal filer have korte forklaringer som kommentarer?

# Funktionalitet
Dette afsnit skal forklare hvad I konkret har arbejde med, for at udvikle websitet. Tænk over hvilke interaktioner brugeren kan foretage på sitet? Eller hvordan websitet håndterer og præsenterer data? Eksempler på funktionalitet, der kan beskrives:

- Hentning af produkter fra API.
- Filtrering af produkter baseret på brugerens valg.
- Dynamisk visning af produkter i HTML.

Brug korte beskrivelser, som i eksemplerne herover

# API endpoints
Dette afsnit skal liste de endpoints fra API'et i har benyttet:
- (fx. https://dummyjson.com/products)

# Dokumentation af Funktion 
Dette afsnit skal beskrive en funktion I selv har udviklet. Det kunne eksempelvis være en funktion der generere en listen over fx. produkter: 

- Beskrivelse: Hvad gør funktionen? Hvordan spiller den sammen med resten af koden?
- Parametre: Hvilke input forventes (fx en værdi fra en dropdown eller URL'en)?
- Returnerer: Beskriv, om funktionen returnerer en værdi eller blot manipulerer DOM’en.
- Eksempel på brug: Indsæt funktions-koden herunder(der hvor koden er i eksemplet) og vis, hvordan funktionen kaldes:
```javascript
//funktionens kode:
function voresFunktion(sprog){
  console.log(`${sprog} syntax highlighting`)
};
//hvordan funktionen kaldes:
voresFunktion("JavaScript");
```
