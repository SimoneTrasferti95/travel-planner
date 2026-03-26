// API per gestire le operazioni sui luoghi (places) associati ai viaggi (trips)
const API_URL = "http://localhost:3000";
// funzione per ottenere i luoghi (places) associati a un viaggio (trip) specifico 
// , inviando una richiesta GET al backend con l'ID del viaggio
export const createPlace = async (
  tripId: number,
  place: { name: string; description?: string }
) => {
    // funzione per creare un nuovo luogo associato a un viaggio specifico,
    // inviando i dati del luogo al backend tramite una richiesta POST
  const response = await fetch(`${API_URL}/trips/${tripId}/places`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(place),
  });

  return response.json();
};
// funzione per aggiornare lo stato di un luogo specifico,
// inviando una richiesta PATCH al backend con l'ID del luogo e il nuovo stato
export const updatePlaceStatus = async (id: number, status: string) => {
  const response = await fetch(`${API_URL}/places/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return response.json();
};
// funzione per eliminare un luogo specifico,
// inviando una richiesta DELETE al backend con l'ID del luogo da eliminare
export const deletePlace = async (id: number) => {
  await fetch(`${API_URL}/places/${id}`, {
    method: "DELETE",
  });
};
