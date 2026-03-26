import heroImage from "../../Immagini/R.jpg";

type HeaderProps = {
  onAddTrip: () => void;
};

export default function Header({ onAddTrip }: HeaderProps) {
  return (
    <header className="hero">
      <div className="hero-text">
        <p className="hero-label">Travel Planner</p>
        <h1>Ogni viaggio inizia da un piano fatto bene</h1>
        <p>
          Organizza partenze, tappe e luoghi da visitare in un unico spazio
          semplice, chiaro e ordinato.
        </p>

        <div className="hero-actions">
          <button onClick={onAddTrip}>Aggiungi viaggio</button>
        </div>
      </div>

      <div className="hero-image-wrapper">
        <img src={heroImage} alt="Destinazione di viaggio" className="hero-img" />
      </div>
    </header>
  );
}