import { useState } from "react";

type PlaceFormProps = {
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
};

export default function PlaceForm({ onSubmit }: PlaceFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Il nome del luogo è obbligatorio.");
      return;
    }

    setError("");
    await onSubmit({ name, description });

    setName("");
    setDescription("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome del luogo"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <textarea
        placeholder="Descrizione"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Salva luogo</button>
    </form>
  );
}