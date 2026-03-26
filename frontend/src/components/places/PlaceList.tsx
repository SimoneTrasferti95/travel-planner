// importiamo i tipi necessari e il componente PlaceCard per visualizzare ogni luogo nella lista

import type  { Place } from "../../types";
import PlaceCard from "./PlaceCard";

// definiamo le props del componente PlaceList, che include un array di luoghi (places) 
// e due funzioni per gestire il cambio di stato e la cancellazione di un luogo
type PlaceListProps = {
  places: Place[];
  onAskStatusChange: (place: Place) => void;
  onAskDelete: (place: Place) => void;
};
// definiamo il componente PlaceList, che riceve un array di luoghi (places) 
// e due funzioni per gestire il cambio di stato e la cancellazione di un luogo,
export default function PlaceList({
  places,
  onAskStatusChange,
  onAskDelete,
}: PlaceListProps) {
    // rendiamo una griglia di PlaceCard, passando a ciascuna card il luogo (place) 
    // e le funzioni per gestire il cambio di stato e la cancellazione del luogo
  return (
    <div className="grid">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          onAskStatusChange={onAskStatusChange}
          onAskDelete={onAskDelete}
        />
      ))}
    </div>
  );
}