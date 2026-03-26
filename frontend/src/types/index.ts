// questo file contiene le definizioni dei tipi TypeScript per i dati utilizzati nell'applicazione, 
// come i viaggi (trips) e i luoghi (places) associati a questi viaggi. 
// Questi tipi aiutano a garantire la coerenza dei dati e a facilitare lo sviluppo dell'applicazione frontend.

export type PlaceStatus = "DA_VEDERE" | "VISITATO";
// definizione del tipo Place, che rappresenta un luogo associato a un viaggio,
export interface Place {
  id: number;
  name: string;
  description?: string;
  status: PlaceStatus;
  tripId: number;
}
// definizione del tipo Trip, che rappresenta un viaggio, 
// con un array opzionale di luoghi associati a quel viaggio
export interface Trip {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  places?: Place[];
}