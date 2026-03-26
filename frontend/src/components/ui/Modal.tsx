// facciamo il import di React e definiamo le proprietà (props) che il componente Modal accetterà, 
// tra cui il titolo, i figli (children) e la funzione per chiudere il modal (onClose)
type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};
// definiamo il componente Modal che renderizza una finestra modale con un titolo, 
// un contenuto e un pulsante per chiuderla
export default function Modal({ title, children, onClose }: ModalProps) {
    // il componente Modal è composto da un overlay che copre l'intera pagina e una box che contiene il titolo
    // e il contenuto del modal, con un pulsante per chiuderlo
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>X</button>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}