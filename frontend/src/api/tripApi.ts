// definiamo l'URL base per le chiamate API
const API_URL = "http://localhost:3000";
// definiamo le funzioni per interagire con l'API dei viaggi (trips)
export const getTrips = async () => {
  const response = await fetch(`${API_URL}/trips`);
  return response.json();
};
// funzione per recuperare i dettagli di un viaggio specifico, inclusi i luoghi associati a quel viaggio
export const getTripById = async (id: number) => {
  const response = await fetch(`${API_URL}/trips/${id}`);
  return response.json();
};
// funzione per creare un nuovo viaggio, inviando i dati del viaggio al backend tramite una richiesta POST
export const createTrip = async (trip: {
  name: string;
  startDate: string;
  endDate: string;
}) => {
  const response = await fetch(`${API_URL}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  return response.json();
};
// funzione per eliminare un viaggio specifico, 
// inviando una richiesta DELETE al backend con l'ID del viaggio da eliminare
export const deleteTrip = async (id: number) => {
  await fetch(`${API_URL}/trips/${id}`, {
    method: "DELETE",
  });
};