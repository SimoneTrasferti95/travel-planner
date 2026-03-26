// componente per l'eliminazione di un luogo, 
// che mostra una finestra di conferma prima di procedere con l'eliminazione

type ConfirmBoxProps = {
  message: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
};
// il componente ConfirmBox accetta un messaggio da visualizzare, 
// una funzione da chiamare quando l'utente conferma l'eliminazione 
// e una funzione da chiamare quando l'utente annulla l'operazione
export default function ConfirmBox({
  message,
  onConfirm,
  onCancel,
}: ConfirmBoxProps) {
    // il componente renderizza una finestra con il messaggio e due pulsanti,
    // uno per confermare l'eliminazione e uno per annullarla
  return (
    <div className="confirm-box">
      <p>{message}</p>

      <div className="actions">
        <button onClick={onConfirm}>Conferma</button>
        <button onClick={onCancel}>Annulla</button>
      </div>
    </div>
  );
}