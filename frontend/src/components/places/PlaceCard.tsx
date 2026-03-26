// IMPORTIAMO UN TIPO PER IL NOSTRO PLACE, CHE DEFINIAMO NEL FILE src/types/index.ts
import type { Place } from "../../types";
// DEFINIAMO LE PROPS CHE IL NOSTRO COMPONENTE RICEVERÀ
type PlaceCardProps = {
  place: Place;
  onAskStatusChange: (place: Place) => void;
  onAskDelete: (place: Place) => void;
};
// COMPONENTE CHE RAPPRESENTA UNA CARD PER UN LUOGO, MOSTRANDO IL NOME, LA DESCRIZIONE E LO STATO, 
// E PERMETTENDO DI CAMBIARE LO STATO O ELIMINARE IL LUOGO
export default function PlaceCard({
  place,
  onAskStatusChange,
  onAskDelete,
}: PlaceCardProps) {
  // RENDERIZZIAMO LA CARD CON LE INFORMAZIONI DEL LUOGO E I BOTTONI PER CAMBIARE LO STATO O ELIMINARE IL LUOGO
  return (
    <div className="card">
      <h4>{place.name}</h4>
      <p>{place.description || "Nessuna descrizione"}</p>

      <span
        className={
          place.status === "VISITATO" ? "status-visitato" : "status-da-vedere"
        }
      >
        {place.status}
      </span>

      <div className="actions">
        <button onClick={() => onAskStatusChange(place)}>Cambia stato</button>
        <button onClick={() => onAskDelete(place)}>Elimina</button>
      </div>
    </div>
  );
}