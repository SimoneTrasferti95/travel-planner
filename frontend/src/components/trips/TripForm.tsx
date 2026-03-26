import { useState } from "react";

type TripFormProps = {
  onSubmit: (data: {
    name: string;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
};

export default function TripForm({ onSubmit }: TripFormProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !startDate || !endDate) {
      setError("Compila tutti i campi.");
      return;
    }

    if (endDate < startDate) {
      setError("La data di fine non può essere precedente alla data di inizio.");
      return;
    }

    setError("");
    await onSubmit({ name, startDate, endDate });

    setName("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome del viaggio"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="date"
        value={startDate}
        onChange={(event) => setStartDate(event.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(event) => setEndDate(event.target.value)}
      />

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Salva viaggio</button>
    </form>
  );
}