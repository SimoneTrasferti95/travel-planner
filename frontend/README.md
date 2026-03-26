# Travel Planner

Travel Planner è un'applicazione full stack per la gestione di viaggi e luoghi da visitare.

## Obiettivo del progetto

L'applicazione permette di:

- visualizzare tutti i viaggi
- aggiungere un nuovo viaggio
- eliminare un viaggio
- visualizzare il dettaglio di un viaggio
- aggiungere luoghi a un viaggio
- cambiare lo stato di un luogo
- eliminare un luogo

## Tecnologie utilizzate

### Backend
- Node.js
- Express
- TypeScript
- Prisma
- MySQL

### Frontend
- React
- Vite
- TypeScript

## Struttura del progetto

```text
travel-planner/
├── backend/
└── frontend/
Struttura database
Trip
id
name
startDate
endDate
Place
id
name
description
status
tripId

Ogni luogo appartiene a un viaggio.

API REST principali
Viaggi
GET /trips
GET /trips/:id
POST /trips
DELETE /trips/:id
Luoghi
GET /trips/:tripId/places
POST /trips/:tripId/places
PATCH /places/:id/status
DELETE /places/:id
Funzionamento frontend

Il frontend mostra:

una sezione iniziale con il pulsante per aggiungere un viaggio
una lista di card dei viaggi
una sezione di dettaglio del viaggio selezionato
una lista dei luoghi associati al viaggio
modali per creazione, eliminazione e aggiornamento dello stato
Gestione dello stato

Nel frontend sono stati utilizzati solo:

useState
useEffect
props
Context

come richiesto dalla traccia.