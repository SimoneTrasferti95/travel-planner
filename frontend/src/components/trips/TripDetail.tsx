import type { Place, Trip } from "../../types";
import PlaceList from "../places/PlaceList";

type TripDetailProps = {
  trip: Trip;
  onAddPlace: () => void;
  onAskPlaceDelete: (place: Place) => void;
  onAskPlaceStatusChange: (place: Place) => void;
};

export default function TripDetail({
  trip,
  onAddPlace,
  onAskPlaceDelete,
  onAskPlaceStatusChange,
}: TripDetailProps) {
  const places = trip.places || [];

  return (
    <section className="detail-section">
      <div className="detail-header">
        <div>
          <h2>{trip.name}</h2>
          <p>Data inizio: {trip.startDate.slice(0, 10)}</p>
          <p>Data fine: {trip.endDate.slice(0, 10)}</p>
        </div>

        <button onClick={onAddPlace}>Aggiungi luogo</button>
      </div>

      <h3>Luoghi del viaggio</h3>

      {places.length === 0 ? (
        <div className="empty-box">
          <p>Nessun luogo ancora aggiunto per questo viaggio 📍</p>
        </div>
      ) : (
        <PlaceList
          places={places}
          onAskDelete={onAskPlaceDelete}
          onAskStatusChange={onAskPlaceStatusChange}
        />
      )}
    </section>
  );
}