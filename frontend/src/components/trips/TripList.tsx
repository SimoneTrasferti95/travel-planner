import type { Trip } from "../../types";
import TripCard from "./TripCard";

type TripListProps = {
  trips: Trip[];
  onShowDetail: (id: number) => void;
  onAskDelete: (trip: Trip) => void;
};

export default function TripList({
  trips,
  onShowDetail,
  onAskDelete,
}: TripListProps) {
  return (
    <section>
      <h2>I tuoi viaggi</h2>

      {trips.length === 0 ? (
        <div className="empty-box">
          <p>Nessun viaggio ancora presente. Crea il tuo primo viaggio ✈️</p>
        </div>
      ) : (
        <div className="grid">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onShowDetail={onShowDetail}
              onAskDelete={onAskDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}