

import { createContext, useEffect, useState } from "react";
import type  { Trip} from "../types";
import { getTrips } from "../api/tripApi";
// creiamo un contesto per gestire lo stato dei viaggi (trips) e fornire una funzione per caricarli
type TripContextType = {
  trips: Trip[];
  loadTrips: () => Promise<void>;
};
// creiamo il contesto con un valore iniziale null, che sarà poi popolato dal provider
export const TripContext = createContext<TripContextType | null>(null);

type TripProviderProps = {
  children: React.ReactNode;
};
// creiamo un provider per il contesto dei viaggi (trips) che gestisce lo stato dei viaggi 
// e fornisce una funzione per caricarli
export function TripProvider({ children }: TripProviderProps) {
  const [trips, setTrips] = useState<Trip[]>([]);

  const loadTrips = async () => {
    const data = await getTrips();
    setTrips(data);
  };

  useEffect(() => {
    loadTrips();
  }, []);

  // forniamo il valore del contesto ai componenti figli, 
  // che possono accedere allo stato dei viaggi (trips) e alla funzione per caricarli
  return (
    <TripContext.Provider value={{ trips, loadTrips }}>
      {children}
    </TripContext.Provider>
  );
}