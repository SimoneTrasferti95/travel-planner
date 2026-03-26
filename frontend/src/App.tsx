import { useContext, useState } from "react";
import { TripContext } from "./context/tripContext";
import type { Place, PlaceStatus, Trip } from "./types";
import { createTrip, deleteTrip, getTripById } from "./api/tripApi";
import { createPlace, deletePlace, updatePlaceStatus } from "./api/placeApi";
import Header from "./components/layout/Header";
import TripList from "./components/trips/TripList";
import TripDetail from "./components/trips/TripDetail";
import TripForm from "./components/trips/TripForm";
import PlaceForm from "./components/places/PlaceForm";
import StatusForm from "./components/places/StatusForm";
import Modal from "./components/ui/Modal";
import ConfirmBox from "./components/ui/ConfirmBox";
// componente principale dell'applicazione che gestisce lo stato globale dei viaggi (trips) 
// e dei luoghi (places)
export default function App() {
  const tripContext = useContext(TripContext);

  if (!tripContext) {
    return <p>Errore nel caricamento del contesto.</p>;
  }

  const { trips, loadTrips } = tripContext;

  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showTripModal, setShowTripModal] = useState(false);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);
  const [placeToDelete, setPlaceToDelete] = useState<Place | null>(null);
  const [placeToUpdate, setPlaceToUpdate] = useState<Place | null>(null);

  const handleShowTripDetail = async (id: number) => {
    const trip = await getTripById(id);
    setSelectedTrip(trip);
  };

  const handleCreateTrip = async (data: {
    name: string;
    startDate: string;
    endDate: string;
  }) => {
    await createTrip(data);
    await loadTrips();
    setShowTripModal(false);
  };

  const handleDeleteTrip = async () => {
    if (!tripToDelete) return;

    await deleteTrip(tripToDelete.id);
    await loadTrips();

    if (selectedTrip?.id === tripToDelete.id) {
      setSelectedTrip(null);
    }

    setTripToDelete(null);
  };

  const handleCreatePlace = async (data: {
    name: string;
    description: string;
  }) => {
    if (!selectedTrip) return;

    await createPlace(selectedTrip.id, data);
    const updatedTrip = await getTripById(selectedTrip.id);
    setSelectedTrip(updatedTrip);
    setShowPlaceModal(false);
  };

  const handleDeletePlace = async () => {
    if (!placeToDelete || !selectedTrip) return;

    await deletePlace(placeToDelete.id);
    const updatedTrip = await getTripById(selectedTrip.id);
    setSelectedTrip(updatedTrip);
    setPlaceToDelete(null);
  };

  const handleUpdatePlaceStatus = async (status: PlaceStatus) => {
    if (!placeToUpdate || !selectedTrip) return;

    await updatePlaceStatus(placeToUpdate.id, status);
    const updatedTrip = await getTripById(selectedTrip.id);
    setSelectedTrip(updatedTrip);
    setPlaceToUpdate(null);
  };

  return (
    <main className="container">
      <Header onAddTrip={() => setShowTripModal(true)} />

      <TripList
        trips={trips}
        onShowDetail={handleShowTripDetail}
        onAskDelete={setTripToDelete}
      />

      {selectedTrip && (
        <TripDetail
          trip={selectedTrip}
          onAddPlace={() => setShowPlaceModal(true)}
          onAskPlaceDelete={setPlaceToDelete}
          onAskPlaceStatusChange={setPlaceToUpdate}
        />
      )}

      {showTripModal && (
        <Modal title="Aggiungi viaggio" onClose={() => setShowTripModal(false)}>
          <TripForm onSubmit={handleCreateTrip} />
        </Modal>
      )}

      {showPlaceModal && (
        <Modal title="Aggiungi luogo" onClose={() => setShowPlaceModal(false)}>
          <PlaceForm onSubmit={handleCreatePlace} />
        </Modal>
      )}

      {tripToDelete && (
        <Modal
          title="Conferma eliminazione"
          onClose={() => setTripToDelete(null)}
        >
          <ConfirmBox
            message={`Vuoi eliminare il viaggio "${tripToDelete.name}"?`}
            onConfirm={handleDeleteTrip}
            onCancel={() => setTripToDelete(null)}
          />
        </Modal>
      )}

      {placeToDelete && (
        <Modal
          title="Conferma eliminazione"
          onClose={() => setPlaceToDelete(null)}
        >
          <ConfirmBox
            message={`Vuoi eliminare il luogo "${placeToDelete.name}"?`}
            onConfirm={handleDeletePlace}
            onCancel={() => setPlaceToDelete(null)}
          />
        </Modal>
      )}

      {placeToUpdate && (
        <Modal title="Cambia stato" onClose={() => setPlaceToUpdate(null)}>
          <StatusForm
            currentStatus={placeToUpdate.status}
            onSubmit={handleUpdatePlaceStatus}
          />
        </Modal>
      )}
    </main>
  );
}