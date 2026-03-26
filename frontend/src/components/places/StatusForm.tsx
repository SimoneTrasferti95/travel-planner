// importiamo React e useState per gestire lo stato del form

import { useState } from "react";
import type {  PlaceStatus } from "../../types";
// definiamo le props del componente StatusForm, che include lo stato attuale del luogo (currentStatus) 
// e una funzione onSubmit per gestire l'invio del form
type StatusFormProps = {
  currentStatus: PlaceStatus;
  onSubmit: (status: PlaceStatus) => Promise<void>;
};
// definiamo il componente StatusForm, che include un form per selezionare lo stato del luogo (DA_VEDERE o VISITATO)
export default function StatusForm({
  currentStatus,
  onSubmit,
}: StatusFormProps) {
  const [status, setStatus] = useState<PlaceStatus>(currentStatus);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(status);
  };
// rendiamo il form con un select per scegliere lo stato del luogo e un pulsante per inviare il form
  return (
    <form className="form" onSubmit={handleSubmit}>
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value as PlaceStatus)}
      >
        <option value="DA_VEDERE">DA_VEDERE</option>
        <option value="VISITATO">VISITATO</option>
      </select>

      <button type="submit">Aggiorna stato</button>
    </form>
  );
}