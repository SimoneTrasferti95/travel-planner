import type { Trip } from "../../types";

type TripCardProps = {
  trip: Trip;
  onShowDetail: (id: number) => void;
  onAskDelete: (trip: Trip) => void;
};

export default function TripCard({
  trip,
  onShowDetail,
  onAskDelete,
}: TripCardProps) {
  return (
    <div className="card">
      <h3>✈️ {trip.name}</h3>
      <p>Data inizio: {trip.startDate.slice(0, 10)}</p>
      <p>Data fine: {trip.endDate.slice(0, 10)}</p>

      <div className="actions">
        <button onClick={() => onShowDetail(trip.id)}>Vedi dettaglio</button>
        <button onClick={() => onAskDelete(trip)}>Elimina</button>
      </div>
    </div>
  );
}